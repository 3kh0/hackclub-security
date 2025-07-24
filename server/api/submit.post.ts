import { Catbox } from 'node-catbox'
import { Readable } from 'stream'
import { shoot } from './../utils/email'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  
  // Verify Turnstile CAPTCHA
  const verify = await verifyTurnstile(body.turnstileToken, config.tprivate)
  if (!verify.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'CAPTCHA verification failed. Please try again.'
    })
  }
  
  // Validate required fields
  const required = ['name', 'email', 'region', 'affected', 'vulnType', 'title', 'description']
  const missing = required.filter(field => {
    if (field === 'affected') {
      return !body[field] || !Array.isArray(body[field]) || body[field].length === 0
    }
    return !body[field] || (typeof body[field] === 'string' && body[field].trim() === '')
  })
  
  if (!body.termsAccepted) {
    throw createError({
      statusCode: 400,
      statusMessage: 'You must accept the terms and rules to submit a report'
    })
  }
  
  if (missing.length > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: `Missing required fields: ${missing.join(', ')}`
    })
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email address'
    })
  }
  
  // Validate region
  const regions = ['us', 'canada', 'eu', 'uk', 'australia', 'asia', 'other']
  if (!regions.includes(body.region)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid region'
    })
  }
  
  // Validate vulnerability type
  const vulnTypes = [
    'rce-root', 'rce-nonroot', 'auth-bypass', 'sqli', 
    'pii-critical', 'xss-stored', 'csrf', 'pii-minor', 
    'xss-reflected', 'other'
  ]
  if (!vulnTypes.includes(body.vulnType)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid vulnerability type'
    })
  }

  // Validate severity assessment
  if (!body.severity || !body.severity.remote || !body.severity.impact || !body.severity.complexity) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Complete severity assessment is required'
    })
  }
  
  // Process form data
  const data = {
    name: body.name.trim().substring(0, 100),
    email: body.email.trim().toLowerCase().substring(0, 100),
    slackId: body.slackId ? body.slackId.trim().substring(0, 50) : null,
    region: body.region,
    affected: Array.isArray(body.affected) ? body.affected.slice(0, 10).map(program => {
      if (program === 'other') {
        return body.otherProgram ? body.otherProgram.trim().substring(0, 100) : 'Other (not specified)'
      }
      return program
    }) : [],
    vulnType: body.vulnType,
    title: body.title.trim().substring(0, 200),
    description: body.description.trim().substring(0, 10000),
    severity: body.severity,
    calculatedSeverity: body.calculatedSeverity
  }
  
  // Create submission object
  const submission = {
    timestamp: new Date().toISOString(),
    id: `SEC-${Date.now()}`,
    reporter: {
      name: data.name,
      email: data.email,
      slackId: data.slackId
    },
    vulnerability: data
  }
  
  // Get estimated payout
  const basePayout = getBasePayout(data.vulnType)
  const estimatedPayout = data.calculatedSeverity?.payout || basePayout
  
  // Check if this is an HCB-related report
  const isHCB = data.affected.some(program => 
    typeof program === 'string' && program.toLowerCase().includes('hcb')
  )
  
  // Generate AI summary (for non-HCB reports)
  let summary = 'AI summary generation failed'
  if (!isHCB) {
    try {
      const ai = await fetch('https://ai.hackclub.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: `Please provide a 2-3 sentence technical summary of this security vulnerability report. Focus on the key technical details and potential impact:

Title: ${data.title}
Type: ${getVulnTypeName(data.vulnType)}
Estimated Severity: ${data.calculatedSeverity?.level || 'Unknown'}
Affected Programs: ${data.affected.join(', ')}
Description: ${data.description}`
          }]
        })
      })
      
      if (ai.ok) {
        const result = await ai.json()
        summary = result.choices?.[0]?.message?.content || 'AI summary generation failed'
      }
    } catch (error) {
      console.error('AI summary error:', error)
    }
  } else {
    summary = `RAW REPORT:\n${data.description}`
  }
  
  // Upload report or send email
  let reportLink = 'Upload failed'
  if (isHCB) {
    try {
      const sent = await shoot({
        id: submission.id,
        title: data.title,
        name: data.name,
        email: data.email,
        slackId: data.slackId,
        vulnType: getVulnTypeName(data.vulnType),
        severity: data.calculatedSeverity?.level || 'Unknown',
        affectedPrograms: data.affected,
        region: getRegionName(data.region),
        timestamp: submission.timestamp,
        description: data.description,
        estimatedPayout: `$${estimatedPayout}`
      }, config.ekey)
      
      reportLink = sent ? 'Email dispatched to HCB team' : 'Email delivery failed'
    } catch (error) {
      console.error('Email sending error:', error)
      reportLink = 'Email delivery failed'
    }
  } else {
    try {
      const catbox = new Catbox()
      const reportContent = `Security Report: ${data.title}
Submission ID: ${submission.id}
Reporter: ${data.name}
Email: ${data.email}
${data.slackId ? `Slack ID: ${data.slackId}` : ''}
Vulnerability Type: ${getVulnTypeName(data.vulnType)}
Estimated Severity: ${data.calculatedSeverity?.level || 'Unknown'}
Estimated Payout: $${estimatedPayout}
Affected Programs: ${data.affected.join(', ')}
Region: ${getRegionName(data.region)}
Submitted: ${submission.timestamp}

Severity Assessment:
- Remote access: ${data.severity.remote === 'yes' ? 'Yes' : 'No'}
- Impact level: ${data.severity.impact}
- Complexity: ${data.severity.complexity}

Description:
${data.description}`

      const buffer = Buffer.from(reportContent, 'utf-8')
      const upload = await catbox.uploadFileStream({
        stream: Readable.from(buffer),
        filename: `${submission.id}.txt`
      })
      
      reportLink = upload
    } catch (error) {
      console.error('Upload error:', error)
      reportLink = 'Report upload failed - check logs'
    }
  }
  
  // Send Slack notification
  const slackMessage = {
    text: `New security report: ${getVulnTypeName(data.vulnType)}`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "🚨 New Security Report Submitted"
        }
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*ID:*\n${submission.id}`
          },
          {
            type: "mrkdwn", 
            text: `*Severity:*\n${data.calculatedSeverity?.level || 'Unknown'}`
          },
          {
            type: "mrkdwn",
            text: `*Type:*\n${getVulnTypeName(data.vulnType)}`
          },
          {
            type: "mrkdwn",
            text: `*Estimated Payout:*\n$${estimatedPayout}`
          },
          {
            type: "mrkdwn",
            text: `*Reporter:*\n${data.name}`
          },
          {
            type: "mrkdwn",
            text: `*Email:*\n${data.email}`
          }
        ]
      }
    ]
  }

  // Add Slack ID if provided
  if (data.slackId) {
    slackMessage.blocks[1].fields.push({
      type: "mrkdwn",
      text: `*Slack ID:*\n${data.slackId}`
    })
  }

  // Add remaining fields
  slackMessage.blocks[1].fields.push(
    {
      type: "mrkdwn",
      text: `*Region:*\n${getRegionName(data.region)}`
    },
    {
      type: "mrkdwn",
      text: `*Submitted:*\n<!date^${Math.floor(Date.now() / 1000)}^{date_short_pretty} at {time}|${submission.timestamp}>`
    },
    {
      type: "mrkdwn",
      text: `*Affected:*\n${data.affected.join(', ')}`
    },
    {
      type: "mrkdwn",
      text: `*Title:*\n${data.title}`
    }
  )

  // Add summary and report link
  slackMessage.blocks.push(
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*AI Summary:*\n${summary}`
      }
    },
    {
      type: "section", 
      text: {
        type: "mrkdwn",
        text: `*Full Report:*\n${reportLink}`
      }
    }
  )

  // Send to Slack
  try {
    const response = await fetch(config.webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackMessage)
    })
    
    if (!response.ok) {
      console.error('Slack webhook failed:', response.status, response.statusText)
    }
  } catch (error) {
    console.error('Slack notification error:', error)
  }

  return {
    success: true,
    message: 'Security report submitted successfully! We will review it and get back to you ASAP. Thank you for helping us keep Hack Club secure!',
    reportId: submission.id
  }
})

function getBasePayout(vulnType: string): number {
  const payouts: Record<string, number> = {
    'rce-root': 500,
    'rce-nonroot': 250,
    'auth-bypass': 100,
    'sqli': 100,
    'pii-critical': 75,
    'xss-stored': 50,
    'csrf': 25,
    'pii-minor': 25,
    'xss-reflected': 15,
    'other': 50
  }
  
  return payouts[vulnType] || 50
}

function getVulnTypeName(type: string): string {
  const names: Record<string, string> = {
    'rce-root': 'Remote Code Execution (Root)',
    'rce-nonroot': 'Remote Code Execution (Non-root)',
    'auth-bypass': 'Authentication Bypass',
    'sqli': 'SQL Injection',
    'pii-critical': 'PII Leak (Critical)',
    'xss-stored': 'Cross-Site Scripting (Stored)',
    'csrf': 'Cross-Site Request Forgery',
    'pii-minor': 'PII Leak (Minor)',
    'xss-reflected': 'Cross-Site Scripting (Reflected)',
    'other': 'Other Security Issue'
  }
  
  return names[type] || type
}

function getRegionName(region: string): string {
  const regions: Record<string, string> = {
    'us': 'United States',
    'canada': 'Canada',
    'eu': 'European Union', 
    'uk': 'United Kingdom',
    'australia': 'Australia',
    'asia': 'Asia Pacific',
    'other': 'Other'
  }
  
  return regions[region] || region
}

async function verifyTurnstile(token: string, key: string): Promise<{ success: boolean }> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)
    
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'HackClub-Security/1.0'
      },
      body: new URLSearchParams({
        secret: key,
        response: token,
      }),
      signal: controller.signal
    })
    
    clearTimeout(timeout)
    
    if (!response.ok) {
      return { success: false }
    }
    
    const result = await response.json()
    return result
  } catch (error) {
    console.error('Turnstile verification error:', error)
    return { success: false }
  }
}

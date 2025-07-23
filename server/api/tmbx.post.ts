import { Catbox } from 'node-catbox'
import { Readable } from 'stream'
import { shoot } from './../utils/email'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  // why are we doing so much validation?
  // well it would be so funny if the security program got hacked
  const verify = await verifyTurnstile(body.turnstileToken, config.tprivate)
  if (!verify.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'CAPTCHA verification failed. Please try again.'
    })
  }
  
  const required = ['name', 'email', 'region', 'affectedPrograms', 'vulnType', 'title', 'description', 'cvssScore', 'severity']
  const missing = required.filter(field => {
    if (field === 'affectedPrograms') {
      return !body[field] || !Array.isArray(body[field]) || body[field].length === 0
    }
    return !body[field] || (typeof body[field] === 'string' && body[field].trim() === '')
  })
  
  if (missing.length > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: `Missing required fields: ${missing.join(', ')}`
    })
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email address'
    })
  }
  
  const regions = ['us', 'canada', 'eu', 'uk', 'australia', 'asia', 'other']
  if (!regions.includes(body.region)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid region'
    })
  }

  if (typeof body.cvssScore !== 'number' || body.cvssScore < 0 || body.cvssScore > 10) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid CVSS score'
    })
  }
  
  const vulnTypes = [
    'rce-root', 'rce-nonroot', 'auth-bypass', 'sqli', 
    'pii-critical', 'pii-high', 'pii-medium', 'pii-low',
    'info-disclosure', 'xss', 'other'
  ]
  if (!vulnTypes.includes(body.vulnType)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid vulnerability type'
    })
  }

  const severities = ['critical', 'high', 'medium', 'low', 'none']
  if (!severities.includes(body.severity)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid severity level'
    })
  }
  
  const data = {
    name: body.name.trim().substring(0, 100),
    email: body.email.trim().toLowerCase().substring(0, 100),
    region: body.region,
    affectedPrograms: Array.isArray(body.affectedPrograms) ? body.affectedPrograms.slice(0, 10).map(program => {
      if (typeof program === 'string' && program.startsWith('other:')) {
        return program.substring(6) || 'Other (not specified)'
      }
      return program
    }) : [],
    vulnType: body.vulnType,
    title: body.title.trim().substring(0, 200),
    description: body.description.trim().substring(0, 10000),
    cvssScore: Number(body.cvssScore),
    severity: body.severity
  }
  
  const submission = {
    timestamp: new Date().toISOString(),
    id: `SEC-${Date.now()}`,
    reporter: {
      name: data.name,
      email: data.email
    },
    vulnerability: data
  }
  
  const payout = getPayout(data.vulnType, false)
  // cuz they wanna be supa special or something
  const ishcb = data.affectedPrograms.some(program => 
    typeof program === 'string' && program.toLowerCase().includes('hcb')
  )
  
  let summary = 'AI fucked up :('
  if (!ishcb) {
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
Type: ${getType(data.vulnType)}
CVSS Score: ${data.cvssScore}
Affected Programs: ${data.affectedPrograms.join(', ')}
Description: ${data.description}`
          }]
        })
      })
      
      if (ai.ok) {
        const result = await ai.json()
        summary = result.choices?.[0]?.message?.content || 'AI summary generation failed'
      }
    } catch (error) {
      console.error('AI error:', error)
    }
  } else {
    summary = `RAW REPORT:\n${data.description}`
  }
  
  let link = 'Upload failed :('
  if (ishcb) {
    try {
      const sent = await shoot({
        id: submission.id,
        title: data.title,
        name: data.name,
        email: data.email,
        vulnType: getType(data.vulnType),
        cvssScore: data.cvssScore,
        severity: data.severity,
        affectedPrograms: data.affectedPrograms,
        region: getRegion(data.region),
        timestamp: submission.timestamp,
        description: data.description
      }, config.ekey)
      
      link = sent ? 'email dispatched' : 'fuck, it broke'
    } catch (error) {
      console.error('fuck', error)
      link = 'fuck, it broke'
    }
  } else {
    try {
      const catbox = new Catbox()
      const buffer = Buffer.from(`Security Report: ${data.title}
Submission ID: ${submission.id}
Reporter: ${data.name}
Email: ${data.email}
Vulnerability Type: ${getType(data.vulnType)}
CVSS Score: ${data.cvssScore}
Severity: ${data.severity}
Affected Programs: ${data.affectedPrograms.join(', ')}
Region: ${getRegion(data.region)}
Submitted: ${submission.timestamp}

Description:
${data.description}`, 'utf-8')

      const upload = await catbox.uploadFileStream({
        stream: Readable.from(buffer),
        filename: `${submission.id}.txt`
      })
      
      link = upload
    } catch (error) {
      console.error('shit ', error)
      link = `check logs, upload failed`
    }
  }
  
  const slack = {
    text: `new report: ${getType(data.vulnType)}`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "🚨 wee woo new report just hit the inbox"
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
            text: `*Score:*\n${data.cvssScore}`
          },
          {
            type: "mrkdwn",
            text: `*Type:*\n${getType(data.vulnType)}`
          },
          {
            type: "mrkdwn",
            text: `*Estimated Payout:*\n${payout}`
          },
          {
            type: "mrkdwn",
            text: `*Reporter:*\n${data.name}`
          },
          {
            type: "mrkdwn",
            text: `*Email:*\n${data.email}`
          },
          {
            type: "mrkdwn",
            text: `*Region:*\n${getRegion(data.region)}`
          },
          {
            type: "mrkdwn",
            text: `*Submitted:*\n<!date^${Math.floor(Date.now() / 1000)}^{date_short_pretty} at {time}|${submission.timestamp}>`
          },
          {
            type: "mrkdwn",
            text: `*Assets:*\n${data.affectedPrograms.join(', ')}`
          },
          {
            type: "mrkdwn",
            text: `*Title:*\n${data.title}`
          }
        ]
      },
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
          text: `*Full Report:*\n${link}`
        }
      }
    ]
  }

  try {
    const webhook = config.webhook
    
    const response = await fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slack)
    })
    
    if (!response.ok) {
      throw new Error('Failed to send notification')
    }
    
  } catch (e) {
    console.error(e)
  }

  
  return {
    success: true,
    message: 'Security report submitted successfully! We will review it and get back to you ASAP! Thank you for helping us keep Hack Club secure!',
    id: submission.id
  }
})

function getPayout(type: string, fix: boolean): string {
  const payouts: Record<string, string> = {
    'rce-root': '$500',
    'rce-nonroot': '$250',
    'auth-bypass': '$100',
    'sqli': '$100',
    'pii-critical': '$300 (100+ people)',
    'pii-high': '$300 (100+ people)',
    'pii-medium': '$150 (50+ people)',
    'pii-low': '$20-50',
    'info-disclosure': '$50',
    'xss': 'Variable (based on PII impact)',
    'other': 'Variable'
  }
  
  const base = payouts[type] || 'TBD'
  return fix ? `${base} (+25% bonus)` : base
}

function getType(type: string): string {
  const names: Record<string, string> = {
    'rce-root': 'Remote Code Execution (Root)',
    'rce-nonroot': 'Remote Code Execution (Non-root)',
    'auth-bypass': 'Authentication Bypass',
    'sqli': 'SQL Injection',
    'pii-critical': 'PII Leak (Critical)',
    'pii-high': 'PII Leak (High)',
    'pii-medium': 'PII Leak (Medium)',
    'pii-low': 'PII Leak (Low)',
    'info-disclosure': 'Information Disclosure',
    'xss': 'Cross-Site Scripting',
    'other': 'Other Vulnerability'
  }
  
  return names[type] || type
}

function getEmoji(severity: string): string {
  const emojis: Record<string, string> = {
    'critical': '🔴',
    'high': '🟠',
    'medium': '🟡',
    'low': '🟢',
    'none': '⚪'
  }
  
  return emojis[severity] || '⚪'
}

function getRegion(region: string): string {
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
    console.error('Turnstile error:', error)
    return { success: false }
  }
}

import { Resend } from 'resend'
// fuck sendgrid man that shit some ass
export async function shoot(
  in: {
    id: string
    title: string
    name: string
    email: string
    vulnType: string
    cvssScore: number
    severity: string
    affectedPrograms: string[]
    region: string
    timestamp: string
    description: string
  },
  apiKey: string
): Promise<boolean> {
  try {
    const r = new Resend(apiKey)
    
    const a = `Security Report: ${in.title}
ID: ${in.id}
Reporter: ${in.name}
Email: ${in.email}
Type: ${in.vulnType}
CVSS Score: ${in.cvssScore}
Severity: ${in.severity}
Assets: ${in.affectedPrograms.join(', ')}
Region: ${in.region}
Time: ${in.timestamp}

Description:
${in.description}`

    await r.emails.send({
      from: 'Hack Club Security Report <tmbx@outbound.3kh0.net>',
      to: ['hcb-security@hackclub.com'], // testing@3kh0.net
      subject: `HCB Report: ${in.title} [${in.id}]`,
      html: `<pre style="font-family: monospace; white-space: pre-wrap; background: #f5f5f5; padding: 16px; border-radius: 4px;">${a}</pre>`,
    })

    return true
  } catch (error) {
    console.error('shit ', error)
    return false
  }
}

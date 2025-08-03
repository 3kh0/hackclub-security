import { Resend } from "resend";
// fuck sendgrid man that shit some ass
export async function shoot(
  data: {
    id: string;
    title: string;
    name: string;
    email: string;
    slackId?: string;
    vulnType: string;
    severity: string;
    affectedPrograms: string[];
    region: string;
    timestamp: string;
    description: string;
    estimatedPayout: string;
  },
  apiKey: string,
): Promise<boolean> {
  try {
    const r = new Resend(apiKey);

    const a = `Security Report: ${data.title}
ID: ${data.id}
Reporter: ${data.name}
Email: ${data.email}
CVSS Score: ${data.cvssScore}
Severity: ${data.severity}
Assets: ${data.affectedPrograms.join(", ")}
Region: ${data.region}
Time: ${data.timestamp}

Description:
${data.description}`;

    await r.emails.send({
      from: "Hack Club Security Report <tmbx@outbound.3kh0.net>",
      to: ["hcb-security@hackclub.com"], // testing@3kh0.net
      subject: `HCB Report: ${data.title} [${data.id}]`,
      reply_to: data.email,
      html: `<pre style="font-family: monospace; white-space: pre-wrap; background: #f5f5f5; padding: 16px; border-radius: 4px;">${a}</pre>`,
    });

    return true;
  } catch (error) {
    console.error("shit ", error);
    return false;
  }
}

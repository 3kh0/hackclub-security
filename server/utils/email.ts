import { Resend } from "resend";
import { marked } from "marked";

const resend = new Resend(process.env.RESEND_API_KEY);
const from = "Hack Club Security Program <gatekeeper@outbound.3kh0.net>";

export async function email(to: string, content: string, subject?: string) {
  try {
    await resend.emails.send({
      from,
      to: [to],
      subject: subject || "Hack Club Security Program",
      html: marked(content),
    });
    console.log(`YO WE JUST SHOT A FUCKING EMAIL TO ${to}`);
    return true;
  } catch (error) {
    console.error("MISSION FAILED SENDING EMAIL", error);
    throw error;
  }
}

export async function sendReportInvite(to: string, reportId: string, baseUrl: string, apiKey: string) {
  const resendClient = new Resend(apiKey);
  const subject = "You've been invited to view a security report";
  const signInUrl = `${baseUrl}/backend/auth?r=${baseUrl}/backend/report/${reportId}`;

  const text = `You've been invited to view a security report (ID: ${reportId}). \n\nClick here to sign in and view the report: ${signInUrl}\n\nIf you did not expect this invitation, you can safely ignore this email.`;
  const html = marked(text); // Convert Markdown to HTML

  try {
    await resendClient.emails.send({
      from,
      to: [to],
      subject,
      text,
      html,
    });
    console.log(`Report invite sent to ${to} for report ${reportId}`);
    return true;
  } catch (error) {
    console.error("Error sending report invite:", error);
    throw error;
  }
}

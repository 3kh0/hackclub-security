import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function email(to: string, content: string, subject?: string) {
  try {
    await resend.emails.send({
      from: process.env.SMTP_FROM!,
      to: [to],
      subject: subject || "Hack Club Security Program",
      text: content,
    });
    console.log(`Email sent to ${to}`);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

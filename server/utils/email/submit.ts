import { Resend } from "resend";

export async function sendEmail(to: string, reportId: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const subject = "We got your report!";
  const text = `Thank you for submitting your report to the Hack Club Security program. Your report ID is ${reportId}. We will send any updates to your email address.`;

  try {
    await resend.emails.send({
      from: process.env.SMTP_FROM,
      to: [to],
      subject,
      text,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
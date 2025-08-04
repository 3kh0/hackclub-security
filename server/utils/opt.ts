import { Resend } from "resend";

export async function shot(email: string, code: string, apiKey: string): Promise<boolean> {
  try {
    const r = new Resend(apiKey);
    await r.emails.send({
      from: "Hack Club Security Program <gatekeeper@outbound.3kh0.net>",
      to: [email],
      subject: "Login Code",
      text: `Hello,

We received a request for a code to log in to your account for the Hack Club Security Program.

Your login code is: ${code}

This code expires in 10 minutes. If you did not request this, you can safely ignore this email; your account is still safe. Do not share any login codes with anyone else. We will never ask you for your login code.`,
      html: `<p>Hello,</p>
<p>We received a request for a code to log in to your account for the Hack Club Security Program.</p>
<p>Your login code is: <strong>${code}</strong></p>
<p>This code expires in 10 minutes. If you did not request this, you can safely ignore this email; your account is still safe. Do not share any login codes with anyone else. We will never ask you for your login code.</p>`,
    });
    return true;
  } catch (error) {
    console.error("fucky wucky", error);
    return false;
  }
}

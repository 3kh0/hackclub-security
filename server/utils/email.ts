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
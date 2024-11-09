import { NextRequest } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "../../../components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, phone, email, message } = await request.json();

    const { data, error } = await resend.emails.send({
      from: `Properfame <${process.env.FROM_EMAIL}>`,
      to: [process.env.MY_EMAIL],
      subject: `Message From The ${name} Through Contact Form`,
      react: EmailTemplate({
        name: name,
        phone: phone,
        email: email,
        message: message,
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }
    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

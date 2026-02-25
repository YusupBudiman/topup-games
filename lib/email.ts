import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev", // default dari Resend
    to: email,
    subject: "Verify your email",
    html: `
      <h2>Email Verification</h2>
      <p>Click the link below to verify your account:</p>
      <a href="${verifyUrl}">Verify Email</a>
    `,
    headers: {
      "x-resend-no-track": "true",
    },
  });
}

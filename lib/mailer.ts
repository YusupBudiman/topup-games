import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendVerificationEmail(
  email: string,
  username: string,
  token: string,
) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify/${token}`;
  await transporter.sendMail({
    from: `"Ysbuy" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Verify your email",
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <h2 style="color: #333;">Hi ${username},</h2>
        <p>Click the button below to verify your account:</p>
        <a href="${verifyUrl}" style="
           display:inline-block;padding:12px 24px;margin-top:20px;
           background-color:#1b58f8;color:#fff;font-weight:bold;
           text-decoration:none;border-radius:6px;font-size:16px;">
          Verify Email
        </a>
        <p style="margin-top:20px;font-size:12px;color:#999;">
          Ignore this email if you didn't register.
        </p>
      </div>
    `,
  });
}

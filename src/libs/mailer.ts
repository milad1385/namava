import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NEXT_PUBLIC_SMTP_USER,
    pass: process.env.NEXT_PUBLIC_SMTP_PASS,
  },
});

export const sendResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${token}`;

  const mailOptions = {
    from: process.env.NEXT_PUBLIC_SMTP_USER,
    to: email,
    subject: "بازیابی رمز عبور",
    html: `
      <div dir="rtl" style="font-family: Vazir, Tahoma, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 10px;">
        <h2 style="color: #e50914; text-align: center;">بازیابی رمز عبور</h2>
        <p style="font-size: 16px; color: #333;">برای بازیابی رمز عبور خود روی لینک زیر کلیک کنید:</p>
        <div style="background: #fff; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
          <a href="${resetLink}" style="display: inline-block; background: #e50914; color: white; padding: 12px 30px; border-radius: 5px; text-decoration: none; font-weight: bold;">
            بازیابی رمز عبور
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">این لینک تا ۱ ساعت اعتبار دارد.</p>
        <p style="color: #666; font-size: 14px;">اگر درخواست بازیابی رمز نداده‌اید، این ایمیل را نادیده بگیرید.</p>
        <p style="color: #999; font-size: 12px; margin-top: 20px;">لینک مستقیم: ${resetLink}</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export const generateResetToken = (email: string): string => {
  return jwt.sign({ email, type: "reset-password" }, JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const verifyResetToken = (token: string): { email: string } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      email: string;
      type: string;
    };

    if (decoded.type !== "reset-password") {
      return null;
    }

    return { email: decoded.email };
  } catch (error) {
    return null;
  }
};

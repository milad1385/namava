import { NextRequest, NextResponse } from "next/server";
import { sendResetEmail, generateResetToken } from "@/src/libs/mailer";
import UserModel from "@/src/models/user";
import connectToDB from "@/src/configs/db";
export async function POST(request: NextRequest) {
  try {
    await connectToDB();
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "ایمیل الزامی است" }, { status: 400 });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "کاربری با این ایمیل یافت نشد" },
        { status: 404 },
      );
    }

    const token = generateResetToken(email);

    await sendResetEmail(email, token);

    return NextResponse.json(
      { message: "لینک بازیابی با موفقیت ارسال شد" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending reset email:", error);
    return NextResponse.json({ error: "خطا در ارسال ایمیل" }, { status: 500 });
  }
}

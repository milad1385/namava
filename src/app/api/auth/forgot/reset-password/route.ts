import { NextRequest, NextResponse } from "next/server";
import { verifyResetToken } from "@/src/libs/mailer";
import UserModel from "@/src/models/user";
import { hashPassword } from "@/src/utils/auth";
import connectToDB from "@/src/configs/db";

export async function POST(request: NextRequest) {
  try {
    await connectToDB();
    const { token, newPassword } = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "توکن و رمز جدید الزامی است" },
        { status: 400 },
      );
    }

    const decoded = verifyResetToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: "لینک نامعتبر یا منقضی شده است" },
        { status: 400 },
      );
    }

    // به‌روزرسانی رمز در دیتابیس
    const hashedPassword = await hashPassword(newPassword);
    await UserModel.findOneAndUpdate(
      { email: decoded.email },
      { password: hashedPassword },
    );

    return NextResponse.json(
      { message: "رمز عبور با موفقیت تغییر یافت" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      { error: "خطا در تغییر رمز عبور" },
      { status: 500 },
    );
  }
}

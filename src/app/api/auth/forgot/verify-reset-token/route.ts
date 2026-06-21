import { NextRequest, NextResponse } from "next/server";
import { verifyResetToken } from "@/src/libs/mailer";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "توکن الزامی است" }, { status: 400 });
    }

    const decoded = verifyResetToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: "لینک نامعتبر یا منقضی شده است" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        valid: true,
        email: decoded.email,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ error: "خطا در بررسی لینک" }, { status: 500 });
  }
}

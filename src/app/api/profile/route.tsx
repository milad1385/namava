import { NextRequest, NextResponse } from "next/server";
import ProfileModel from "@/src/models/profile";
import connectToDB from "@/src/configs/db";
export const dynamic = "force-dynamic";
export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    const profileId = req.nextUrl.searchParams.get("id");
    const profile = await ProfileModel.findOne({ _id: profileId });

    return NextResponse.json(
      { message: "پروفایل با موفقیت دریافت شد", profile },
      { status: 200 },
    );
  } catch (error) {
    throw new Error(error?.message);
  }
};

import connectToDB from "@/src/configs/db";
import { authUser } from "@/src/utils/serverHelper";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import ProfileModel from "@/src/models/profile";

export async function GET(req: NextRequest) {
  try {
    connectToDB();

    const user = await authUser();

    if (!user) {
      return Response.json({ msg: "User is unauthorized" }, { status: 401 });
    }

    const profileId = cookies().get("profile")?.value;

    const currentProfile = await ProfileModel.findOne({ _id: profileId });

    const now = new Date();
    let hasSubscription = false;

    if (!user?.subscriptionEnd || new Date(user?.subscriptionEnd) < now) {
      hasSubscription = false;
    } else {
      hasSubscription = true;
    }

    const remainingTime =
      new Date(user?.subscriptionEnd).getTime() - now.getTime();
    const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));

    return Response.json({
      currentProfile: currentProfile || user.profiles[0],
      user,
      subscription: { hasSubscription, remainingDays },
    });
  } catch (error) {
    return Response.json({ msg: "Interval error" }, { status: 500 });
  }
}

import connectToDB from "@/src/configs/db";
import { authUser } from "@/src/utils/serverHelper";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import ProfileModel from "@/src/models/profile";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const user = await authUser();

    if (!user) {
      return Response.json({ msg: "User is unauthorized" }, { status: 401 });
    }

    const profileId = cookies().get("profile")?.value;
    const profileModel = ProfileModel as any;
    let currentProfile = null;
    if (profileId) {
      currentProfile = await profileModel.findOne({ _id: profileId });
    }

    if (!currentProfile && user.profiles && user.profiles.length > 0) {
      currentProfile = user.profiles[0];
    }

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
      currentProfile: currentProfile || (user.profiles && user.profiles[0]),
      user,
      subscription: { hasSubscription, remainingDays },
    });
  } catch (error) {
    console.error(error);
    return Response.json({ msg: "Internal error" }, { status: 500 });
  }
}

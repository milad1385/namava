import { NextRequest } from "next/server";
import SubscriptionModel from "@/src/models/subscription";
import OrderModel from "@/src/models/order";
import UserModel from "@/src/models/user";
import { authUser } from "@/src/utils/serverHelper";
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const { orderId, status, trackId, success } = Object.fromEntries(
    searchParams.entries(),
  );
  try {
    const user = await authUser();
    if (!user) {
      return Response.json(
        { message: "لطفا ابتدا لاگین کنید" },
        { status: 401 },
      );
    }

    const order = await OrderModel.findOne({ _id: orderId }).populate(
      "subscription",
      "time title",
    );
    if (!order) {
      return Response.json(
        { message: "سفارشی با این آیدی یافت نشد" },
        { status: 404 },
      );
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ZIBAL_BASE_URL}/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trackId,
          merchant: process.env.NEXT_PUBLIC_ZIBAL_MERCHANT_ID,
        }),
      },
    );

    const verifyData = await res.json();

    if ([100, 201].includes(verifyData.result)) {
      const verifyOrder = await OrderModel.findOneAndUpdate(
        { _id: orderId, status: "pending" },
        {
          status: "pay",
          paid_time: new Date(),
        },
        { new: true },
      ).populate("subscription", "time title");

        const endDate = new Date();
        endDate.setDate(endDate.getDate() + order.subscription.time);

        await UserModel.findByIdAndUpdate(`${user._id}`, {
          $set: {
            subscriptionEnd: endDate,
            subscriptionStart: new Date().toISOString(),
          },
        });

      return Response.json(
        {
          message: "پرداخت با موفقیت انجام شد",
          data: verifyOrder || order,
        },
        { status: 200 },
      );
    } else {
      const verifyOrder = await OrderModel.findOneAndUpdate(
        { _id: orderId, status: "pending" },
        {
          status: "cancel",
        },
        { new: true },
      ).populate("subscription", "time title");
      return Response.json(
        { message: "پرداخت با موفقیت انجام نشد",   data: verifyOrder || order, },
        { status: 200 },
      );
    }
  } catch (error) {
    return Response.json({ message: "برای بررسی سفارش شما مشکلی به وجود آمد" });
  }
}

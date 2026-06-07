import { NextRequest } from "next/server";
import SubscriptionModel from "@/src/models/subscription";
import OrderModel from "@/src/models/order";
import { authUser } from "@/src/utils/serverHelper";
export async function POST(req: NextRequest) {
  const { subscriptionId } = await req.json();
  try {
    const user = await authUser();
    if (!user) {
      return Response.json(
        { message: "لطفا ابتدا لاگین کنید" },
        { status: 401 },
      );
    }

    const subscription = await SubscriptionModel.findOne({
      _id: subscriptionId,
    });

    if (!subscription) {
      return Response.json(
        { message: "اشتراکی با این آیدی وجود ندارد" },
        { status: 404 },
      );
    }

    let amount = subscription.price;
    let discount = 0;
    if (subscription.discount) {
      discount = (amount * subscription.discount) / 100;
      amount = amount - discount;
    }

    const newOrder = await OrderModel.create({
      user: user._id,
      subscription: subscription._id,
      orderNumber: Math.floor(Math.random() * 999999999999999999),
      totalPrice: amount,
      discount,
    });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ZIBAL_BASE_URL}/v1/request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          merchant: process.env.NEXT_PUBLIC_ZIBAL_MERCHANT_ID,
          amount: amount * 10,
          orderId: newOrder.id,
          mobile: user.mobile,
          callbackUrl: process.env.NEXT_PUBLIC_ZIBAL_CALLBACK_URL,
        }),
      },
    );

    const data = await res.json();
    const trackId = data.trackId;
    return Response.json({
      message: "درگاه پرداخت با موفقیت ساخته شد ",
      trackId,
      paymentUrl: `${process.env.NEXT_PUBLIC_ZIBAL_BASE_URL}/start/${trackId}`,
    });
  } catch (error) {
    return Response.json(
      { message: "پرداخت با مشکل مواجه شد" },
      { status: 500 },
    );
  }
}

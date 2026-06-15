import Button from "@/src/components/modules/auth/Button/Button";
import PaymentGateway from "@/src/components/modules/plans/PaymentGateway";
import { getSubscription } from "@/src/libs/service/services";
import { TParams } from "@/src/libs/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";

async function page({ params }: TParams) {
  const subscription = await getSubscription(params?.id as string);

  if (!subscription) {
    notFound();
  }

  const { title, price, discount, time, _id } = subscription;

  return (
    <div className="flex flex-col md:flex-row gap-6  my-28">
      <div className="bg-namavaBlack  w-full h-[240px] px-[28px] rounded-md py-6 md:w-1/3 mx-auto text-white">
        <h1 className="text-base md:text-lg font-IranMedium text-center">
          {title}
        </h1>
        <ul className="w-full mt-5 space-y-4 pb-4">
          <li className="flex items-center justify-between">
            <span>قیمت : </span>
            <span>{price.toLocaleString("fa-IR")} تومان</span>
          </li>
          <li className="flex items-center justify-between">
            <span>تخفیف : </span>
            <span className="text-red-600">
              {((price * discount) / 100).toLocaleString("fa-IR")} تومان
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span> مبلغ قابل پرداخت : </span>
            <span>
              {(price - (price * discount) / 100).toLocaleString("fa-IR")} تومان
            </span>
          </li>
        </ul>
        {/* <div className="w-full mt-5 space-y-4">
          <h3>ثبت کد تخفیف</h3>

          <div className="bg-black flex items-center justify-between rounded-md overflow-hidden">
            <input
              type="text"
              className="bg-transparent w-full pr-4 border-none outline-none"
              placeholder="لطفا کد تخفیف خود را وارد کنید"
            />
            <Button className="!w-[80px] !rounded-none">اعمال</Button>
          </div>
        </div> */}
      </div>
      <PaymentGateway
        totalPrice={price - (price * discount) / 100}
        time={time}
        title={title}
        discount={(price * discount) / 100}
        subscriptionId={JSON.parse(JSON.stringify(_id))}
      />
    </div>
  );
}

export async function generateMetadata({ params }: TParams): Promise<Metadata> {
  const subscription = await getSubscription(params?.id as string);
  return {
    title: `${subscription.title}`,
    description: `صفحه خرید اشتراک ${subscription.title} در میلا فیلم`,
    keywords: `خرید اشتراک ، ${subscription.title}`,
  };
}

export default page;

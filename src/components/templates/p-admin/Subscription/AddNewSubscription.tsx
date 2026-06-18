"use client";
import Button from "@/src/components/modules/auth/Button/Button";
import Input from "@/src/components/modules/p-admin/Input";
import Spinner from "@/src/components/modules/spinner/Spinner";
import { createNewSubscription } from "@/src/libs/actions/subscription";
import { Subscription, TSubscription } from "@/src/validators/frontend";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineProduct } from "react-icons/ai";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaCalendar, FaGift } from "react-icons/fa6";

function AddNewSubscription() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TSubscription>({
    resolver: zodResolver(Subscription),
  });

  const createNewSubscriptionHandler = async (data: TSubscription) => {
    setIsLoading(true);
    const res = await createNewSubscription(data);
    if (res?.status === 201) {
      setIsLoading(false);
      reset();
      return toast.success(`${res?.message}`);
    }
    setIsLoading(false);
    reset();
    return toast.error(`${res?.message}`);
  };
  return (
    <form
      onSubmit={handleSubmit(createNewSubscriptionHandler)}
      className="bg-milafilmBlack rounded-lg p-6 shadow my-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-6"
    >
      <Input
        register={register}
        disable={isLoading}
        errors={errors}
        icon={<AiOutlineProduct className={`text-xl md:text-2xl`} />}
        name="title"
        title="عنوان"
        type="text"
        placeholder="عنوان اشتراک را وارد کنید"
      />

      <Input
        register={register}
        disable={isLoading}
        errors={errors}
        icon={<FaMoneyBillAlt className={`text-xl md:text-2xl`} />}
        name="price"
        title="مبلغ"
        type="text"
        placeholder="مبلغ اشتراک را وارد کنید"
      />

      <Input
        register={register}
        disable={isLoading}
        errors={errors}
        icon={<FaCalendar className={`text-xl md:text-2xl`} />}
        name="time"
        title="تعداد روز"
        type="text"
        placeholder="تعداد روز های اشتراک را وارد کنید"
      />

      <Input
        register={register}
        disable={isLoading}
        errors={errors}
        icon={<FaGift className={`text-xl md:text-2xl`} />}
        name="discount"
        title="تخفیف"
        type="text"
        placeholder="درصد تخفیف را وارد کنید"
      />

      <div className="flex items-center gap-x-3 md:gap-x-8 mt-5 text-white">
        <Button
          disabled={isLoading}
          className={`${isValid ? "" : "!bg-slate-600 "} h-[44px]`}
        >
          {isLoading ? <Spinner /> : "ساخت اشتراک"}
        </Button>
        <Button onClick={() => reset()} type="reset" className="bg-red-700">
          لغو
        </Button>
      </div>
    </form>
  );
}

export default AddNewSubscription;

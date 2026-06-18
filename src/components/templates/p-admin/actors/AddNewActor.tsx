"use client";
import Button from "@/src/components/modules/auth/Button/Button";
import Input from "@/src/components/modules/p-admin/Input";
import Spinner from "@/src/components/modules/spinner/Spinner";
import { createNewActor, updateActor } from "@/src/libs/actions/star";
import { updateUser } from "@/src/libs/actions/user";
import { TForm } from "@/src/libs/types";
import { Actor, TActor, UpdateActor } from "@/src/validators/frontend";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaInstagram, FaLink, FaTwitter, FaUser } from "react-icons/fa6";
import { RiArticleLine } from "react-icons/ri";

function AddNewActor({ status, actor }: TForm) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { _id, ...info } = actor ?? {};

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TActor>({
    resolver: zodResolver(status === "create" ? Actor : UpdateActor),
    defaultValues: actor ? info : {},
  });

  const submitHandler = async (data: TActor) => {
    const actorData = new FormData();

    actorData.append("name", data.name);
    actorData.append("bio", data.bio);
    actorData.append("link", data.link);
    actorData.append("twitter", data.twitter as string);
    actorData.append("instagram", data.instagram as string);
    actorData.append("image", data?.image?.[0] ?? "");
    if (status === "create") {
      setIsLoading(true);
      const res = await createNewActor(actorData);
      setIsLoading(false);
      if (res?.status === 201) {
        reset();
        return toast.success(`${res?.message}`);
      }
      toast.error(`${res?.message}`);
      reset();
    } else {
      setIsLoading(true);
      const res = await updateActor(actor._id, actorData);
      if (res?.status === 200) {
        setIsLoading(false);
        router.push("/p-admin/actors");
        return toast.success(`${res?.message}`);
      }
      toast.error(`${res?.message}`);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="bg-milafilmBlack rounded-lg p-6 shadow my-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-6"
    >
      <Input
        register={register}
        errors={errors}
        icon={<FaUser className={`text-xl`} />}
        name="name"
        title="نام و نام خانوادگی"
        type="text"
        placeholder="نام و نام خانوادگی بازیگر را بنویسید"
      />

      <Input
        register={register}
        errors={errors}
        icon={<RiArticleLine className={`text-xl`} />}
        name="bio"
        title="بیوگرافی"
        type="text"
        placeholder="درباره  این بازیگر بنویسید"
      />

      <Input
        register={register}
        errors={errors}
        icon={<FaLink className={`text-xl`} />}
        name="link"
        title="لینک "
        type="text"
        placeholder="لینک بازیگر را وارد کنید"
      />

      <Input
        register={register}
        errors={errors}
        icon={<FaTwitter className={`text-xl`} />}
        name="twitter"
        title="توییتر"
        type="text"
        placeholder="توییتر بازیگر را وارد کنید"
      />

      <Input
        register={register}
        errors={errors}
        icon={<FaInstagram className={`text-xl`} />}
        name="instagram"
        title="اینستاگرام"
        type="text"
        placeholder="اینستاگرام بازیگر را وارد کنید"
      />

      <Input
        register={register}
        errors={errors}
        name="image"
        title="آپلودر عکس"
        type="file"
      />
      <div className="flex items-center gap-x-8 mt-5 text-white">
        <Button
          type="submit"
          className={`${isValid ? "" : "!bg-slate-600 "} h-[44px]`}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            `${status === "create" ? "ایجاد بازیگر" : "ویرایش بازیگر"}`
          )}
        </Button>
        <Button onClick={() => reset()} type="reset" className="bg-red-700">
          لغو
        </Button>
      </div>
    </form>
  );
}

export default AddNewActor;

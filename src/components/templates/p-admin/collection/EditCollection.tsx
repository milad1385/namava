"use client";
import { ContentType } from "@/public/db";
import Button from "@/src/components/modules/auth/Button/Button";
import Input from "@/src/components/modules/p-admin/Input";
import Radio from "@/src/components/modules/p-admin/Radio";
import SelectBox from "@/src/components/modules/p-admin/SelectBox";
import Spinner from "@/src/components/modules/spinner/Spinner";
import { updateCollection } from "@/src/libs/actions/collection";
import { UpdateCollection } from "@/src/validators/frontend";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineProduct } from "react-icons/ai";
import {
  FaArtstation,
  FaLink,
  FaRegFileImage,
  FaSquareCheck,
} from "react-icons/fa6";
import { RiImageAddFill } from "react-icons/ri";

function EditCollection({
  collection,
  movies,
}: {
  collection?: any;
  movies: any;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    collection?.movies?.map((movie) => ({
      value: movie._id,
      label: movie.title,
    })),
  );
  const { _id, ...info } = collection ?? {};

  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<any>({
    resolver: zodResolver(UpdateCollection),
    defaultValues: info,
  });

  const updateCollectionHandler = async (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("link", data.link);
    formData.append("type", data.type);

    // ========== ✅ فقط فایل‌های جدید رو اضافه کن (اختیاری) ==========
    if (data.mainImage && data.mainImage[0] instanceof File) {
      formData.append("mainImage", data.mainImage[0]);
    }
    if (data.deskBanner && data.deskBanner[0] instanceof File) {
      formData.append("deskBanner", data.deskBanner[0]);
    }
    if (data.mobileBanner && data.mobileBanner[0] instanceof File) {
      formData.append("mobileBanner", data.mobileBanner[0]);
    }
    if (data.logo && data.logo[0] instanceof File) {
      formData.append("logo", data.logo[0]);
    }

    setIsLoading(true);

    try {
      const res = await updateCollection(_id, formData, selectedOption);

      if (res.status === 200) {
        setSelectedOption([]);
        setIsLoading(false);
        reset();
        toast.success(`${res.message}`);
        return router.push("/p-admin/collection");
      }

      setIsLoading(false);
      return toast.error(`${res.message}`);
    } catch (error) {
      setIsLoading(false);
      return toast.error("خطا در ارتباط با سرور");
    }
  };

  const moviesOption = movies.map((movies: any) => ({
    label: movies.title,
    value: movies._id,
  }));

  return (
    <form
      onSubmit={handleSubmit(updateCollectionHandler)}
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
        placeholder="عنوان مجموعه را وارد کنید"
      />

      <Input
        register={register}
        errors={errors}
        icon={<FaLink className={`text-xl md:text-2xl`} />}
        name="link"
        title="لینک "
        type="text"
        placeholder="لینک مجموعه  را وارد کنید"
        disable={isLoading}
      />

      <Input
        register={register}
        disable={isLoading}
        errors={errors}
        icon={<FaArtstation className={`text-xl md:text-2xl`} />}
        name="description"
        title="توضیحات"
        type="text"
        placeholder="توضیحات این مجموعه را بنویسید"
      />

      <SelectBox
        register={register}
        errors={errors}
        name="movies"
        options={moviesOption}
        title="فیلم / سریال"
        multiple
        selected={selectedOption}
        onSelected={setSelectedOption}
        disable={isLoading}
        placeholder="فیلم و سریال های مورد نظر را انتخاب کنید"
      />

      <Radio
        register={register}
        errors={errors}
        name="type"
        icon={<FaSquareCheck className={`text-xl md:text-2xl`} />}
        title="گروه سنی"
        options={ContentType}
      />

      <Input
        register={register}
        errors={errors}
        name="mainImage"
        title="تصویر اصلی"
        type="file"
        disable={isLoading}
      />

      <Input
        register={register}
        errors={errors}
        name="logo"
        title="لوگو"
        type="file"
        disable={isLoading}
      />

      <Input
        register={register}
        errors={errors}
        name="deskBanner"
        title="بنر دسکتاپ"
        type="file"
        icon={<RiImageAddFill className={`text-xl md:text-2xl`} />}
        disable={isLoading}
      />

      <Input
        register={register}
        errors={errors}
        name="mobileBanner"
        title="بنر موبایل"
        type="file"
        icon={<FaRegFileImage className={`text-xl md:text-2xl`} />}
        disable={isLoading}
      />
      <div></div>

      <div className="flex items-center gap-x-3 md:gap-x-8 mt-5 text-white">
        <Button
          disabled={isLoading}
          className={`${isValid ? "" : "!bg-slate-600 "} h-[44px]`}
        >
          {isLoading ? <Spinner /> : "ویرایش مجموعه"}
        </Button>
        <Button onClick={() => reset()} type="reset" className="bg-red-700">
          لغو
        </Button>
      </div>
    </form>
  );
}

export default EditCollection;

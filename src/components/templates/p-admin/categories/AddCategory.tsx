"use client";
import Button from "@/src/components/modules/auth/Button/Button";
import Input from "@/src/components/modules/p-admin/Input";
import { Category, TCategory } from "@/src/validators/frontend";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaLink, FaTag, FaVuejs } from "react-icons/fa6";
import { RiArticleLine } from "react-icons/ri";
import SelectBox from "@/src/components/modules/p-admin/SelectBox";
import { addNewCategory } from "@/src/libs/actions/category";
import toast from "react-hot-toast";
import Spinner from "@/src/components/modules/spinner/Spinner";

function AddCategories() {
  const [categoriesOption, setCategoriesOption] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TCategory>({
    resolver: zodResolver(Category),
  });

  useEffect(() => {
    const getAllCategories = async () => {
      const res = await fetch(`/api/category`);
      const categories = await res.json();
      const options = categories.map((category: any) => ({
        id: category._id,
        label: category.title,
        value: category._id,
      }));

      setCategoriesOption(options);
    };

    getAllCategories();
  }, []);

  const createNewCategory = async (data: TCategory, e: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("tags", data.tags);
    formData.append("link", data.link);
    formData.append("parrent", data.parrent as string);
    formData.append("desc", data.desc);
    formData.append("image", data.image ? data.image[0] : "");
    setIsLoading(true);
    const res = await addNewCategory(formData);
    if (res?.status === 201) {
      setIsLoading(false);
      reset();
      return toast.success(`${res?.message}`);
    }
    toast.error(`${res?.message}`);
    reset();
    setIsLoading(false);
  };
  return (
    <form
      onSubmit={handleSubmit(createNewCategory)}
      className="bg-milafilmBlack rounded-lg p-6 shadow my-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-6"
    >
      <Input
        register={register}
        errors={errors}
        icon={<FaVuejs className={`text-2xl`} />}
        name="title"
        title="عنوان"
        type="text"
        placeholder="عنوان دسته بندی را وارد کنید"
        disable={isLoading}
      />

      <Input
        register={register}
        errors={errors}
        icon={<FaLink className={`text-2xl`} />}
        name="link"
        title="لینک "
        type="text"
        placeholder="لینک دسته بندی را وارد کنید"
        disable={isLoading}
      />

      <Input
        register={register}
        errors={errors}
        icon={<RiArticleLine className={`text-2xl`} />}
        name="desc"
        title="توضیحات "
        type="text"
        placeholder="درباره دسته بندی بنویسید"
        disable={isLoading}
      />

      <Input
        register={register}
        errors={errors}
        icon={<FaTag className={`text-2xl`} />}
        name="tags"
        title="تگ ها"
        type="text"
        placeholder="تگ های دسته بندی را بنویسید"
        disable={isLoading}
      />

      <SelectBox
        register={register}
        errors={errors}
        name="parrent"
        options={categoriesOption}
        title="پرنت دسته بندی"
        disable={isLoading}
      />

      <Input
        register={register}
        errors={errors}
        name="image"
        title="آپلودر عکس"
        type="file"
        disable={isLoading}
      />

      <div className="flex items-center gap-x-8 mt-5 text-white">
        <Button
          disabled={isLoading}
          className={`${isValid ? "" : "!bg-slate-600 "} h-[44px]`}
        >
          {isLoading ? <Spinner /> : "ایجاد دسته بندی"}
        </Button>
        <Button onClick={() => reset()} className="bg-red-700">
          لغو
        </Button>
      </div>
    </form>
  );
}

export default AddCategories;

"use client";
import { Article, TArticle } from "@/src/validators/frontend";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineProduct } from "react-icons/ai";
import Input from "@/src/components/modules/p-admin/Input";
import { FaLetterboxd, FaLink, FaTag } from "react-icons/fa6";
import { MdAccessTime } from "react-icons/md";
import SelectBox from "@/src/components/modules/p-admin/SelectBox";
import Button from "@/src/components/modules/auth/Button/Button";
import Label from "@/src/components/modules/auth/Label/Label";
import dynamic from "next/dynamic";
import { createNewArticle } from "@/src/libs/actions/article";
import toast from "react-hot-toast";
import Spinner from "@/src/components/modules/spinner/Spinner";

const Editor = dynamic(() => import("./Editor"), { ssr: false });

function EditArticle({ movies }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [articleBody, setArticleBody] = useState("");
  const [selectedOption, setSelectedOption] = useState<any>({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TArticle>({
    resolver: zodResolver(Article),
  });

  const moviesOption = movies.map((movie: any) => ({
    id: movie._id,
    value: movie._id,
    label: movie.title,
  }));

  const createNewArticleHandeler = async (data: TArticle) => {
    const articleData = new FormData();
    articleData.append("title", data.title);
    articleData.append("link", data.link);
    articleData.append("readingTime", data.readingTime);
    articleData.append("tags", data.tags);
    articleData.append("movie", selectedOption?.value);
    articleData.append("image", data.image[0]);
    articleData.append("content", articleBody);
    articleData.append("shortDesc", data.shortDesc);

    const res = await createNewArticle(articleData);
    setIsLoading(true);

    if (res?.status === 201) {
      setIsLoading(false);
      reset();
      return toast.success(`${res?.message}`);
    }
    reset();
    setIsLoading(false);
    toast.error(`${res?.message}`);
  };

  return (
    <form
      className="bg-milafilmBlack rounded-lg p-6 shadow my-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-6"
      onSubmit={handleSubmit(createNewArticleHandeler)}
    >
      <Input
        register={register}
        errors={errors}
        icon={<AiOutlineProduct className={`text-2xl`} />}
        name="title"
        title="عنوان"
        type="text"
        placeholder="عنوان مقاله را وارد کنید"
        disable={isLoading}
      />

      <Input
        register={register}
        errors={errors}
        icon={<FaLink className={`text-2xl`} />}
        name="link"
        title="لینک "
        type="text"
        placeholder="لینک مقاله را وارد کنید"
        disable={isLoading}
      />

      <Input
        register={register}
        errors={errors}
        icon={<MdAccessTime className={`text-2xl`} />}
        name="readingTime"
        title="مدت زمان"
        type="text"
        disable={isLoading}
        placeholder="مدت زمان مورد نیاز برای مطالعه مقاله را وارد کنید"
      />

      <Input
        register={register}
        errors={errors}
        icon={<FaTag className={`text-2xl`} />}
        name="tags"
        title="تگ ها"
        type="text"
        placeholder="بطور مثال اکشن ، علمی و..."
        disable={isLoading}
      />

      <Input
        register={register}
        errors={errors}
        icon={<FaLetterboxd className={`text-2xl`} />}
        name="shortDesc"
        title="توضیحات کوتاه"
        type="text"
        placeholder="در این فیلم یا سریال می توانید ..."
        disable={isLoading}
      />

      <SelectBox
        register={register}
        errors={errors}
        name="movie"
        options={moviesOption}
        title="نام فیلم / سریال"
        selected={selectedOption}
        onSelected={setSelectedOption}
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

      <div className="md:col-span-2 space-y-3 text-white">
        <Label title={"محتوای مقاله"} className="!text-base md:!text-lg" />
        <Editor article={articleBody} onArticle={setArticleBody} />
      </div>

      <div className="flex items-center gap-x-4 mt-5 text-white">
        <Button
          disabled={isLoading}
          type="submit"
          className={`${isValid ? "" : "!bg-slate-600 "}`}
        >
          {isLoading ? <Spinner /> : "ایجاد مقاله"}
        </Button>
        <Button
          disabled={isLoading}
          type="button"
          className={`${isValid ? "" : "!bg-slate-600 "}`}
        >
          پیش نویس
        </Button>
        <Button type="reset" onClick={() => reset()} className="bg-red-700">
          لغو
        </Button>
      </div>
    </form>
  );
}

export default EditArticle;

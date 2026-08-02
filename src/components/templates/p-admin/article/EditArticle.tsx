"use client";
import Button from "@/src/components/modules/auth/Button/Button";
import Label from "@/src/components/modules/auth/Label/Label";
import Input from "@/src/components/modules/p-admin/Input";
import SelectBox from "@/src/components/modules/p-admin/SelectBox";
import Spinner from "@/src/components/modules/spinner/Spinner";
import { updateArticle } from "@/src/libs/actions/article";
import { TArticle, UpdateArticle } from "@/src/validators/frontend";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineProduct } from "react-icons/ai";
import { FaLetterboxd, FaLink, FaTag } from "react-icons/fa6";
import { MdAccessTime } from "react-icons/md";
import ImagePreview from "../film/ImagePreview";
import { useRouter } from "next/navigation";

const Editor = dynamic(() => import("./Editor"), { ssr: false });

function EditArticle({ movies, article }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDraft, setIsDraft] = useState("");
  const [articleBody, setArticleBody] = useState(article.content || "");
  const [selectedOption, setSelectedOption] = useState<any>({
    value: article.movie._id,
    label: article.movie.title,
  });
  const [previewImage, setPreviewImage] = useState(article?.image || null);
  const router = useRouter();

  const { _id, ...info } = article;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TArticle>({
    resolver: zodResolver(UpdateArticle),
    defaultValues: article ? { ...info, tags: article.tags.join(",") } : {},
  });

  const moviesOption = movies.map((movie: any) => ({
    id: movie._id,
    value: movie._id,
    label: movie.title,
  }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  const editArticleHandler = async (data: TArticle) => {
    const articleData = new FormData();
    articleData.append("title", data.title);
    articleData.append("link", data.link);
    articleData.append("readingTime", data.readingTime);
    articleData.append("tags", data.tags);
    articleData.append("movie", selectedOption?.value || "");
    articleData.append("content", articleBody);
    articleData.append("shortDesc", data.shortDesc);
    articleData.append("isDraft", isDraft);

    if (data.image && data.image[0] instanceof File) {
      articleData.append("image", data.image[0]);
    }

    setIsLoading(true);

    try {
      const res = await updateArticle(_id, articleData);

      if (res?.status === 200) {
        setIsLoading(false);
        reset();
        toast.success(res?.message);
        router.push("/p-admin/articles");
        return;
      }

      setIsLoading(false);
      toast.error(res?.message || "خطا در بروزرسانی مقاله");
    } catch (error) {
      setIsLoading(false);
      toast.error("خطا در ارتباط با سرور");
    }
  };

  return (
    <form
      className="bg-milafilmBlack rounded-lg p-6 shadow my-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-6"
      onSubmit={handleSubmit(editArticleHandler)}
    >
      <Input
        register={register}
        errors={errors}
        icon={<AiOutlineProduct className="text-2xl" />}
        name="title"
        title="عنوان"
        type="text"
        placeholder="عنوان مقاله را وارد کنید"
        disable={isLoading}
      />

      <Input
        register={register}
        errors={errors}
        icon={<FaLink className="text-2xl" />}
        name="link"
        title="لینک"
        type="text"
        placeholder="لینک مقاله را وارد کنید"
        disable={isLoading}
      />

      <Input
        register={register}
        errors={errors}
        icon={<MdAccessTime className="text-2xl" />}
        name="readingTime"
        title="مدت زمان"
        type="text"
        disable={isLoading}
        placeholder="مدت زمان مورد نیاز برای مطالعه مقاله را وارد کنید"
      />

      <Input
        register={register}
        errors={errors}
        icon={<FaTag className="text-2xl" />}
        name="tags"
        title="تگ ها"
        type="text"
        placeholder="بطور مثال اکشن ، علمی و..."
        disable={isLoading}
      />

      <Input
        register={register}
        errors={errors}
        icon={<FaLetterboxd className="text-2xl" />}
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
        isReactSelect
      />

      <div>
        <Input
          register={register}
          errors={errors}
          name="image"
          title="آپلودر عکس"
          type="file"
          disable={isLoading}
          onChange={handleFileChange}
        />
        <ImagePreview
          src={previewImage}
          alt="تصویر مقاله"
          size="w-[250px] h-[150px]"
        />
      </div>

      <div className="md:col-span-2 space-y-3 text-white">
        <Label title={"محتوای مقاله"} className="!text-base md:!text-lg" />
        <Editor article={articleBody} onArticle={setArticleBody} />
      </div>

      <div className="flex items-center gap-x-4 mt-5 text-white">
        <Button
          disabled={isLoading}
          type="submit"
          className={`${isValid ? "" : "!bg-slate-600"} !h-[50px]`}
        >
          {isLoading && !isDraft ? <Spinner /> : "ویرایش مقاله"}
        </Button>
        <Button
          disabled={isLoading}
          type="submit"
          onClick={() => setIsDraft("true")}
          className={`${isValid ? "" : "!bg-slate-600"} !h-[50px]`}
        >
          {isLoading && isDraft ? <Spinner /> : "ذخیره پیش نویس"}
        </Button>
        <Button type="reset" onClick={() => reset()} className="bg-red-700 !h-[50px]">
          لغو
        </Button>
      </div>
    </form>
  );
}

export default EditArticle;

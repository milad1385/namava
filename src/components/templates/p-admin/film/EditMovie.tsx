"use client";
import { ContentType, MovieStatus, RadioOptions, voiceType } from "@/public/db";
import Button from "@/src/components/modules/auth/Button/Button";
import Checkbox from "@/src/components/modules/p-admin/CheckBox";
import Input from "@/src/components/modules/p-admin/Input";
import Radio from "@/src/components/modules/p-admin/Radio";
import SelectBox from "@/src/components/modules/p-admin/SelectBox";
import Spinner from "@/src/components/modules/spinner/Spinner";
import { createNewMovie, updateMovie } from "@/src/libs/actions/movie";
import { TMovie, UpdateMovie } from "@/src/validators/frontend";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiCameraMovie, BiMovie } from "react-icons/bi";
import { FaLink, FaRegFileImage, FaSquareCheck } from "react-icons/fa6";
import { FiVideo } from "react-icons/fi";
import { IoEarthOutline } from "react-icons/io5";
import { LuCalendarRange } from "react-icons/lu";
import { MdAccessTime, MdOutlineWbIncandescent } from "react-icons/md";
import { RiArticleLine, RiImageAddFill, RiMovie2Line } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import ImagePreview from "./ImagePreview";

function EditMovie({ stars, subCategories, movie }: any) {
  const [movieType, setMovieType] = useState(movie.type);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    movie?.actors?.map((actor: any) => ({
      value: actor._id,
      label: actor.name,
    })) || [],
  );
  const router = useRouter();

  const { _id, ...info } = movie;

  const [previewImages, setPreviewImages] = useState({
    mainImage: movie?.mainImage || null,
    logo: movie?.logo || null,
    deskBanner: movie?.deskBanner || null,
    mobileBanner: movie?.mobileBanner || null,
    detailImage: movie?.detailImage || [],
    video: movie?.video || null,
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (fieldName === "detailImage") {
      const newPreviews: string[] = [];
      for (let i = 0; i < files.length; i++) {
        newPreviews.push(URL.createObjectURL(files[i]));
      }
      setPreviewImages((prev) => ({
        ...prev,
        detailImage: [...prev.detailImage, ...newPreviews],
      }));
    } else {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      setPreviewImages((prev) => ({
        ...prev,
        [fieldName]: previewUrl,
      }));
    }
  };

  const removeDetailImage = (index: number) => {
    if (previewImages.detailImage.length <= 1) return;
    setPreviewImages((prev) => ({
      ...prev,
      detailImage: prev.detailImage.filter((_, i) => i !== index),
    }));
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TMovie>({
    resolver: zodResolver(UpdateMovie),
    defaultValues: movie ? { ...info, category: movie.category._id } : {},
  });

  const subCategoriesOptions = subCategories.map((category: any) => ({
    label: `${category?.parrent?.title}\t- ${category.title}`,
    value: category._id,
    id: category._id,
  }));

  const voices = voiceType.map((voice) => ({
    label: voice.name,
    value: voice.name,
    id: voice.id,
  }));

  const starsOption = stars.map((star: any) => ({
    label: star.name,
    value: star._id,
  }));

  const updateMovieHandler = async (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("ageRange", data.ageRange);
    formData.append("time", data.time);
    formData.append("link", data.link);
    formData.append("type", movieType);
    formData.append("shortDesc", data.shortDesc);
    formData.append("director", data.director);
    formData.append("showTime", data.showTime);
    formData.append("category", data.category);
    formData.append("season", data.season || null);
    formData.append("longDesc", data.longDesc);
    formData.append("isSlider", data.isSlider);
    formData.append("language", data.language);
    formData.append("priceStatus", data.priceStatus);
    formData.append("contentType", data.contentType);

    const remainingDetailImages = previewImages.detailImage.filter(
      (src: string) => !src.startsWith("blob:"),
    );
    formData.append(
      "remainingDetailImages",
      JSON.stringify(remainingDetailImages),
    );

    if (data.mainImage && data.mainImage[0] instanceof File) {
      formData.append("mainImage", data.mainImage[0]);
    }
    if (data.logo && data.logo[0] instanceof File) {
      formData.append("logo", data.logo[0]);
    }
    if (data.video && data.video[0] instanceof File) {
      formData.append("video", data.video[0]);
    }
    if (data.deskBanner && data.deskBanner[0] instanceof File) {
      formData.append("deskBanner", data.deskBanner[0]);
    }
    if (data.mobileBanner && data.mobileBanner[0] instanceof File) {
      formData.append("mobileBanner", data.mobileBanner[0]);
    }

    if (data.detailImage && data.detailImage.length > 0) {
      for (const image of data.detailImage) {
        if (image instanceof File) {
          formData.append("detailImage", image);
        }
      }
    }

    setIsLoading(true);

    const res = await updateMovie(_id, formData, selectedOption);

    if (res?.status === 200) {
      setIsLoading(false);
      reset();
      toast.success(res?.message);
      router.push("/p-admin/movies");
      return;
    }

    setIsLoading(false);
    toast.error(res?.message || "خطا در بروزرسانی اثر");
  };
  return (
    <form
      onSubmit={handleSubmit(updateMovieHandler)}
      className="bg-milafilmBlack rounded-lg p-6 shadow my-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-6"
    >
      <Input
        register={register}
        errors={errors}
        icon={<RiMovie2Line className="text-xl md:text-2xl" />}
        name="title"
        title="عنوان"
        type="text"
        placeholder="نام اثر را وارد کنید"
        disable={isLoading}
      />
      <Input
        register={register}
        errors={errors}
        icon={<LuCalendarRange className="text-xl md:text-2xl" />}
        name="ageRange"
        title="رده سنی"
        type="text"
        placeholder="رده سنی مورد نظر را وارد کنید"
        disable={isLoading}
      />

      <Input
        register={register}
        errors={errors}
        icon={<MdAccessTime className="text-xl md:text-2xl" />}
        name="time"
        title="زمان"
        type="text"
        placeholder="مدت زمان اثر را وارد کنید"
        disable={isLoading}
      />

      <Input
        register={register}
        errors={errors}
        icon={<FaLink className="text-xl md:text-2xl" />}
        name="link"
        title="لینک"
        type="text"
        placeholder="لینک اثر را وارد کنید"
        disable={isLoading}
      />

      <Radio
        register={register}
        errors={errors}
        name="contentType"
        icon={<FaSquareCheck className="text-xl md:text-2xl" />}
        title="محتوا"
        options={ContentType}
      />

      <Radio
        register={register}
        errors={errors}
        name="priceStatus"
        icon={<BiCameraMovie className="text-xl md:text-2xl" />}
        title="اشتراک"
        options={MovieStatus}
      />

      <Radio
        register={register}
        errors={errors}
        name="type"
        icon={<BiCameraMovie className="text-xl md:text-2xl" />}
        title="نوع"
        options={RadioOptions}
        onType={setMovieType}
      />

      <Input
        register={register}
        errors={errors}
        icon={<MdOutlineWbIncandescent className="text-xl md:text-2xl" />}
        name="shortDesc"
        title="درباره اثر (خلاصه)"
        type="text"
        placeholder="در مورد اثر به شکل خلاصه توضیح دهید"
        disable={isLoading}
      />
      <Input
        register={register}
        errors={errors}
        icon={<IoEarthOutline className="text-xl md:text-2xl" />}
        name="director"
        title="کارگردان"
        type="text"
        placeholder="نام کارگردان این اثر وارد کنید"
        disable={isLoading}
      />

      <Input
        register={register}
        errors={errors}
        icon={<SlCalender className="text-xl md:text-2xl" />}
        name="showTime"
        title="زمان پخش"
        type="text"
        placeholder="زمان پخش اثر را بنویسید"
        disable={isLoading}
      />

      <SelectBox
        register={register}
        errors={errors}
        name="category"
        options={subCategoriesOptions}
        title="دسته بندی"
        disable={isLoading}
      />

      <SelectBox
        register={register}
        errors={errors}
        placeholder="بازیگران را انتخاب کنید"
        name="stars"
        options={starsOption}
        title="بازیگران"
        multiple
        selected={selectedOption}
        onSelected={setSelectedOption}
        disable={isLoading}
      />

      {movieType === "series" && (
        <Input
          register={register}
          errors={errors}
          icon={<BiMovie className="text-xl md:text-2xl" />}
          name="season"
          title="تعداد فصل"
          type="text"
          placeholder="لطفا تعداد فصل این سریال را وارد کنید"
          disable={isLoading}
        />
      )}

      <Input
        register={register}
        errors={errors}
        icon={<RiArticleLine className="text-xl md:text-2xl" />}
        name="longDesc"
        title="توضیحات کامل"
        type="text"
        placeholder="توضیحات اثر را بنویسید"
        disable={isLoading}
      />

      <SelectBox
        register={register}
        errors={errors}
        name="language"
        options={voices}
        title="زبان"
        disable={isLoading}
      />

      <div className="col-span-1">
        <Input
          register={register}
          errors={errors}
          name="mainImage"
          title="تصویر اصلی"
          type="file"
          disable={isLoading}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleFileChange(e, "mainImage")
          }
        />
        <ImagePreview src={previewImages.mainImage} alt="تصویر اصلی" />
      </div>

      <div className="col-span-1">
        <Input
          register={register}
          errors={errors}
          name="logo"
          title="لوگو"
          type="file"
          disable={isLoading}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleFileChange(e, "logo")
          }
        />
        <ImagePreview src={previewImages.logo} alt="لوگو" />
      </div>

      <div className="col-span-1">
        <Input
          register={register}
          errors={errors}
          name="video"
          title="ویدیو"
          type="file"
          icon={<FiVideo className="text-xl md:text-2xl" />}
          disable={isLoading}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleFileChange(e, "video")
          }
        />
        {previewImages.video && (
          <ImagePreview
            src={previewImages.video}
            alt="ویدیو"
            size="w-[200px] h-[120px]"
          />
        )}
      </div>

      <div className="col-span-1">
        <Input
          register={register}
          errors={errors}
          name="deskBanner"
          title="بنر دسکتاپ"
          type="file"
          icon={<RiImageAddFill className="text-xl md:text-2xl" />}
          disable={isLoading}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleFileChange(e, "deskBanner")
          }
        />
        <ImagePreview
          src={previewImages.deskBanner}
          alt="بنر دسکتاپ"
          size="w-[200px] h-[120px]"
        />
      </div>

      <div className="col-span-1">
        <Input
          register={register}
          errors={errors}
          name="mobileBanner"
          title="بنر موبایل"
          type="file"
          icon={<FaRegFileImage className="text-xl md:text-2xl" />}
          disable={isLoading}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleFileChange(e, "mobileBanner")
          }
        />
        <ImagePreview
          src={previewImages.mobileBanner}
          alt="بنر موبایل"
          size="w-[120px] h-[120px]"
        />
      </div>

      <div className="col-span-1">
        <Input
          register={register}
          errors={errors}
          name="detailImage"
          title="تصاویر جزییات"
          type="file"
          multiple
          icon={<FaRegFileImage className="text-xl md:text-2xl" />}
          disable={isLoading}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleFileChange(e, "detailImage")
          }
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {previewImages.detailImage.map((src: string, index: number) => (
            <div key={index} className="relative">
              <ImagePreview
                src={src}
                alt={`تصویر جزییات ${index + 1}`}
                size="w-[100px] h-[100px]"
              />
              {previewImages.detailImage.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDetailImage(index)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700 transition-colors z-10"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
        {previewImages.detailImage.length === 0 && (
          <p className="text-xs text-gray-400 mt-1">
            هیچ تصویر جزییاتی انتخاب نشده است
          </p>
        )}
      </div>

      <div className="mt-14">
        <Checkbox
          id="slider"
          name="isSlider"
          register={register}
          title="اسلایدر"
        />
      </div>

      {movieType === "series" && <div className="hidden md:block"></div>}
      <div className="hidden md:block"></div>
      <div className="flex items-center gap-x-3 md:gap-x-4 mt-5 text-white">
        <Button
          disabled={isLoading}
          type="submit"
          className={`${isValid ? "" : "!bg-slate-600"} h-[44px]`}
        >
          {isLoading ? <Spinner /> : "ویرایش اثر"}
        </Button>
        <Button
          disabled={isLoading}
          type="button"
          className="bg-amber-500"
          onClick={() => router.push("/p-admin/series")}
        >
          ویرایش قسمت
        </Button>
        <Button onClick={() => reset()} className="bg-red-700">
          لغو
        </Button>
      </div>
    </form>
  );
}

export default EditMovie;

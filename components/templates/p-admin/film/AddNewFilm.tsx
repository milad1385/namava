"use client";
import Button from "@/components/modules/auth/Button/Button";
import Input from "@/components/modules/p-admin/Input";
import Radio from "@/components/modules/p-admin/Radio";
import SelectBox from "@/components/modules/p-admin/SelectBox";
import { RadioOptions, voiceType } from "@/public/db";
import { Movie, TMovie } from "@/src/validators/frontend";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiCameraMovie, BiMovie } from "react-icons/bi";
import { FaLink, FaRegFileImage } from "react-icons/fa6";
import { FiVideo } from "react-icons/fi";
import { LuCalendarRange } from "react-icons/lu";
import { MdAccessTime, MdOutlineWbIncandescent } from "react-icons/md";
import { RiArticleLine, RiImageAddFill, RiMovie2Line } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";

function AddNewFilm() {
  const [movieType, setMovieType] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid },
  } = useForm<TMovie>({
    resolver: zodResolver(Movie),
  });

  const fakeOptions = [
    { id: 1, label: "اکشن", value: "Action" },
    { id: 2, label: "کمدی", value: "Comedy" },
    { id: 3, label: "علمی تخیلی", value: "non-fiction" },
  ];

  const voices = voiceType.map((voice) => ({
    label: voice.name,
    value: voice.name,
    id: voice.id,
  }));

  const createNewMovie = async (data: TMovie) => {
    console.log("hello");

    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(createNewMovie)}
      className="bg-namavaBlack rounded-lg p-6 shadow my-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-6"
    >
      <Input
        register={register}
        errors={errors}
        icon={<RiMovie2Line className={`text-xl`} />}
        name="title"
        title="عنوان"
        type="text"
        placeholder="نام اثر را وارد کنید"
      />
      <Input
        register={register}
        errors={errors}
        icon={<LuCalendarRange className={`text-xl`} />}
        name="ageRange"
        title="رده سنی"
        type="text"
        placeholder="رده سنی مورد نظر را وارد کنید"
      />

      <Input
        register={register}
        errors={errors}
        icon={<MdAccessTime className={`text-xl`} />}
        name="time"
        title="زمان"
        type="text"
        placeholder="مدت زمان اثر را وارد کنید"
      />

      <Input
        register={register}
        errors={errors}
        icon={<FaLink className={`text-xl`} />}
        name="link"
        title="لینک "
        type="text"
        placeholder="لینک اثر  را وارد کنید"
      />

      <Radio
        register={register}
        errors={errors}
        name="type"
        icon={<BiCameraMovie className={`text-2xl`} />}
        title="نوع اثر"
        options={RadioOptions}
        onType={setMovieType}
      />

      <Input
        register={register}
        errors={errors}
        icon={<MdOutlineWbIncandescent className={`text-xl`} />}
        name="shortDesc"
        title="درباره اثر (خلاصه)"
        type="text"
        placeholder="در مورد اثر به شکل خلاصه توضیح دهید"
      />

      <Input
        register={register}
        errors={errors}
        icon={<SlCalender className={`text-xl`} />}
        name="showTime"
        title="زمان پخش"
        type="text"
        placeholder="زمان پخش اثر را بنویسید"
      />

      <SelectBox
        register={register}
        errors={errors}
        name="category"
        options={fakeOptions}
        title="دسته بندی"
      />

      {movieType === "series" && (
        <Input
          register={register}
          errors={errors}
          icon={<BiMovie className={`text-xl`} />}
          name="season"
          title="تعداد فصل"
          type="text"
          placeholder="لطفا تعداد فصل این سریال را وارد کنید"
        />
      )}

      <Input
        register={register}
        errors={errors}
        icon={<RiArticleLine className={`text-xl`} />}
        name="longDesc"
        title="توضیحات کامل"
        type="text"
        placeholder="توضیحات اثر را بنویسید"
      />

      <SelectBox
        register={register}
        errors={errors}
        name="language"
        options={voices}
        title="زبان"
      />

      <Input
        register={register}
        errors={errors}
        name="mainImage"
        title="تصویر اصلی"
        type="file"
      />

      <Input
        register={register}
        errors={errors}
        name="video"
        title="ویدیو"
        type="file"
        icon={<FiVideo className={`text-2xl`} />}
      />

      <Input
        register={register}
        errors={errors}
        name="deskBanner"
        title="بنر دسکتاپ"
        type="file"
        icon={<RiImageAddFill className={`text-2xl`} />}
      />

      <Input
        register={register}
        errors={errors}
        name="mobileBanner"
        title="بنر موبایل"
        type="file"
        icon={<FaRegFileImage className={`text-2xl`} />}
      />

      <Input
        register={register}
        errors={errors}
        name="detailImage"
        title="تصاویر جزییات"
        type="file"
        icon={<FaRegFileImage className={`text-2xl`} />}
      />

      {movieType === "series" && <div className="hidden md:block"></div>}
      <div className="hidden md:block"></div>
      <div className="flex items-center gap-x-8 mt-5 text-white">
        <Button type="submit" className={`${isValid ? "" : "!bg-slate-600 "}`}>
          ایجاد اثر
        </Button>
        <Button className="bg-amber-500">صفحه سریال</Button>
      </div>
      <div className="flex items-center gap-x-8 mt-5 text-white">
        <Button className="bg-red-700">لغو</Button>
        <div className="w-full"></div>
      </div>
    </form>
  );
}

export default AddNewFilm;

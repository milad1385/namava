"use client";
import Button from "@/src/components/modules/auth/Button/Button";
import Input from "@/src/components/modules/p-admin/Input";
import SelectBox from "@/src/components/modules/p-admin/SelectBox";
import Spinner from "@/src/components/modules/spinner/Spinner";
import { createNewEpisode } from "@/src/libs/actions/episode";
import { Session, TSession } from "@/src/validators/frontend";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaLink } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { FiVideo } from "react-icons/fi";
import { MdAccessTime } from "react-icons/md";
import { RiMovie2Line } from "react-icons/ri";

function AddNewSession({ series }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [seasonsData, setSeasonsData] = useState([]);
  const [isLoadingSeason, setIsLoadingSeason] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    watch,
  } = useForm<TSession>({
    resolver: zodResolver(Session),
  });

  const seriesOptions = series.map((movie: any) => ({
    id: movie._id,
    value: movie._id,
    label: movie.title,
  }));

  const createNewSession = async (data: TSession) => {
    const episodeData = new FormData();
    episodeData.append("title", data.title);
    episodeData.append("image", data.banner[0]);
    episodeData.append("video", data.video[0]);
    episodeData.append("description", data.desc);
    episodeData.append("time", data.time);
    episodeData.append("link", data.link);
    episodeData.append("series", data.serial);
    episodeData.append("season", data.season);
    setIsLoading(true);
    const res = await createNewEpisode(episodeData);
    if (res?.status === 201) {
      setIsLoading(false);
      reset();
      return toast.success(`${res?.message}`);
    }
    setIsLoading(false);
    toast.error(`${res?.message}`);
    reset();
  };

  const selectedSerial = watch("serial");
  useEffect(() => {
    const getSeasonsNumbers = async () => {
      setIsLoadingSeason(true);
      const res = await fetch(`/api/series/${selectedSerial}`);
      const seaesonData = await res.json();
      const { season } = seaesonData;
      let seasons = [];
      for (let i = 1; i <= Number(season); i++) {
        seasons.push({ id: i, value: `${i}`, label: `فصل ${i}` });
      }
      setSeasonsData(seasons);
      setIsLoadingSeason(false);
    };

    if (selectedSerial) {
      getSeasonsNumbers();
    }
  }, [selectedSerial]);

  return (
    <form
      onSubmit={handleSubmit(createNewSession)}
      className="bg-milafilmBlack rounded-lg p-6 shadow my-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-6"
    >
      <Input
        register={register}
        errors={errors}
        icon={<RiMovie2Line className={`text-2xl`} />}
        name="title"
        title="نام قسمت"
        type="text"
        placeholder="نام قسمت را وارد کنید"
        disable={isLoading}
      />

      <Input
        register={register}
        errors={errors}
        icon={<MdAccessTime className={`text-2xl`} />}
        name="time"
        title="زمان"
        type="text"
        placeholder="مدت زمان قسمت را وارد کنید"
        disable={isLoading}
      />

      <Input
        register={register}
        errors={errors}
        icon={<FaLink className={`text-2xl`} />}
        name="link"
        title="لینک "
        type="text"
        placeholder="لینک قسمت را وارد کنید"
        disable={isLoading}
      />

      <Input
        register={register}
        errors={errors}
        icon={<FaLink className={`text-2xl`} />}
        name="desc"
        title="درباره قسمت (خلاصه)"
        type="text"
        placeholder="در مورد قسمت به شکل خلاصه توضیح دهید"
        disable={isLoading}
      />

      <Input
        register={register}
        errors={errors}
        name="banner"
        title="بنر"
        type="file"
        icon={<FaImage className={`text-2xl`} />}
        disable={isLoading}
      />

      <Input
        register={register}
        errors={errors}
        name="video"
        title="ویدیو"
        type="file"
        icon={<FiVideo className={`text-2xl`} />}
        disable={isLoading}
      />

      <SelectBox
        register={register}
        errors={errors}
        name="serial"
        options={seriesOptions}
        title="نام سریال"
        disable={isLoading}
      />
      <SelectBox
        register={register}
        errors={errors}
        name="season"
        options={seasonsData}
        title="فصل"
        disable={isLoadingSeason || isLoading}
      />

      <div className="flex items-center gap-x-8 mt-5 text-white">
        <Button
          disabled={isLoading}
          className={`${isValid ? "" : "!bg-slate-600 "} h-[44px]`}
        >
          {isLoading ? <Spinner /> : "ایجاد اثر"}
        </Button>
        <Button onClick={() => reset()} className="bg-red-700">
          لغو
        </Button>
      </div>
    </form>
  );
}

export default AddNewSession;

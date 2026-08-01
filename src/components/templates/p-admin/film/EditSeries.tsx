"use client";
import Button from "@/src/components/modules/auth/Button/Button";
import Input from "@/src/components/modules/p-admin/Input";
import SelectBox from "@/src/components/modules/p-admin/SelectBox";
import Spinner from "@/src/components/modules/spinner/Spinner";
import { updateEpisode } from "@/src/libs/actions/episode";
import { TUpdateSession, UpdateSession } from "@/src/validators/frontend";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaLink } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { FiVideo } from "react-icons/fi";
import { MdAccessTime } from "react-icons/md";
import { RiMovie2Line } from "react-icons/ri";
import ImagePreview from "./ImagePreview";

function EditSeries({ episode, series }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [seasonsData, setSeasonsData] = useState([]);
  const [isLoadingSeason, setIsLoadingSeason] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    value: episode.series._id,
    label: episode.series.title,
  });

  console.log(episode);

  const [selectedSeason, setSelectedSeason] = useState({
    value: episode?.season?.seasonNumber?.toString() || "",
    label: episode?.season?.seasonNumber
      ? `فصل ${episode.season.seasonNumber}`
      : "",
  });

  const [previewImages, setPreviewImages] = useState({
    banner: episode?.image || null,
    video: episode?.video || null,
  });

  const router = useRouter();

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImages((prev) => ({
        ...prev,
        [fieldName]: previewUrl,
      }));
    }
  };

  const { _id, ...info } = episode;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<TUpdateSession>({
    resolver: zodResolver(UpdateSession),
    defaultValues: episode
      ? {
          ...info,
          desc: info.description,
          season: episode?.season?.seasonNumber?.toString() || "",
        }
      : {},
  });

  const seriesOptions = series.map((movie: any) => ({
    id: movie._id,
    value: movie._id,
    label: movie.title,
  }));

  const updateSessionHandler = async (data: TUpdateSession) => {
    const episodeData = new FormData();
    episodeData.append("title", data.title);
    episodeData.append("description", data.desc);
    episodeData.append("time", data.time);
    episodeData.append("link", data.link);
    episodeData.append("series", selectedOption.value.toString());
    episodeData.append("season", selectedSeason.value);

    if (data.banner && data.banner[0] instanceof File) {
      episodeData.append("image", data.banner[0]);
    }
    if (data.video && data.video[0] instanceof File) {
      episodeData.append("video", data.video[0]);
    }

    setIsLoading(true);

    try {
      const res = await updateEpisode(_id, episodeData);

      if (res?.status === 200) {
        setIsLoading(false);
        reset();
        toast.success(res?.message);
        router.push(`/p-admin/series/${episode.series._id}`);
        return;
      }

      setIsLoading(false);
      toast.error(res?.message || "خطا در بروزرسانی قسمت");
    } catch (error) {
      setIsLoading(false);
      toast.error("خطا در ارتباط با سرور");
    }
  };

  useEffect(() => {
    const getSeasonsNumbers = async () => {
      setIsLoadingSeason(true);
      const res = await fetch(`/api/series/${selectedOption.value}`);
      const seaesonData = await res.json();
      const { season } = seaesonData;
      let seasons = [];
      for (let i = 1; i <= Number(season); i++) {
        seasons.push({ id: i, value: `${i}`, label: `فصل ${i}` });
      }
      setSeasonsData(seasons);

      if (episode?.season?.seasonNumber) {
        const seasonNumber = episode.season.seasonNumber.toString();
        const found = seasons.find((s) => s.value === seasonNumber);
        if (found) {
          setSelectedSeason(found);
          setValue("season", seasonNumber);
        }
      }

      setIsLoadingSeason(false);
    };

    if (selectedOption) {
      getSeasonsNumbers();
    }
  }, [selectedOption, episode, setValue]);

  return (
    <form
      onSubmit={handleSubmit(updateSessionHandler)}
      className="bg-milafilmBlack rounded-lg p-6 shadow my-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-6"
    >
      <Input
        register={register}
        errors={errors}
        icon={<RiMovie2Line className="text-2xl" />}
        name="title"
        title="نام قسمت"
        type="text"
        placeholder="نام قسمت را وارد کنید"
        disable={isLoading}
      />

      <Input
        register={register}
        errors={errors}
        icon={<MdAccessTime className="text-2xl" />}
        name="time"
        title="زمان"
        type="text"
        placeholder="مدت زمان قسمت را وارد کنید"
        disable={isLoading}
      />

      <Input
        register={register}
        errors={errors}
        icon={<FaLink className="text-2xl" />}
        name="link"
        title="لینک"
        type="text"
        placeholder="لینک قسمت را وارد کنید"
        disable={isLoading}
      />

      <Input
        register={register}
        errors={errors}
        icon={<FaLink className="text-2xl" />}
        name="desc"
        title="درباره قسمت (خلاصه)"
        type="text"
        placeholder="در مورد قسمت به شکل خلاصه توضیح دهید"
        disable={isLoading}
      />

      <div className="col-span-1">
        <Input
          register={register}
          errors={errors}
          name="banner"
          title="بنر"
          type="file"
          icon={<FaImage className="text-2xl" />}
          disable={isLoading}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleFileChange(e, "banner")
          }
        />
        <ImagePreview
          src={previewImages.banner}
          alt="بنر"
          size="w-[200px] h-[120px]"
        />
      </div>

      <div className="col-span-1">
        <Input
          register={register}
          errors={errors}
          name="video"
          title="ویدیو"
          type="file"
          icon={<FiVideo className="text-2xl" />}
          disable={isLoading}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleFileChange(e, "video")
          }
        />
        <ImagePreview
          src={previewImages.video}
          alt="ویدیو"
          size="w-[200px] h-[120px]"
        />
      </div>

      <SelectBox
        register={register}
        errors={errors}
        name="serial"
        options={seriesOptions}
        title="نام سریال"
        disable={isLoading}
        selected={selectedOption}
        onSelected={setSelectedOption}
        isReactSelect
        placeholder="سریال مورد نظر را انتخاب کنید"
      />

      <SelectBox
        register={register}
        errors={errors}
        name="season"
        options={seasonsData}
        title="فصل"
        disable={isLoadingSeason || isLoading || selectedOption.value === -1}
        selected={selectedSeason}
        onSelected={setSelectedSeason}
        isReactSelect
        placeholder="فصل مورد نظر را انتخاب کنید"
      />

      <div className="flex items-center gap-x-8 mt-5 text-white">
        <Button
          disabled={isLoading}
          className={`${isValid ? "" : "!bg-slate-600"} h-[44px]`}
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

export default EditSeries;

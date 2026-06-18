"use client";
import Button from "@/src/components/modules/auth/Button/Button";
import { Menu, TMenu } from "@/src/validators/frontend";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineProduct } from "react-icons/ai";
import Input from "@/src/components/modules/p-admin/Input";
import { FaLink } from "react-icons/fa6";
import SelectBox from "@/src/components/modules/p-admin/SelectBox";
import { createNewMenu } from "@/src/libs/actions/menu";
import toast from "react-hot-toast";
import Spinner from "@/src/components/modules/spinner/Spinner";

function AddNewMenu() {
  const [isLoading, setIsLoading] = useState(false);
  const [menusOption, setMenusOption] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TMenu>({
    resolver: zodResolver(Menu),
  });

  useEffect(() => {
    const getAllMenus = async () => {
      const res = await fetch(`/api/menus`);
      const menus = await res.json();
  
      
      const options = menus.map((menu: any) => ({
        id: menu._id,
        label: menu.title,
        value: menu._id,
      }));

      setMenusOption(options);
    };

    getAllMenus();
  }, []);

  const createNewMenuhandler = async (data: TMenu) => {
    setIsLoading(true);
    const res = await createNewMenu(data);
    if (res?.status === 201) {
      reset();
      setIsLoading(false);
      return toast.success(`${res?.message}`);
    }
    reset();
    setIsLoading(false);
    toast.error(`${res?.message}`);
  };
  return (
    <form
      onSubmit={handleSubmit(createNewMenuhandler)}
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
        placeholder="عنوان منو را وارد کنید"
      />

      <Input
        register={register}
        disable={isLoading}
        errors={errors}
        icon={<FaLink className={`text-xl md:text-2xl`} />}
        name="link"
        title="لینک"
        type="text"
        placeholder="لینک منو را وارد کنید"
      />

      <SelectBox
        register={register}
        disable={isLoading}
        errors={errors}
        name="parrent"
        options={menusOption}
        title="پرنت منو"
      />

      <div className="hidden md:block"></div>

      <div className="flex items-center gap-x-3 md:gap-x-8 mt-5 text-white">
        <Button disabled={isLoading} className={`${isValid ? "" : "!bg-slate-600 "} h-[44px]`}>
          {isLoading ? <Spinner /> : "ساخت منو"}
        </Button>
        <Button onClick={() => reset()} type="reset" className="bg-red-700">
          لغو
        </Button>
      </div>
    </form>
  );
}

export default AddNewMenu;

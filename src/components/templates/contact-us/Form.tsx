"use client";
import Button from "@/src/components/modules/auth/Button/Button";
import Input from "@/src/components/modules/p-admin/Input";
import SelectBox from "@/src/components/modules/p-admin/SelectBox";
import Spinner from "@/src/components/modules/spinner/Spinner";
import { sendNewContact } from "@/src/libs/actions/contactUs";
import { ContactUs, TContactUs } from "@/src/validators/frontend";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEnvelope, FaPhone, FaUser } from "react-icons/fa6";

function Form() {
  const [departmentsOption, setDepartmentsOption] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TContactUs>({
    resolver: zodResolver(ContactUs),
  });

  useEffect(() => {
    const getAllDepartments = async () => {
      const res = await fetch(`/api/department`);
      const departments = await res.json();
      const options = departments.map((department: any) => ({
        id: department._id,
        label: department.title,
        value: department._id,
      }));

      setDepartmentsOption(options);
    };

    getAllDepartments();
  }, []);

  const sendNewMessage = async (data: TContactUs) => {
    setIsLoading(true);
    const res = await sendNewContact(data);
    if (res?.status === 201) {
      setIsLoading(false);
      reset();
      toast.success(`${res?.message}`);
      return router.push("/");
    }
    setIsLoading(false);
    toast.error(`${res?.message}`);
  };
  return (
    <form
      onSubmit={handleSubmit(sendNewMessage)}
      className="bg-milafilmBlack text-white p-[15px] md:p-[22px] rounded-xl max-w-[700px] mx-auto space-y-6 mt-10"
    >
      <p className="text-sm/[26px]">
        کاربر گرامی، برای پیگیری خرید اشتراک، موارد محتوایی و یا ارسال پیشنهادات
        و انتقادات می توانید از فرم زیر نیز استفاده نمایید.
      </p>

      <Input
        register={register}
        errors={errors}
        name="name"
        title="نام و نام خانوادگی"
        type="text"
        placeholder="نام و نام خانوادگی خودتان را وارد کنید"
        icon={<FaUser className="text-xl md:text-2xl" />}
      />

      <Input
        register={register}
        errors={errors}
        name="phone"
        title="شماره تلفن"
        type="text"
        placeholder="شماره تلفن خود را وارد کنید"
        icon={<FaPhone className="text-xl md:text-2xl" />}
      />

      <Input
        type="email"
        placeholder="ایمیل خودتان را وارد کنید"
        errors={errors}
        register={register}
        icon={<FaEnvelope className={`text-xl md:text-2xl`} />}
        name="email"
        title="ایمیل"
      />

      <SelectBox
        register={register}
        errors={errors}
        name="department"
        options={departmentsOption}
        title="دپارتمان"
      />

      <Input
        register={register}
        errors={errors}
        name="message"
        title="متن پیغام"
        type="textarea"
        placeholder="متن پیغام خود را وارد کنید"
      />

      <Button type="submit" className={`${isValid ? "" : "!bg-slate-600 "} h-[44px]`}>
        {isLoading ? <Spinner /> : "ارسال پیغام"}
      </Button>
    </form>
  );
}

export default Form;

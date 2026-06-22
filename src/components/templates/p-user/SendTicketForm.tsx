"use client";
import { baseURL } from "@/src/libs/types";
import { NewTicket } from "@/src/validators/frontend";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../modules/p-admin/Input";
import { priority } from "@/public/db";
import SelectBox from "../../modules/p-admin/SelectBox";
import Button from "../../modules/auth/Button/Button";
import { sendNewTicket } from "@/src/libs/actions/ticket";
import toast from "react-hot-toast";
import Spinner from "../../modules/spinner/Spinner";
import { useRouter } from "next/navigation";

function SendTicketForm({ departments }: any) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(NewTicket),
  });
  const [departmentId, setDepartmentId] = useState<String | null>(null);
  const [subDepartmentId, setSubDepartmentId] = useState<String | null>(
    "660d6e5dede53eadb7b17165",
  );
  const [subDepartments, setSubDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const sendNewTicketHandler = async (data: any) => {
    setIsLoading(true);
    const res = await sendNewTicket({
      ...data,
      departmentId,
      subDepartmentId,
      status: "pending",
    });
    if (res.status === 201) {
      reset();
      setIsLoading(false);
      router.back();
      return toast.success(`${res.message}`);
    }
    reset();
    setIsLoading(false);
    return toast.error(`${res.message}`);
  };

  useEffect(() => {
    const getAllSubdepartments = async () => {
      if (departmentId) {
        const res = await fetch(`${baseURL}/api/department/${departmentId}`);
        const subDepartments = await res.json();
        setSubDepartments(subDepartments);
      }
    };

    getAllSubdepartments();
  }, [departmentId]);

  return (
    <form
      onSubmit={handleSubmit(sendNewTicketHandler)}
      className="bg-milafilmBlack text-white  rounded-md shadow p-[18px] mt-6 space-y-6"
    >
      <div className="relative flex flex-col">
        <label htmlFor="department" className="font-DanaDemiBold text-lg">
          دپارتمان
        </label>
        <select
          onChange={(e) => setDepartmentId(e.target.value)}
          id="department"
          className="outline-none bg-[#121212] text-white  mt-3  rounded-md py-3 px-4"
        >
          <option value="">دپارتمان مورد نظر را انتخاب کنید</option>
          {departments.map((department: any) => (
            <option value={department._id} key={department._id}>
              {department.title}
            </option>
          ))}
        </select>
      </div>
      {subDepartments.length > 0 && (
        <div className="relative flex flex-col">
          <label htmlFor="department" className="font-DanaDemiBold text-lg">
            زیر دپارتمان
          </label>
          <select
            onChange={(e) => setSubDepartmentId(e.target.value)}
            id="department"
            className="outline-none bg-[#121212] text-white  mt-3  rounded-md py-3 px-4"
          >
            <option value="">دپارتمان مربوطه را انتخاب کنید ...</option>
            {subDepartments.map((department: any) => (
              <option value={department._id} key={department._id}>
                {department.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <SelectBox
        register={register}
        errors={errors}
        name="priority"
        options={priority}
        title="اولویت"
      />
      <div>
        <label htmlFor="title" className="font-DanaDemiBold text-lg">
          موضوع تیکت
        </label>
        <Input
          register={register}
          errors={errors}
          placeholder={"موضوع تیکت را وارد کنید ..."}
          name={"title"}
          type={"text"}
          disable={isLoading}
        />
      </div>
      <div>
        <label htmlFor="title" className="font-DanaDemiBold text-lg">
          متن تیکت
        </label>
        <Input
          register={register}
          errors={errors}
          placeholder={"متن  تیکت را وارد کنید ..."}
          name={"body"}
          type={"textarea"}
          disable={isLoading}
        />
      </div>
      <div className="flex items-center justify-end">
        <Button disabled={isLoading} className="!w-full md:!w-[10%]">
          {isLoading ? <Spinner /> : "ارسال تیکت"}
        </Button>
      </div>
    </form>
  );
}

export default SendTicketForm;

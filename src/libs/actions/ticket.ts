"use server";

import connectToDB from "@/src/configs/db";
import { authUser, checkIsAdmin } from "@/src/utils/serverHelper";
import { TResponse } from "../types";
import TicketModel from "@/src/models/ticket";
import { isValidObjectId } from "mongoose";
import { revalidatePath } from "next/cache";

export const sendNewTicket = async (data: any): Promise<TResponse> => {
  try {
    connectToDB();
    const user = await authUser();
    if (!user) {
      return {
        message: "کاربر مورد نظر لاگین نیست",
        status: 401,
      };
    }

    const { title, body, priority, departmentId, subDepartmentId, status } =
      data;
    console.log(status);

    if (!isValidObjectId(departmentId) || !isValidObjectId(subDepartmentId)) {
      return {
        message: "ایدی مورد نظر معتبر نمی باشد",
        status: 422,
      };
    }

    await TicketModel.create({
      title,
      body,
      priority,
      department: departmentId,
      subDepartment: subDepartmentId,
      user: user._id,
      isOpen: true,
      status,
    });

    return {
      message: "تیکت با موفقیت ارسال شد",
      status: 201,
    };
  } catch (error) {
    return {
      message: "اتصال خود را بررسی کنید",
      status: 500,
    };
  }
};

export const answerToTicket = async (data: any): Promise<TResponse> => {
  try {
    connectToDB();

    const user = await authUser();
    if (!user) {
      return {
        message: "کاربر مورد نظر لاگین نیست",
        status: 401,
      };
    }

    const {
      title,
      body,
      priority,
      department,
      subDepartment,
      replyTo,
      isFromUserPanel,
    } = data;

    if (!title || !body || !priority || !department) {
      return {
        message: "اطلاعات را به درستی بفرستید",
        status: 422,
      };
    }

    if (!isFromUserPanel) {
      await TicketModel.findOneAndUpdate(
        { _id: replyTo },
        {
          $set: {
            status: "answered",
          },
        }
      );
    }

    await TicketModel.create({
      title,
      body,
      priority,
      department,
      subDepartment,
      user: user._id,
      hasAnswer: false,
      isAnswer: true,
      replyTo,
      isFromUserPanel,
    });

    revalidatePath(`/p-user/tickets/${replyTo}`);
    revalidatePath("/p-user/tickets");

    return {
      message: "پاسخ شما با موفقیت  ثبت شد",
      status: 201,
    };
  } catch (err) {
    return {
      message: "اتصال خود را بررسی کنید",
      status: 500,
    };
  }
};

export const closeOrOpenTheTickets = async (
  id: string,
  status: boolean
): Promise<TResponse> => {
  try {
    connectToDB();

    if (!checkIsAdmin()) {
      return {
        message: "شما به این روت دسترسی ندارید",
        status: 401,
      };
    }

    await TicketModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          isOpen: status ? false : true,
        },
      }
    );

    revalidatePath("/p-admin/tickets");

    return {
      message: `تیکت با موفقیت ${status ? "بسته" : "باز"} شد`,
      status: 200,
    };
  } catch (error) {
    return {
      message: "لطفا اتصال خود را به اینترنت چک کنید",
      status: 500,
    };
  }
};

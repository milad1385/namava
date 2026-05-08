import connectToDB from "@/src/configs/db";
import { TParams } from "@/src/libs/types";
import SubDepartmentModel from "@/src/models/subdepartment";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: TParams) {
  try {
    connectToDB();
    const { id } = await params;
    const subDepartments = await SubDepartmentModel.find({
      department: id,
    });
    return Response.json(subDepartments);
  } catch (err) {
    return Response.json({ err: "interval server err" }, { status: 500 });
  }
}

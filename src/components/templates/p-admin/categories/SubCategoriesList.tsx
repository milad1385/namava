"use client";
import ConfirmModal from "@/src/components/modules/modals/ConfirmModal";
import Modal from "@/src/components/modules/modals/Modal";
import EmptyBox from "@/src/components/modules/p-admin/EmptyBox";
import Pagination from "@/src/components/modules/pagination/Pagination";
import Table from "@/src/components/modules/table/Table";
import { deleteSubCategory } from "@/src/libs/actions/category";
import React, { useOptimistic } from "react";
import toast from "react-hot-toast";
import { FaPencil, FaTrash } from "react-icons/fa6";

function SubCategoriesList({
  subCategories,
  count,
}: {
  subCategories: any;
  count: number;
}) {
  const [optimisticSubs, deleteOptimistc] = useOptimistic(
    subCategories,
    (allSubs, id) => {
      return allSubs.filter((cat: any) => cat._id !== id);
    }
  );

  const deleteSubCategoryHandler = async (id: string) => {
    deleteOptimistc(id);
    const res = await deleteSubCategory(id);
    if (res?.status === 200) {
      return toast.success(`${res.message}`);
    }
    toast.error(`${res?.message}`);
  };

  return (
    <div className="users-list mt-10 overflow-hidden bg-milafilmBlack  rounded-md">
      <Table>
        <Table.Header>
          <th>شماره</th>
          <th>عنوان</th>
          <th>لینک</th>
          <th>پرنت</th>
          <th>تگ ها</th>
          <th>تاریخ</th>
          <th>عملیات</th>
        </Table.Header>
        <Table.Body>
          {optimisticSubs.map((sub: any, index: number) => (
            <Table.Row key={sub._id}>
              <td>{index + 1}</td>
              <td>{sub.title}</td>
              <td>{sub.link}</td>
              <td>{sub.parrent ? sub.parrent.title : "------"}</td>
              <td>{sub.tags.join(" ، ")}</td>
              <td>{new Date(sub.createdAt).toLocaleDateString("fa-IR")}</td>
              <td>
                <div className="flex items-center justify-center gap-x-3 md:gap-x-6 child:cursor-pointer">
                  <Modal>
                    <Modal.Open name="delete">
                      <FaTrash className="text-red-600 text-base md:text-lg" />
                    </Modal.Open>
                    <Modal.Page name="delete">
                      <ConfirmModal
                        onAction={deleteSubCategoryHandler}
                        id={sub._id}
                      />
                    </Modal.Page>
                  </Modal>

                  <FaPencil className="text-sky-600 text-base md:text-lg" />
                </div>
              </td>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {optimisticSubs.length > 0 ? (
        <Pagination count={count} />
      ) : (
        <EmptyBox title="اطلاعات مورد نظر شما یافت نشد" />
      )}
    </div>
  );
}

export default SubCategoriesList;

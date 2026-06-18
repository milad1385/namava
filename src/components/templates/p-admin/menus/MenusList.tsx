"use client";
import ConfirmModal from "@/src/components/modules/modals/ConfirmModal";
import Modal from "@/src/components/modules/modals/Modal";
import EmptyBox from "@/src/components/modules/p-admin/EmptyBox";
import Pagination from "@/src/components/modules/pagination/Pagination";
import Table from "@/src/components/modules/table/Table";
import { deleteMenu } from "@/src/libs/actions/menu";
import { useOptimistic } from "react";
import toast from "react-hot-toast";
import { FaPencil, FaTrash } from "react-icons/fa6";

function MenusList({ menus, count }: { menus: any; count: number }) {
  const [optimisticMenus, deleteOptimistc] = useOptimistic(
    menus,
    (allMenus, id) => {
      return allMenus.filter((menu: any) => menu._id !== id);
    }
  );

  const deleteMenuHandler = async (id: string) => {
    deleteOptimistc(id);
    const res = await deleteMenu(id);
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
          <th>تاریخ</th>
          <th>عملیات</th>
        </Table.Header>
        <Table.Body>
          {optimisticMenus.map((menu: any, index: number) => (
            <Table.Row key={menu._id}>
              <td>{index + 1}</td>
              <td>{menu.title}</td>
              <td>{menu.link}</td>
              <td>{menu.parrent ? menu.parrent.title : "------"}</td>
              <td>{new Date(menu.createdAt).toLocaleDateString("fa-IR")}</td>
              <td>
                <div className="flex items-center justify-center gap-x-3 md:gap-x-6 child:cursor-pointer">
                  <Modal>
                    <Modal.Open name="delete">
                      <FaTrash className="text-red-600 text-base md:text-lg" />
                    </Modal.Open>
                    <Modal.Page name="delete">
                      <ConfirmModal
                        id={menu._id}
                        onAction={deleteMenuHandler}
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
      {optimisticMenus.length > 0 ? (
        <Pagination count={count} />
      ) : (
        <EmptyBox title="اطلاعات مورد نظر یافت نشد" />
      )}
    </div>
  );
}

export default MenusList;

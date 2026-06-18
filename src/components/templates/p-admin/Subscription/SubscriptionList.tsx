"use client";
import ConfirmModal from "@/src/components/modules/modals/ConfirmModal";
import Modal from "@/src/components/modules/modals/Modal";
import EmptyBox from "@/src/components/modules/p-admin/EmptyBox";
import Pagination from "@/src/components/modules/pagination/Pagination";
import Table from "@/src/components/modules/table/Table";
import { deleteSubscription } from "@/src/libs/actions/subscription";
import { useOptimistic } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";

function SubscriptionList({ subscriptions, counts }: any) {
  const [optimisticSubscriptions, deleteOptimistc] = useOptimistic(
    subscriptions,
    (state, id) => {
      return state.filter((subscription: any) => subscription._id !== id);
    }
  );

  const deleteSubscriptionHandler = async (id: string) => {
    deleteOptimistc(id);
    const res: any = await deleteSubscription(id);
    if (res?.status === 200) {
      return toast.success(`${res?.message}`);
    }

    return toast.error(`${res?.message}`);
  };
  return (
    <div className="users-list mt-10 overflow-hidden bg-milafilmBlack  rounded-md">
      <Table>
        <Table.Header>
          <th>شماره</th>
          <th>عنوان</th>
          <th>اعتبار</th>
          <th>قیمت</th>
          <th>تخفیف</th>
          <th>سازنده</th>
          <th>عملیات</th>
        </Table.Header>
        <Table.Body>
          {optimisticSubscriptions.map((subscription: any, index: number) => (
            <Table.Row key={subscription._id}>
              <td>{index + 1}</td>
              <td>{subscription.title}</td>
              <td>{subscription.time} روز</td>
              <td>{subscription.price.toLocaleString("fa-IR")} تومان</td>
              <td>
                {subscription.discount ? `${subscription.discount} %` : "ندارد"}
              </td>
              <td>{subscription.creator.name}</td>
              <td className="flex items-center justify-center gap-x-3 md:gap-x-6 child:cursor-pointer">
                <Modal>
                  <Modal.Open name="delete">
                    <FaTrash className="text-red-600 text-base md:text-lg" />
                  </Modal.Open>
                  <Modal.Page name="delete">
                    <ConfirmModal
                      id={subscription._id}
                      onAction={deleteSubscriptionHandler}
                    />
                  </Modal.Page>
                </Modal>
              </td>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {optimisticSubscriptions.length ? (
        <Pagination count={counts} />
      ) : (
        <EmptyBox title="اطلاعات مورد نظر یافت نشد" />
      )}
    </div>
  );
}

export default SubscriptionList;

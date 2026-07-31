"use client";
import ConfirmModal from "@/src/components/modules/modals/ConfirmModal";
import Modal from "@/src/components/modules/modals/Modal";
import EmptyBox from "@/src/components/modules/p-admin/EmptyBox";
import Pagination from "@/src/components/modules/pagination/Pagination";
import Table from "@/src/components/modules/table/Table";
import { deleteCollcetion } from "@/src/libs/actions/collection";
import Image from "next/image";
import Link from "next/link";
import { useOptimistic } from "react";
import toast from "react-hot-toast";
import { FaPencil, FaTrash } from "react-icons/fa6";

function CollectionList({ collections, counts }: any) {
  const [optimisticCollections, deleteOptimistc] = useOptimistic(
    collections,
    (state, id) => {
      return state.filter((collection: any) => collection._id !== id);
    },
  );

  const deleteCollectionHandler = async (id: string) => {
    deleteOptimistc(id);
    const res = await deleteCollcetion(id);
    if (res.status === 200) {
      return toast.success(`${res.message}`);
    }

    return toast.error(`${res.message}`);
  };

  return (
    <div className="users-list mt-10 overflow-hidden bg-milafilmBlack  rounded-md">
      <Table>
        <Table.Header>
          <th>شماره</th>
          <th>عکس</th>
          <th>عنوان</th>
          <th>لینک</th>
          <th>نوع</th>
          <th>عملیات</th>
        </Table.Header>
        <Table.Body>
          {optimisticCollections.map((collcetion: any, index: number) => (
            <Table.Row key={collcetion._id}>
              <td>{index + 1}</td>
              <td className="!p-0 md:!p-5">
                <Image
                  src={collcetion.mainImage}
                  className="w-32 object-cover h-10 md:h-14 rounded-md mx-auto"
                  alt=""
                  width={1920}
                  height={1080}
                />
              </td>
              <td>
                <Link href={`/collection/${collcetion.link}`}>
                  {collcetion.title}
                </Link>
              </td>
              <td>{collcetion.link}</td>

              <td>{collcetion.type === "adult" ? "بزرگسال" : "کودک"}</td>
              <td>
                <div className="flex items-center justify-center gap-x-3 md:gap-x-6 child:cursor-pointer">
                  <Modal>
                    <Modal.Open name="delete">
                      <FaTrash className="text-red-600 text-base md:text-lg" />
                    </Modal.Open>
                    <Modal.Page name="delete">
                      <ConfirmModal
                        onAction={deleteCollectionHandler}
                        id={collcetion._id}
                      />
                    </Modal.Page>
                  </Modal>

                  <Link href={`/p-admin/collection/${collcetion.link}`}>
                    <FaPencil className="text-sky-600 text-base md:text-lg" />
                  </Link>
                </div>
              </td>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {optimisticCollections.length > 0 ? (
        <Pagination count={counts} />
      ) : (
        <EmptyBox title="اطلاعات مورد نظر یافت نشد" />
      )}
    </div>
  );
}

export default CollectionList;

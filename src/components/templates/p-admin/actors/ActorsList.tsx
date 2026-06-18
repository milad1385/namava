"use client";
import ConfirmModal from "@/src/components/modules/modals/ConfirmModal";
import Modal from "@/src/components/modules/modals/Modal";
import EmptyBox from "@/src/components/modules/p-admin/EmptyBox";
import Pagination from "@/src/components/modules/pagination/Pagination";
import Table from "@/src/components/modules/table/Table";
import { deleteActor } from "@/src/libs/actions/star";
import Image from "next/image";
import Link from "next/link";
import React, { useOptimistic } from "react";
import toast from "react-hot-toast";
import { FaPencil, FaTrash } from "react-icons/fa6";

function ActorsList({ stars, counts }: { stars: any; counts: number }) {
  const [optimisticStars, deleteOptimistc] = useOptimistic(
    stars,
    (allStars, id) => {
      return allStars.filter((star: any) => star._id !== id);
    }
  );

  const deleteStar = async (id: string) => {
    deleteOptimistc(id);
    const res = await deleteActor(id);

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
          <th>عکس</th>
          <th>نام</th>
          <th>لینک</th>
          <th>اینستاگرام</th>
          <th>توییتر</th>

          <th>تاریخ</th>
          <th>عملیات</th>
        </Table.Header>
        <Table.Body>
          {optimisticStars.map((star: any, index: number) => (
            <Table.Row key={star._id}>
              <td>{index + 1}</td>
              <td className="!p-0 md:!p-5">
                <Image
                  src={star.image}
                  className="md:w-14 w-12 h-12 md:h-14 object-cover  rounded-full mx-auto"
                  alt={star.name}
                  width={1920}
                  height={1080}
                />
              </td>
              <td>{star.name}</td>
              <td>{star.link}</td>
              <td>{star.twitter}</td>
              <td>{star.instagram}</td>
              <td>{new Date(star.createdAt).toLocaleDateString("fa-IR")}</td>
              <td>
                <div className="flex items-center justify-center gap-x-3 md:gap-x-6 child:cursor-pointer">
                  <Modal>
                    <Modal.Open name="delete">
                      <FaTrash className="text-red-600 text-base md:text-lg" />
                    </Modal.Open>
                    <Modal.Page name="delete">
                      <ConfirmModal onAction={deleteStar} id={star._id} />
                    </Modal.Page>
                  </Modal>
                  <Link href={`/p-admin/actors/${star._id}`}>
                    <FaPencil className="text-sky-600 text-base md:text-lg" />
                  </Link>
                </div>
              </td>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {optimisticStars.length > 0 ? (
        <Pagination count={counts} />
      ) : (
        <EmptyBox title="موردی برای نمایش یافت نشد" />
      )}
    </div>
  );
}

export default ActorsList;

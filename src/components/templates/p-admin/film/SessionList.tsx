"use client";
import ConfirmModal from "@/src/components/modules/modals/ConfirmModal";
import Modal from "@/src/components/modules/modals/Modal";
import EmptyBox from "@/src/components/modules/p-admin/EmptyBox";
import Pagination from "@/src/components/modules/pagination/Pagination";
import Table from "@/src/components/modules/table/Table";
import { deleteEpisode } from "@/src/libs/actions/episode";
import { formatDate } from "@/src/utils/funcs";
import Image from "next/image";
import React, { useOptimistic } from "react";
import toast from "react-hot-toast";
import { FaPencil, FaRegStar, FaStar, FaTrash } from "react-icons/fa6";

function SessionList({ episodes, counts }: any) {
  const [optimisticEpisodes, deleteOptimistic] = useOptimistic(
    episodes,
    (state, id) => {
      return state.filter((episode: any) => episode._id !== id);
    }
  );
  const deleteEpisodeHandler = async (id: string) => {
    deleteOptimistic(id);
    const res: any = await deleteEpisode(id);
    if (res.status === 200) {
      return toast?.success(`${res.message}`);
    }

    return toast.error(`${res?.message}`);
  };
  return (
    <div className="users-list mt-10 overflow-hidden bg-milafilmBlack  rounded-md">
      <Table>
        <Table.Header>
          <th>شماره</th>
          <th>تصویر</th>
          <th>عنوان</th>
          <th>مدت</th>
          <th>تاریخ</th>
          <th>امتیاز</th>
          <th>فصل</th>
          <th>عملیات</th>
        </Table.Header>
        <Table.Body>
          {optimisticEpisodes.map((episode: any, index: number) => (
            <Table.Row key={episode._id}>
              <td>{index + 1}</td>
              <td className="py-2 !px-0 md:!p-5">
                <Image
                  src={episode.image}
                  className="!w-[144px] object-cover h-[100px] md:h-[100px]  rounded-md mx-auto"
                  alt={episode.title}
                  width={1920}
                  height={1080}
                />
              </td>
              <td>{episode.title}</td>
              <td>{episode.time} دقیقه</td>
              <td>{formatDate(episode.createdAt)}</td>
              <td>
                <div className="flex items-center gap-x-0.5 justify-center">
                  <FaStar className="text-amber-400" />
                  <FaStar className="text-amber-400" />
                  <FaStar className="text-amber-400" />
                  <FaRegStar className="text-amber-400" />
                  <FaRegStar className="text-amber-400" />
                </div>
              </td>
              <td>{episode?.season?.seasonNumber}</td>
              <td>
                <div className="flex items-center justify-center gap-x-3 md:gap-x-6 child:cursor-pointer">
                  <Modal>
                    <Modal.Open name="delete">
                      <FaTrash className="text-red-600 text-base md:text-lg" />
                    </Modal.Open>
                    <Modal.Page name="delete">
                      <ConfirmModal
                        id={episode._id}
                        onAction={deleteEpisodeHandler}
                      />
                    </Modal.Page>
                    <FaPencil className="text-sky-600 text-base md:text-lg" />
                  </Modal>
                </div>
              </td>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {optimisticEpisodes.length > 0 ? (
        <Pagination count={counts} />
      ) : (
        <EmptyBox title="اطلاعات مورد نظر یافت نشد" />
      )}
    </div>
  );
}

export default SessionList;

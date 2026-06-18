"use client";
import ConfirmModal from "@/src/components/modules/modals/ConfirmModal";
import DetailModal from "@/src/components/modules/modals/DetailModal";
import Modal from "@/src/components/modules/modals/Modal";
import EmptyBox from "@/src/components/modules/p-admin/EmptyBox";
import Pagination from "@/src/components/modules/pagination/Pagination";
import Table from "@/src/components/modules/table/Table";
import {
  acceptAndRejectComment,
  deleteComment,
} from "@/src/libs/actions/comment";
import { formatDate } from "@/src/utils/funcs";
import React, { useOptimistic } from "react";
import toast from "react-hot-toast";
import {
  FaCheck,
  FaEye,
  FaPencil,
  FaRegStar,
  FaStar,
  FaTrash,
  FaXmark,
} from "react-icons/fa6";

function CommentsList({ comments, counts }: any) {
  const [optimisticComments, deleteOptimistc] = useOptimistic(
    comments,
    (allComments, id) => {
      return allComments.filter((comment: any) => comment._id !== id);
    }
  );

  const deleteCommentHandler = async (id: string) => {
    deleteOptimistc(id);
    const res = await deleteComment(id);
    if (res?.status === 200) {
      return toast.success(`${res?.message}`);
    }
    toast.error(`${res?.message}`);
  };

  const acceptOrDeclineComment = async (
    commentId: string,
    isAccept: boolean
  ) => {
    const res = await acceptAndRejectComment(isAccept, commentId);
    if (res?.status === 200) {
      return toast.success(`${res?.message}`);
    }

    toast.error(`${res?.message}`);
  };

  return (
    <div className="users-list mt-10 overflow-hidden bg-milafilmBlack  rounded-md">
      <Table>
        <Table.Header>
          <th>شماره</th>
          <th>نام</th>
          <th>فیلم</th>
          <th>امتیاز</th>
          <th>وضعیت</th>
          <th>تاریخ</th>
          <th>عملیات</th>
        </Table.Header>
        <Table.Body>
          {optimisticComments.map((comment: any, index: number) => (
            <Table.Row key={comment._id}>
              <td
                className={`text-white ${
                  comment.isAccept ? "bg-green-700" : "bg-red-700"
                }`}
              >
                {index + 1}
              </td>
              <td>{comment.user.name}</td>
              <td>{comment.movie.title}</td>
              <td>
                <div className="flex items-center gap-x-0.5 justify-center">
                  {Array(comment.score)
                    .fill(0)
                    .map((star, index) => (
                      <FaStar className="text-amber-400" key={index} />
                    ))}

                  {Array(5 - comment.score)
                    .fill(0)
                    .map((star, index) => (
                      <FaRegStar className="text-amber-400" key={index} />
                    ))}
                </div>
              </td>
              <td>{comment.isAccept ? "تایید شده" : "تایید نشده"}</td>
              <td>{formatDate(comment.createdAt)}</td>
              <td>
                <div className="flex items-center justify-center gap-x-3 md:gap-x-6 child:cursor-pointer">
                  <Modal>
                    <Modal.Open name="delete">
                      <FaTrash className="text-red-600 text-base md:text-lg" />
                    </Modal.Open>

                    <Modal.Page name="delete">
                      <ConfirmModal
                        id={comment._id}
                        onAction={deleteCommentHandler}
                      />
                    </Modal.Page>

                    <Modal.Open name="action">
                      {comment.isAccept ? (
                        <FaXmark className="text-red-600 text-base md:text-lg" />
                      ) : (
                        <FaCheck className="text-green-500 text-base md:text-lg" />
                      )}
                    </Modal.Open>
                    <Modal.Page name="action">
                      <ConfirmModal
                        title={`آیا از ${
                          comment.isAccept ? "رد" : "تایید"
                        } کامنت اطمینان دارید ؟`}
                        onAction={() =>
                          acceptOrDeclineComment(comment._id, comment.isAccept)
                        }
                      />
                    </Modal.Page>
                    <Modal.Open name="detail">
                      <FaEye className="text-blue-600 text-base md:text-lg" />
                    </Modal.Open>
                    <Modal.Page name="detail">
                      <DetailModal msg={comment.content} />
                    </Modal.Page>
                  </Modal>
                </div>
              </td>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {optimisticComments.length > 0 ? (
        <Pagination count={counts} />
      ) : (
        <EmptyBox title="اطلاعات مورد نظر یافت نشد" />
      )}
    </div>
  );
}

export default CommentsList;

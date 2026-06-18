"use client";
import Pagination from "@/src/components/modules/pagination/Pagination";
import Table from "@/src/components/modules/table/Table";
import { formatDate } from "@/src/utils/funcs";
import { FaEye, FaRegStar, FaStar } from "react-icons/fa6";
import DetailModal from "../../modules/modals/DetailModal";
import Modal from "../../modules/modals/Modal";
import EmptyBox from "../../modules/p-admin/EmptyBox";

function CommentsList({ comments, count, status }: any) {
  let commnetsList = comments;

  if (status === "all") {
    commnetsList = comments;
  }

  if (status === "accepted") {
    commnetsList = comments.filter((comment: any) => comment.isAccept);
  }

  if(status == "unaccepted"){
    commnetsList = comments.filter((comment: any) => !comment.isAccept);
  }

  return (
    <div className="users-list mt-5 overflow-hidden bg-milafilmBlack  rounded-md">
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
          {commnetsList.map((comment: any, index: number) => (
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
              <td className="flex items-center justify-center">
                <Modal>
                  <Modal.Open name="detail">
                    <FaEye className="text-blue-600 text-base md:text-lg" />
                  </Modal.Open>
                  <Modal.Page name="detail">
                    <DetailModal msg={comment.content} />
                  </Modal.Page>
                </Modal>
              </td>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {comments.length > 0 ? (
        <Pagination count={count} />
      ) : (
        <EmptyBox title="اطلاعات مورد نظر یافت نشد" />
      )}
    </div>
  );
}

export default CommentsList;

"use client";
import ConfirmModal from "@/src/components/modules/modals/ConfirmModal";
import Modal from "@/src/components/modules/modals/Modal";
import EmptyBox from "@/src/components/modules/p-admin/EmptyBox";
import Pagination from "@/src/components/modules/pagination/Pagination";
import Table from "@/src/components/modules/table/Table";
import { deleteArticle } from "@/src/libs/actions/article";
import Image from "next/image";
import React, { useOptimistic } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaPencil, FaTrash, FaXmark } from "react-icons/fa6";

function ArticleList({ articles, counts }: any) {
  const [optimisticArticles, deleteOptimistc] = useOptimistic(
    articles,
    (allArticles, id) => {
      return allArticles.filter((article: any) => article._id !== id);
    }
  );

  const deleteArticleHandler = async (id: string) => {
    deleteOptimistc(id);
    const res = await deleteArticle(id);
    if (res.status === 200) {
      return toast.success(`${res.message}`);
    }
    toast.error(`${toast.error}`);
  };
  return (
    <div className="users-list mt-10 overflow-hidden bg-milafilmBlack  rounded-md">
      <Table>
        <Table.Header>
          <th>شماره</th>
          <th>عکس</th>
          <th>عنوان</th>
          <th>لینک</th>
          <th>نویسنده</th>
          <th>وضعیت</th>
          <th>تاریخ</th>
          <th>عملیات</th>
        </Table.Header>
        <Table.Body>
          {optimisticArticles.map((article: any, index: number) => (
            <Table.Row key={article._id}>
              <td>{index + 1}</td>
              <td className="!p-0 md:!p-5">
                <Image
                  src={article.image}
                  className="w-32 object-cover h-10 md:h-14 rounded-md mx-auto"
                  alt={article.title}
                  width={1920}
                  height={1080}
                />
              </td>
              <td>{article.title.slice(0, 26) + " ... "}</td>
              <td>{article.link}</td>
              <td>{article.creator.name}</td>
              <td>{article.isAccept ? "منتشر شده" : "پیش نویس"}</td>
              <td>{new Date(article.createdAt).toLocaleDateString("fa-IR")}</td>
              <td>
                <div className="flex items-center justify-center gap-x-3 md:gap-x-6 child:cursor-pointer">
                  <Modal>
                    <Modal.Open name="delete">
                      <FaTrash className="text-red-600 text-base md:text-lg" />
                    </Modal.Open>
                    <Modal.Open name="status">
                      {article.isAccept ? (
                        <FaXmark className="text-amber-500 text-base md:text-lg" />
                      ) : (
                        <FaCheck className="text-green-500 text-base md:text-lg" />
                      )}
                    </Modal.Open>
                    <Modal.Page name="delete">
                      <ConfirmModal
                        id={article._id}
                        onAction={deleteArticleHandler}
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
      {optimisticArticles.length > 0 ? (
        <Pagination count={counts} />
      ) : (
        <EmptyBox title="اطلاعات مورد نظر یافت نشد" />
      )}
    </div>
  );
}

export default ArticleList;

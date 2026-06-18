"use client";
import Pagination from "@/src/components/modules/pagination/Pagination";
import Table from "@/src/components/modules/table/Table";
import { useAuth } from "@/src/context/AuthContextProvider";
import { deleteUserLike } from "@/src/libs/actions/movie";
import { IWishList } from "@/src/libs/types";
import { formatDate } from "@/src/utils/funcs";
import Image from "next/image";
import Link from "next/link";
import { useOptimistic } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";
import ConfirmModal from "../../modules/modals/ConfirmModal";
import Modal from "../../modules/modals/Modal";
import EmptyBox from "../../modules/p-admin/EmptyBox";

function FavList({ movies, count }: IWishList) {
  const { userInfo } = useAuth();
  const [optimisticMovie, deleteOptimistc] = useOptimistic(
    movies,
    (allMovies, id) => {
      return allMovies.filter((movie: any) => movie._id !== id);
    }
  );

  const deleteMovieHandler = async (id: string) => {
    deleteOptimistc(id);
    const res = await deleteUserLike(id, userInfo?._id as string);
    if (res.status === 200) {
      return toast.success(`${res?.message}`);
    }

    return toast.error(`${res?.message}`);
  };
  return (
    <div className="users-list  overflow-hidden bg-milafilmBlack  rounded-md">
      <Table>
        <Table.Header>
          <th>شماره</th>
          <th>تصویر</th>
          <th>عنوان</th>
          <th>رده سنی</th>
          <th>مدت</th>
          <th>تاریخ</th>
          <th>دسته بندی</th>
          <th></th>
        </Table.Header>
        <Table.Body>
          {optimisticMovie.map((movie, index) => (
            <Table.Row key={movie._id}>
              <td>{index + 1}</td>
              <td className="py-2 !px-0 md:!p-5">
                <Image
                  src={movie?.mainImage ?? ""}
                  className="w-24 object-cover h-[100px] md:h-36  rounded-md mx-auto"
                  alt={movie.title}
                  width={1920}
                  height={1080}
                />
              </td>
              <td>
                <Link
                  href={`/${movie.type === "film" ? "movie" : "series"}/${
                    movie.link
                  }`}
                >
                  {movie.title}
                </Link>
              </td>
              <td>{movie.range} سال</td>
              <td>{movie.showTime} دقیقه</td>
              <td>{formatDate(movie.createdAt)}</td>

              <td>{movie.category.title}</td>
              <td>
                <div className="flex items-center justify-center gap-x-3 md:gap-x-6 child:cursor-pointer">
                  <Modal>
                    <Modal.Open name="delete">
                      <FaTrash className="text-red-600 text-base md:text-lg" />
                    </Modal.Open>

                    <Modal.Page name="delete">
                      <ConfirmModal
                        id={movie._id}
                        onAction={deleteMovieHandler}
                      />
                    </Modal.Page>
                  </Modal>
                </div>
              </td>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {optimisticMovie.length > 0 ? (
        <Pagination count={count} />
      ) : (
        <EmptyBox title="اطلاعات مورد نظر یافت نشد" />
      )}
    </div>
  );
}

export default FavList;

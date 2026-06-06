"use client";
import ConfirmModal from "@/src/components/modules/modals/ConfirmModal";
import Modal from "@/src/components/modules/modals/Modal";
import EmptyBox from "@/src/components/modules/p-admin/EmptyBox";
import Pagination from "@/src/components/modules/pagination/Pagination";
import Table from "@/src/components/modules/table/Table";
import { deleteMovie } from "@/src/libs/actions/movie";
import Image from "next/image";
import Link from "next/link";
import React, { useOptimistic } from "react";
import toast from "react-hot-toast";
import { FaPencil, FaRegStar, FaStar, FaTrash } from "react-icons/fa6";

function FilmList({ movies, counts }: { movies: any; counts: number }) {
  const [optimisticMovie, deleteOptimistc] = useOptimistic(
    movies,
    (allMovies, id) => {
      return allMovies.filter((movie: any) => movie._id !== id);
    }
  );

  const deleteMovieHandler = async (id: string) => {
    deleteOptimistc(id);
    const res = await deleteMovie(id);
    if (res?.status === 200) {
      return toast.success(`${res?.message}`);
    }
    toast.error(`${res.message}`);
  };
  return (
    <div className="users-list mt-10 overflow-hidden bg-namavaBlack  rounded-md">
      <Table>
        <Table.Header>
          <th>شماره</th>
          <th>تصویر</th>
          <th>عنوان</th>
          <th>رده سنی</th>
          <th>مدت</th>
          <th>ساخت</th>
          <th>امتیاز</th>
          <th>نوع</th>
          <th>دسته بندی</th>
          <th>عملیات</th>
        </Table.Header>
        <Table.Body>
          {optimisticMovie.map((movie: any, index: number) => (
            <Table.Row key={movie._id}>
              <td>{index + 1}</td>
              <td className="py-2 !px-0 md:!p-5">
                <Image
                  src={movie.mainImage}
                  className="w-24 object-cover h-[100px] md:h-36  rounded-md mx-auto"
                  alt={movie.title}
                  width={1920}
                  height={1080}
                />
              </td>
              <td>
                <Link
                  href={
                    movie.type === "series"
                      ? `/p-admin/series/${movie._id}`
                      : `/movie/${movie.link}`
                  }
                >
                  {movie.title}
                </Link>
              </td>
              <td>{movie.ageRange} سال</td>
              <td>{movie.time} دقیقه</td>
              <td>{movie.showTime}</td>
              <td>
                <div className="flex items-center gap-x-0.5 justify-center">
                  {Array(movie.IMDB)
                    .fill(0)
                    .map((star, index) => (
                      <FaStar className="text-amber-400" key={index} />
                    ))}

                  {Array(5 - movie.IMDB)
                    .fill(0)
                    .map((star, index) => (
                      <FaRegStar className="text-amber-400" key={index} />
                    ))}
                </div>
              </td>
              <td>{movie.type === "film" ? "فیلم" : "سریال"}</td>
              <td>{movie.category.title}</td>
              <td>
                <div className="flex items-center justify-center gap-x-3 md:gap-x-6 child:cursor-pointer">
                  <Modal>
                    <Modal.Open name="delete">
                      <FaTrash className="text-red-600 text-base md:text-lg" />
                    </Modal.Open>
                    <Modal.Open name="edit">
                      <FaPencil className="text-sky-600 text-base md:text-lg" />
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
        <Pagination count={counts} />
      ) : (
        <EmptyBox title="اطلاعات مورد نظر یافت نشد" />
      )}
    </div>
  );
}

export default FilmList;

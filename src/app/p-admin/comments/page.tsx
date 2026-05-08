import Title from "@/src/components/modules/p-admin/Title";
import CommentsList from "@/src/components/templates/p-admin/comments/CommentsList";
import { getAllComments } from "@/src/libs/service/services";
import { TParams } from "@/src/libs/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "کامنت ها",
  description: "از این صفحه میتوان برای مدیریت کامنت  ها استفاده کرد",
};

async function CommentsPage({ searchParams }: TParams) {
  const { page } = await searchParams;
  const { comments, counts }: any = await getAllComments(page as string);
  return (
    <div>
      <Title name="کامنت ها" />
      <CommentsList
        comments={JSON.parse(JSON.stringify(comments))}
        counts={counts}
      />
    </div>
  );
}

export default CommentsPage;

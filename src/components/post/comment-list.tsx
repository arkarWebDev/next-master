import { db } from "@/db";
import Comment from "./comment";

interface CommentListProps {
  postId: string;
}
const CommentList = async ({ postId }: CommentListProps) => {
  const comments = await db.comment.findMany({
    where: {
      postId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  console.log(comments);

  return (
    <main className=" mt-10">
      {comments.length === 0 && (
        <p className=" text-red-600">No comments yet!</p>
      )}
      <h2 className=" text-lg font-bold p-2">{comments.length} comments</h2>
      <div>
        {comments.map((comment) => (
          <Comment
            username={comment.user.name!}
            date={comment.createdAt}
            content={comment.content}
            likeCount={comment.likeCount}
            key={comment.id}
          />
        ))}
      </div>
    </main>
  );
};

export default CommentList;

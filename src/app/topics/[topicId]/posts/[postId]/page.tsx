import Time from "@/components/common/time";
import CommentBox from "@/components/post/comment-box";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import paths from "@/lib/paths";
import { Book, User } from "lucide-react";
import Link from "next/link";

interface SinglePostProps {
  params: {
    postId: string;
  };
}
const SinglePost = async ({ params }: SinglePostProps) => {
  const { postId } = params;
  const session = await auth();

  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      topic: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <main className=" mt-10">
      <Card>
        <CardHeader>
          <h2 className=" text-2xl font-bold">{post?.title}</h2>
          <Time date={post?.createdAt as Date} />
          <div className="my-2 flex gap-2 items-center ">
            <Link href={paths.SingleTopic(post?.topicId as string)}>
              <div className=" flex items-center gap-1">
                <Book className=" w-4 h-4" />
                <p className="text-sm font-medium">{post?.topic?.name}</p>
              </div>
            </Link>
            |
            <div className=" flex items-center gap-1">
              <User className=" w-4 h-4" />
              <p className="text-sm font-medium">{post?.user?.name}</p>
            </div>
          </div>
          <hr />
        </CardHeader>
        <CardContent>
          <p className=" font-medium tracking-wide">{post?.content}</p>
        </CardContent>
      </Card>
      {session?.user && <CommentBox />}
      {!session?.user && (
        <Link href={"/auth/login"}>
          <p className="text-center font-medium bg-red-600 text-white py-2 my-4 rounded-md underline tracking-wide">
            Login or register to discuss the posts.
          </p>
        </Link>
      )}
    </main>
  );
};

export default SinglePost;

import { db } from "@/db";
import List from "./list";

interface PostProps {
  topicId: string;
}
const Post = async ({ topicId }: PostProps) => {
  const posts = await db.post.findMany({
    where: {
      topicId,
    },
    select: {
      title: true,
      id: true,
      topicId: true,
      createdAt: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  console.log(posts);

  return (
    <main>
      <h2 className=" text-xl font-semibold mt-8 mb-4 text-left">
        Recent Posts
      </h2>
      {posts.length === 0 && <p>There is no post to show.</p>}
      <div className="grid grid-cols-2 gap-4">
        {posts.length > 0 &&
          posts.map((post) => (
            <List
              key={post.id}
              title={post.title}
              postId={post.id}
              topicId={post.topicId}
              username={post.user.name!}
              date={post.createdAt}
            />
          ))}
      </div>
    </main>
  );
};

export default Post;

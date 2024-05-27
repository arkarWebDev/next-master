import { db } from "@/db";
import List from "./list";

const PostList = async () => {
  const posts = await db.post.findMany({
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
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(posts);

  return (
    <main>
      {posts.map((post) => (
        <List
          key={post.id}
          title={post.title}
          username={post.user.name as string}
          postId={post.id}
          topicId={post.topicId}
          date={post.createdAt}
          topicName={post.topic.name}
        />
      ))}
    </main>
  );
};

export default PostList;

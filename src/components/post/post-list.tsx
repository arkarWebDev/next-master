import { db } from "@/db";
import List from "./list";
import { PageProps } from "@/app/page";
import Pagination from "../common/pagination";

const PER_PAGE = 4;

const fetchPosts = async ({ take = PER_PAGE, skip = 0 }) => {
  "use server";

  const results = await db.post.findMany({
    take,
    skip,
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

  const total = await db.post.count();

  return {
    posts: results,
    metadata: {
      hasNextPage: skip + take < total,
      totalPages: Math.ceil(total / take),
    },
  };
};
const PostList = async (props: PageProps) => {
  const PageNumber = Number(props?.searchParams?.page || 1);
  const take = PER_PAGE;
  const skip = (PageNumber - 1) * take;

  const { posts, metadata } = await fetchPosts({ take, skip });

  return (
    <main>
      {posts.length == 0 && (
        <p className="text-red-600 font-medium">No post to show.</p>
      )}
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
      <div className="flex items-center justify-center mt-10">
        <Pagination {...props?.searchParams} {...metadata} />
      </div>
    </main>
  );
};

export default PostList;

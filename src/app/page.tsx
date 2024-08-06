import PostList from "@/components/post/post-list";
import TopicList from "@/components/topics/topic-list";
import { auth } from "@/lib/auth";

export type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function Home(props: PageProps) {
  const session = await auth();
  console.log(session);
  return (
    <main className=" space-x-2 flex items-center justify-center mt-10">
      <div className=" grid grid-cols-3 gap-4 w-full">
        <div className=" col-span-2">
          <h1 className=" font-medium tracking-wide mb-2">Recent Posts</h1>
          <PostList {...props} />
        </div>
        <div className="col-span-1">
          <h1 className=" font-medium tracking-wide mb-2">Recent Topics</h1>
          <TopicList />
        </div>
      </div>
    </main>
  );
}

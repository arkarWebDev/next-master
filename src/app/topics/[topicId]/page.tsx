import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import paths from "@/lib/paths";
import Image from "next/image";
import Link from "next/link";

interface SingleTopicProps {
  params: {
    topicId: string;
  };
}
const SingleTopic = async ({ params }: SingleTopicProps) => {
  const { topicId } = params;

  const topic = await db.topic.findUnique({
    where: {
      id: topicId,
    },
  });

  console.log(topic);

  return (
    <main className="text-center">
      <h2 className=" text-3xl font-bold uppercase tracking-wide my-5">
        {topic?.name}
      </h2>
      <Image
        src={topic?.image as string}
        alt={topic?.name as string}
        width={300}
        height={300}
        className="w-full h-80 object-cover rounded-md"
      />
      <p className="font-medium text-sm tracking-wider my-5">
        {topic?.description}
      </p>
      <Badge variant={"outline"}>@{topic?.creator}</Badge>
      <div className=" flex justify-center my-5">
        <Button asChild className="block w-fit">
          <Link href={paths.CreatePost(topic?.id as string)}>
            Create new post for this topic
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default SingleTopic;

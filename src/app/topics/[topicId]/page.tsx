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
    <main>
      <div className="grid grid-cols-3 gap-2 w-full mt-8">
        <div className=" col-span-1">
          <Image
            src={topic?.image as string}
            alt={topic?.name as string}
            width={400}
            height={200}
            className="w-full h-40 object-cover rounded-md"
          />
        </div>
        <div className=" col-span-2 space-y-2">
          <h2 className=" text-3xl font-bold ">{topic?.name}</h2>
          <p className="font-medium text-muted-foreground text-sm tracking-wider">
            {topic?.description}
          </p>
          <Badge variant={"outline"}>@{topic?.creator}</Badge>
          <Button asChild className="block w-fit">
            <Link href={paths.CreatePost(topic?.name as string)}>
              Create new post for this topic
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default SingleTopic;

import { db } from "@/db";
import { badgeVariants } from "@/components/ui/badge";
import Link from "next/link";
import paths from "@/lib/paths";

const TopicList = async () => {
  const topics = await db.topic.findMany({
    select: {
      name: true,
      id: true,
    },
  });

  return (
    <div>
      {topics.map((topic) => (
        <Link
          className={badgeVariants({ variant: "outline" })}
          href={paths.SingleTopic(topic.id)}
          key={topic.id}
        >
          #{topic.name}
        </Link>
      ))}
    </div>
  );
};

export default TopicList;

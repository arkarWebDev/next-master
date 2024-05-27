import Link from "next/link";
import { Card, CardHeader } from "../ui/card";
import paths from "@/lib/paths";
import Time from "../common/time";
import { User } from "lucide-react";

interface ListProps {
  title: string;
  username: string;
  postId: string;
  topicId: string;
  date: Date;
  topicName: string;
}
const List = ({
  title,
  username,
  postId,
  topicId,
  date,
  topicName,
}: ListProps) => {
  return (
    <Card className=" relative mt-4">
      <CardHeader>
        <Link href={paths.SinglePost(topicId, postId)} className="mb-2">
          <h2 className="text-xl font-semibold tracking-wide underline decoration-wavy">
            {title}
          </h2>
        </Link>
        <Time date={date} />
        <div className="flex items-center gap-1 mt-2">
          <User className="w-4 h-4" />
          <p className=" text-sm font-medium">{username}</p>
        </div>
      </CardHeader>
      <p className=" absolute top-0 right-0 p-2 bg-black text-sm font-medium text-white rounded-tr-md">
        {topicName}
      </p>
    </Card>
  );
};

export default List;

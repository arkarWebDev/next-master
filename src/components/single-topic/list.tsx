import Link from "next/link";
import { Card, CardContent, CardHeader } from "../ui/card";
import paths from "@/lib/paths";
import { User } from "lucide-react";
import Time from "../common/time";

interface ListProps {
  title: string;
  postId: string;
  topicId: string;
  username: string;
  date: Date;
}
const List = ({ title, postId, topicId, username, date }: ListProps) => {
  return (
    <Card>
      <CardHeader>
        <div>
          <Link href={paths.SinglePost(topicId, postId)} className="flex mb-2">
            <h2 className=" text-xl font-bold underline text-left">{title}</h2>
          </Link>
          <Time date={date} />
          <div className="flex items-center gap-1 mt-2">
            <User className="w-4 h-4" />
            <p className=" text-sm font-medium">{username}</p>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default List;

import { ThumbsUp } from "lucide-react";
import Time from "../common/time";
import { Card, CardHeader } from "../ui/card";

interface CommentProps {
  username: string;
  date: Date;
  content: string;
  likeCount: number;
}
const Comment = ({ username, date, content, likeCount }: CommentProps) => {
  return (
    <Card className=" mb-4">
      <CardHeader>
        <p className=" font-bold">@{username}</p>
        <Time date={date} />
        <p className=" border p-2">{content}</p>
        <p className=" flex items-center gap-1 justify-end my-2">
          <ThumbsUp /> {likeCount}
        </p>
      </CardHeader>
    </Card>
  );
};

export default Comment;

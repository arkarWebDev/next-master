import { Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface TimeProps {
  date: Date;
}
const Time = ({ date }: TimeProps) => {
  return (
    <div className=" flex items-center gap-1">
      <Clock className=" w-4 h-4" />
      <p className="text-sm font-medium">
        {formatDistanceToNow(new Date(date), {
          includeSeconds: true,
        })}{" "}
        ago ...
      </p>
    </div>
  );
};

export default Time;

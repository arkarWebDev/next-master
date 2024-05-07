import { Button } from "../ui/button";
import { BookPlus } from "lucide-react";
import Link from "next/link";

const AddBtn = () => {
  return (
    <Button size={"sm"} asChild>
      <Link href={"/topics/new"} className="flex items-center">
        <BookPlus className="mr-2 h-4 w-4" />
        <span>Add New Topic</span>
      </Link>
    </Button>
  );
};

export default AddBtn;

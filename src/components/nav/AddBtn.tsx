import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { BookPlus, BookmarkPlus, Plus } from "lucide-react";
import Link from "next/link";

const AddBtn = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"sm"}>
          Add <Plus className="ml-2 h-4 w-4 " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href={"/user/add-post"} className="flex items-center">
            <BookPlus className="mr-2 h-4 w-4" />
            <span>Add New Post</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={"/user/add-topic"} className="flex items-center">
            <BookmarkPlus className="mr-2 h-4 w-4" />
            <span>Add New Topic</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddBtn;

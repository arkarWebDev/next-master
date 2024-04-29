import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { auth } from "@/lib/auth";
import { handleLogout } from "@/lib/action";

const Profile = async () => {
  const session = await auth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={"sm"}
          variant={"outline"}
          className="  w-44 flex justify-between"
        >
          <Avatar>
            <AvatarImage src={session?.user?.image as string} />
            <AvatarFallback>
              {session?.user && session.user.name}
            </AvatarFallback>
          </Avatar>

          {session?.user && session.user.name}
          <ChevronDown className="h-4 w-4 " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Account Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <form action={handleLogout}>
            <Button variant={"ghost"}>
              <LogOut className="mr-2 h-4 w-4 text-red-600" />
              <span className="text-red-600">Logout</span>
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;

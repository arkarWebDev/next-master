import { Button } from "@/components/ui/button";
import { Mail, Trash } from "lucide-react";

export default function Home() {
  return (
    <main className=" space-x-2 flex items-center justify-center h-screen">
      <Button variant={"destructive"}>
        <Trash className="mr-2 h-4 w-4" /> Delete this account
      </Button>
      <Button>
        <Mail className="mr-2 h-4 w-4" /> Link with email
      </Button>
    </main>
  );
}

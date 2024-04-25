import { Button } from "@/components/ui/button";
import { handleLogout } from "@/lib/action";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <main className=" space-x-2 flex items-center justify-center h-screen">
      <form action={handleLogout}>
        <Button variant={"destructive"}>Logout</Button>
      </form>
    </main>
  );
}

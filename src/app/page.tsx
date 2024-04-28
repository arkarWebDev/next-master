import { Button } from "@/components/ui/button";

import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <main className=" space-x-2 flex items-center justify-center mt-10">
      <h1>Home Page</h1>
    </main>
  );
}

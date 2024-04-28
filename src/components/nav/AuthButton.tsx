import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const AuthButton = () => {
  return (
    <div className=" flex gap-4">
      <Button size={"sm"} variant={"outline"} asChild>
        <Link href={"/auth/login"}>Login</Link>
      </Button>
      <Button size={"sm"} asChild>
        <Link href={"/auth/register"}>Register</Link>
      </Button>
    </div>
  );
};

export default AuthButton;

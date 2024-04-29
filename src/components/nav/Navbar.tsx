import Link from "next/link";
import NavLink from "./NavLink";
import AddBtn from "./AddBtn";
import Profile from "./Profile";
import { auth } from "@/lib/auth";
import AuthButton from "./AuthButton";

const links = [
  {
    path: "/faq",
    label: "FAQs",
  },
  {
    path: "/logs",
    label: "Change logs",
  },
  {
    path: "/events",
    label: "Events",
  },
];

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="w-2/3 mx-auto flex items-center py-4 border-b justify-between">
      <div className="flex items-center">
        <Link href={"/"} className="text-3xl font-bold">
          M-BLOG
        </Link>
        <div className="ms-6">
          {links.map((link) => (
            <NavLink path={link.path} label={link.label} key={link.path} />
          ))}
        </div>
      </div>
      {session?.user ? (
        <div className="flex items-center gap-4">
          <AddBtn />
          <Profile />
        </div>
      ) : (
        <AuthButton />
      )}
    </nav>
  );
};

export default Navbar;

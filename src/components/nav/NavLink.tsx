"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  path: string;
  label: string;
}

const NavLink = (link: NavLinkProps) => {
  const pathName = usePathname();

  return (
    <Link
      href={link.path}
      className={`text-sm me-2 font-medium tracking-wide ${
        pathName === link.path ? "text-black font-semibold" : "text-gray-500"
      }`}
    >
      {link.label}
    </Link>
  );
};

export default NavLink;

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function MobileMenu({
  link,
  icon,
  title,
  isLogin,
}: {
  link: string;
  icon: React.ReactNode;
  title: string;
  isLogin?: boolean;
}) {
  const pathname = usePathname();
  return (
    <li>
      <Link
        href={title === "کودکان" && isLogin ? "/profile-list" : link}
        className={`flex items-center gap-x-3 text-lg ${
          pathname === link ? "active" : ""
        }`}
      >
        {icon}
        <span className="text-sm">{title}</span>
      </Link>
    </li>
  );
}

export default MobileMenu;

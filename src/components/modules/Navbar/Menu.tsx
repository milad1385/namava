import { useAuth } from "@/src/context/AuthContextProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Menu({ menu, category }) {
  const pathname = usePathname();
  const auth = useAuth();

  function getHref() {
    if (menu.title === "کودکان") {
      return auth?.isLogin ? "profile-list" : "kids";
    }
    return menu.link;
  }
  return (
    <li key={menu._id}>
      <Link
        href={`/${getHref()}`}
        className={pathname.includes(`/${menu.link}`) ? "active" : ""}
      >
        {menu.title}{" "}
        {menu.title === "دسته بندی ها" && category?.title
          ? `(${category.title})`
          : ""}
      </Link>
    </li>
  );
}

export default Menu;

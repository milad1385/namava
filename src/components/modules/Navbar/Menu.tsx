import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Menu({ menu, category }) {
  const pathname = usePathname();
  return (
    <li key={menu._id}>
      <Link
        href={`/${menu.link}`}
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

import { IProfileLink } from "@/src/libs/types";
import Link from "next/link";
import React from "react";

function ProfileLink({ icon, title, link, hasSubscription }: IProfileLink) {
  if (link === "plans" && hasSubscription) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-2 my-2">
      {icon}
      <Link href={`/${link}`} className="block w-full">
        {title}
      </Link>
    </div>
  );
}

export default ProfileLink;

import Link from "next/link";
import React from "react";
type TProfileLink = {
  icon: React.ReactNode;
  title: string;
  link: string;
};
function ProfileLink({ icon, title, link }: TProfileLink) {
  return (
    <div className="flex items-center gap-x-2 my-2">
      {icon}
      <Link href={`/${link}`} className="block w-full">{title}</Link>
    </div>
  );
}

export default ProfileLink;

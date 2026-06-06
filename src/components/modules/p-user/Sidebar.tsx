import React from "react";
import { FiLogOut } from "react-icons/fi";
import SidebarLink from "./SidebarLink";
import { authUser } from "@/src/utils/serverHelper";
import Logout from "../../templates/p-user/Logout";

async function Sidebar() {
  const user = await authUser();
  return (
    <div className="hidden lg:block w-[480px] h-[565px] bg-namavaBlack text-white shadow  rounded-md p-4 sticky top-0">
      <div className="flex items-center gap-x-4 border-b-2 border-b-gray-500 pb-2">
        <div className="w-[55px] h-[55px] flex-center rounded-full">
          <img
            src={`/images/user.png`}
            alt="user.png"
            className="w-[50px] h-[50px] rounded-full"
          />
        </div>
        <div className="flex  flex-col gap-y-1 font-DanaDemiBold">
          <span className="text-namava">حساب کاربری من</span>
          <span className="">{user.name}</span>
        </div>
      </div>
      <SidebarLink />
      <Logout />
    </div>
  );
}

export default Sidebar;

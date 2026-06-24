import { authUser } from "@/src/utils/serverHelper";
import Image from "next/image";
import Logout from "../../templates/p-user/Logout";
import SidebarLink from "./SidebarLink";

async function Sidebar() {
  const user = await authUser();
  return (
    <div className="hidden lg:block w-[480px] h-[565px] bg-milafilmBlack text-white shadow  rounded-md p-4 sticky top-0">
      <div className="flex items-center gap-x-4 border-b-2 border-b-gray-500 pb-2">
        <div className="w-[55px] h-[55px] flex-center rounded-full">
          <Image
            src={`/images/user.png`}
            alt="user.png"
            className="w-[50px] h-[50px] rounded-full"
            width={1920}
            height={1080}
          />
        </div>
        <div className="flex  flex-col gap-y-1 font-DanaDemiBold">
          <span className="text-milafilm">حساب کاربری من</span>
          <span className="">{user.name}</span>
        </div>
      </div>
      <SidebarLink />
      <Logout />
    </div>
  );
}

export default Sidebar;

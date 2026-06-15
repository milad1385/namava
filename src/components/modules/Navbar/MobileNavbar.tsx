import Logo from "@/src/icons/Logo";
import { IMobileNavbar } from "@/src/libs/types";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import Overlay from "../Overlay/Overlay";
import MobileMenuContent from "./MobileMenuContent";
import MobileMenuFeature from "./MobileMenuFeature";
import Searchbar from "./Searchbar";

function MobileNavbar({ isOpen, onOpen, user }: IMobileNavbar) {
  const pathname = usePathname();
  const isUserPanel = pathname.includes("/p-user");

  useEffect(() => {
    onOpen(false);
  }, [pathname]);
  return (
    <>
      <div
        className={`block md:hidden fixed top-0 bottom-0 ${
          isOpen ? "right-0" : "-right-64"
        } w-64 bg-namavaBlack z-[100] px-4 py-2 transition-all`}
      >
        <div className="flex items-center justify-between border-b-2 border-b-gray-600">
          <Logo />
          <FaXmark className="text-white" onClick={() => onOpen(false)} />
        </div>
        {!isUserPanel && <Searchbar />}
        <MobileMenuContent />
        <MobileMenuFeature user={user} />
      </div>

      <Overlay isOpen={isOpen} onClose={onOpen} className="z-40" />
    </>
  );
}

export default MobileNavbar;

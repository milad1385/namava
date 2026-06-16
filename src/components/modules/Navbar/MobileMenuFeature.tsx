import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiShoppingBasket } from "react-icons/ci";
import { FaLaptop, FaUser } from "react-icons/fa6";
import { TbLogin2 } from "react-icons/tb";

function MobileMenuFeature({ user }) {
  const pathname = usePathname();
  return (
    <div>
      <ul className="text-white space-y-6">
        {!user ? (
          <li>
            <Link
              href={"/login"}
              className={`flex items-center gap-x-2 text-2xl ${
                pathname === "/login" ? "active" : ""
              }`}
            >
              <TbLogin2 />
              <span className="text-sm">ورود | ثبت نام</span>
            </Link>
          </li>
        ) : user?.role === "ADMIN" ? (
          <li>
            <Link
              href={"/p-admin"}
              className={`flex items-center gap-x-2 text-2xl ${
                pathname === "/p-admin" ? "active" : ""
              }`}
            >
              <FaLaptop />
              <span className="text-sm">پنل مدیریت</span>
            </Link>
          </li>
        ) : (
          ""
        )}

        {user && (
          <li>
            <Link
              href={"/p-user"}
              className={`flex items-center gap-x-2 text-2xl ${
                pathname === "/p-user" ? "active" : ""
              }`}
            >
              <FaUser />
              <span className="text-sm">پنل کاربری</span>
            </Link>
          </li>
        )}
        {user?.subscriptionEnd < Date.now() && (
          <li>
            <Link
              href={"/plans"}
              className={`flex items-center gap-x-2 text-2xl ${
                pathname === "/plans" ? "active" : ""
              }`}
            >
              <CiShoppingBasket />
              <span className="text-sm">خرید اشتراک</span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default MobileMenuFeature;

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";

interface SliderTitle {
  title: string;
  link?: string;
}
function SiderTitle({ title, link }: SliderTitle) {
  const pathname = usePathname();
  const textColor = pathname.includes("/kids") ? "text-black" : "text-white";
  return (
    <div className="flex items-center gap-x-2 group md:cursor-pointer">
      <Link href={link}>
        <h1 className={`font-IranMedium text-base md:text-lg ${textColor}`}>
          {title}
        </h1>
      </Link>

      <FiChevronLeft className="text-lg md:text-xl" />
    </div>
  );
}

export default SiderTitle;

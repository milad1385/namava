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
    <div>
      <Link href={link}>
        <h2
          className={`font-IranMedium text-base md:text-lg ${textColor} md:hover:text-milafilm flex items-center gap-x-2 group md:cursor-pointer`}
        >
          {title}
          <FiChevronLeft className="text-lg md:text-xl" />
        </h2>
      </Link>
    </div>
  );
}

export default SiderTitle;

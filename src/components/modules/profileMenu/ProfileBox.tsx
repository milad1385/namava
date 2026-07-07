import Image from "next/image";
import { useRouter } from "next/navigation";
import { BiLock } from "react-icons/bi";

function ProfileBox({ image, name, type, isLock, _id }: any) {
  const router = useRouter();
  const handleNavigation = () => {
    if (isLock) {
      return router.push("/profile-list");
    }
    if (type === "kid") {
      document.cookie = `profile = ${_id}; path=/`;

      window.location.href = "/kids";
    } else {
      document.cookie = `profile = ${_id}; path=/`;
      window.location.href = "/";
    }
  };
  return (
    <div
      onClick={handleNavigation}
      className="flex items-center justify-between cursor-pointer"
    >
      <div className="flex items-center gap-x-2">
        <Image
          src={image}
          alt={image}
          width={1920}
          height={1080}
          priority
          className="rounded-full h-[30px] w-[30px]"
        />
        <span>{name}</span>
      </div>
      {isLock && <BiLock className="text-base text-gray-600" />}
    </div>
  );
}

export default ProfileBox;

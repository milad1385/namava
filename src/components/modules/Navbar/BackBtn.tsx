import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

function BackBtn({ isKid }) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  return (
    <div onClick={handleGoBack}>
      <FaArrowLeft
        className={`text-xl md:text-2xl md:cursor-pointer ${isKid ? "text-zinc-600" : "text-white"}`}
      />
    </div>
  );
}

export default BackBtn;

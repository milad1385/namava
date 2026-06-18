import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

function Searchbar() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  return (
    <div className="bg-white flex items-center justify-between p-1 mt-5 rounded-sm">
      <input
        type="text"
        placeholder="جستجو کنید"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-none outline-none border-none text-[13px] "
      />
      <button
        onClick={() => {
          if (search) {
            router.push(`/search?q=${search}`);
          }
        }}
        className="bg-milafilmBlack text-white p-1 rounded-sm"
      >
        <FaMagnifyingGlass />
      </button>
    </div>
  );
}

export default Searchbar;

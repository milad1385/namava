import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function useCategoryName() {
  const [category, setCategory] = useState<any>(null);
  const { id } = useParams();
  const pathname = usePathname();

  useEffect(() => {
    const getCategoryName = async () => {
      const res = await fetch(`/api/category/${id}`);
      const category = await res.json();
      setCategory(category);
    };

    if (pathname.includes("/category")) {
      if (id) {
        getCategoryName();
      }
    } else {
      setCategory(false);
    }
  }, [pathname]);

  if (category) {
    return { category, setCategory };
  } else {
    return false;
  }
}

export default useCategoryName;

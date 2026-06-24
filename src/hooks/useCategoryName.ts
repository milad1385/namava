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

    if (id) {
      getCategoryName();
    }
  }, [pathname, id]);

  if (category) {
    return category;
  } else {
    return false;
  }
}

export default useCategoryName;

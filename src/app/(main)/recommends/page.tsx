import Recommends from "@/src/components/templates/recommends/Recommends";
import { getCategories } from "@/src/libs/service/services";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "پیشنهاد فیلم و سریال",
  description:
    "در این صفحه میتوانید با انتخاب ژانر های خود ، از هوش مصنوعی پیشنهادات تماشا فیلم و سریال را دریافت کنید",
  keywords: "پیشنهاد ، فیلم ، هوش مصنوعی ، سریال",
};

async function page() {
  const categories = await getCategories();
  return (
    <div className="my-28 text-white container">
      <Recommends categories={JSON.parse(JSON.stringify(categories))} />
    </div>
  );
}

export default page;

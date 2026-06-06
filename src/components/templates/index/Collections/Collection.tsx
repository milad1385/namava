import Image from "next/image";
import Link from "next/link";
import React from "react";
interface Collection {
  title: string;
  link: string;
  image: string;
}
function Collection({ image, title, link }: Collection) {
  return (
    <Link
      href={`/collection/${link}`}
      className="block"
      title={`مجموعه فیلم های ${title}`}
    >
      <Image
        src={image}
        alt={title}
        width={450}
        height={189}
        className="md:w-[360px] h-[90px] md:h-[189px] rounded-md"
      />
      <h3 className="mt-3 text-xs">مجموعه فیلم های {title}</h3>
    </Link>
  );
}

export default Collection;

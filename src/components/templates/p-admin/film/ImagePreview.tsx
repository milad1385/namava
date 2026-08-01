import Image from "next/image";

const ImagePreview = ({
  src,
  alt,
  size = "w-[150px] h-[100px]",
}: {
  src: string | null;
  alt: string;
  size?: string;
}) => {
  if (!src) return null;

  return (
    <div className="relative group mt-2 inline-block">
      <div
        className={`relative ${size} rounded-lg overflow-hidden border-2 border-gray-700`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          unoptimized={src.startsWith("blob:")}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] text-center py-0.5">
          {src.startsWith("blob:") ? "جدید" : "فعلی"}
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;

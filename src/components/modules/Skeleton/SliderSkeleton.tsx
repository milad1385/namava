function SliderSkeleton() {
  const bgColor = "bg-gray-700";
  const shimmerColor = "via-white/10";

  return (
    <div className="px-4 md:px-0 mt-5 md:mt-10 relative bottom-[47px]">
      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide px-1 md:px-[50px]">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="min-w-[calc(100%+5px)] sm:min-w-[calc(50%-10px)] md:min-w-0 snap-start animate-pulse"
          >
            <div className="relative">
              <div
                className={`w-full z-30 h-[150px] md:h-[186px] rounded-xl ${bgColor} overflow-hidden relative`}
              >
                <div
                  className={`absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent ${shimmerColor} to-transparent`}
                ></div>
              </div>

              <div
                className={`absolute bottom-6 right-6 h-5 w-28 sm:w-36 md:w-44 ${bgColor} rounded`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SliderSkeleton;

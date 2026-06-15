import React from "react";

function Titles() {
  return (
    <>
      <h1 className="text-lg md:text-3xl font-bold text-center mb-6">
        🎬 پیشنهاد فیلم با هوش مصنوعی
      </h1>
      <p className="text-sm/[28px] md:text-base text-center text-gray-400 mb-8 font-Dana">
        ژانر مورد علاقه خود را انتخاب کنید تا هوش مصنوعی بهترین فیلم‌ها را به
        شما پیشنهاد دهد (3 ژانر حداکثر)
      </p>
      <h2 className="text-base md:text-xl font-semibold mb-4 text-right">
      ژانر های مورد علاقه خود را انتخاب کنید : 
      </h2>
    </>
  );
}

export default Titles;

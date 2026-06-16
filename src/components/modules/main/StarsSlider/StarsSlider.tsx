import React from "react";
import Slider from "./Slider";

interface StarsSlider {
  title: string;
  allStars: any;
}
async function StarsSlider({ title , allStars}: StarsSlider) {
  return (
    <div className="container md:mt-[40px]">
      <h3 className="font-IranMedium text-base md:text-lg">{title}</h3>
      <div className="my-10">
        <Slider stars={JSON.parse(JSON.stringify(allStars))} />
      </div>
    </div>
  );
}

export default StarsSlider;

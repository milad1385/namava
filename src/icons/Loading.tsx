"use client";
import { usePathname } from "next/navigation";
import React from "react";

function Loading() {
  const pathname = usePathname();
  const bgColor = !pathname.includes("/kids")
    ? "bg-milafilmBlack text-white"
    : "bg-white text-black";
  const fillColor = !pathname.includes("/kids") ? "#222327" : "#8a8a8e";
  return (
    <div className={`${bgColor} z-50  fixed inset-0 flex-center`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 44 44"
        stroke="#fff"
        className="svg-s1 Component-root-0-1-29 Component-loading-0-1-31"
      >
        <circle cx="22" cy="22" r="1" fill={fillColor}>
          <animate
            attributeName="r"
            begin="0"
            dur="1.8s"
            values="1; 20"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.165, 0.84, 0.44, 1"
            repeatCount="indefinite"
            strokeWidth="2"
          ></animate>
          <animate
            attributeName="stroke-opacity"
            begin="0s"
            dur="1.8s"
            values="1; 0"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.3, 0.61, 0.355, 1"
            repeatCount="indefinite"
            strokeWidth="2"
          ></animate>
        </circle>
        <circle cx="22" cy="22" r="1" fill={fillColor}>
          <animate
            attributeName="r"
            begin="-0.9s"
            dur="1.8s"
            values="1; 20"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.165, 0.84, 0.44, 1"
            repeatCount="indefinite"
            strokeWidth="2"
          ></animate>
          <animate
            attributeName="stroke-opacity"
            begin="-0.9s"
            dur="1.8s"
            values="1; 0"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.3, 0.61, 0.355, 1"
            repeatCount="indefinite"
            strokeWidth="2"
          ></animate>
        </circle>
      </svg>
    </div>
  );
}

export default Loading;

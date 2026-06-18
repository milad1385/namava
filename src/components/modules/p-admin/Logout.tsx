"use client";
import { logout } from "@/src/libs/actions/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";

function Logout() {
  const router = useRouter();
  return (
    <HiArrowLeftOnRectangle
      className="text-milafilm text-2xl"
      onClick={async () => {
        await logout();
        router.replace("/");
      }}
    />
  );
}

export default Logout;

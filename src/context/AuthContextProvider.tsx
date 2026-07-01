"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { baseURL, UserAuthContextType } from "../libs/types";
import { usePathname } from "next/navigation";
import { getProfileCookie } from "../libs/actions/profile";

const UserAuthContext = createContext({} as UserAuthContextType);

type TAuthContextProvider = {
  children: React.ReactNode;
};

function AuthContextProvider({ children }: TAuthContextProvider) {
  const [userInfo, setUserInfo] = useState(null);
  const [subscripton, setSubscription] = useState(null);
  const [activeProfile, setActiveProfile] = useState<any>(null);
  const [isLogin, setIsLogin] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`,
      );
      if (res.status === 200) {
        const userData = await res.json();
        setUserInfo(userData.user);
        setSubscription(userData.subscription);
        setIsLogin(true);
      } else {
        setUserInfo(null);
        setIsLogin(false);
      }
    };

    const getActiveProfile = async () => {
      const id = await getProfileCookie();
      if (!id) return;
      const res = await fetch(`/api/profile?id=${id}`);
      const activeProfile = await res?.json();
      setActiveProfile(activeProfile.profile);
    };

    getUserInfo();
    getActiveProfile();
  }, [pathname]);

  return (
    <UserAuthContext.Provider
      value={{ userInfo, isLogin, activeProfile, subscripton }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error("the context was used outside a provider");
  }
  return context;
}

export default AuthContextProvider;

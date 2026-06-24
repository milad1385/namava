"use client";
import { useEffect, useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const ISSERVER = typeof window === "undefined";
  const [value, setValue] = useState<T>(() => {
    const localStorageData = !ISSERVER ? localStorage.getItem(key) : null;
    if (localStorageData?.length) {
      return JSON.parse(localStorageData);
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    if (!ISSERVER) localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, ISSERVER]);

  return [value, setValue] as [typeof value, typeof setValue];
}

export default useLocalStorage;

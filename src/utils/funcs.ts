export const formatDate = (date: any) => {
  return new Date(date).toLocaleDateString("fa-IR");
};

export const getRemainingDays = (user: any) => {
  const now: any = new Date();
  const userSubscription: any = new Date(user.subscriptionEnd);
  if (!user.subscriptionEnd && userSubscription < now) {
    return false;
  } else {
    const remainingTime = userSubscription - now;
    const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));

    return remainingDays;
  }
};

export function prepareData(startData: any, orders: any) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅
  function incArrayValue(arr: any, field: any) {
    return arr.map((obj: any) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj,
    );
  }

  const data = orders
    .reduce((arr: any, cur: any) => {
      const num = cur.subscription.time;
      if (num === 30) return incArrayValue(arr, "اشتراک 30 روزه");
      if (num === 60) return incArrayValue(arr, "اشتراک 60 روزه");
      if (num === 90) return incArrayValue(arr, "اشتراک 90 روزه");
      if (num === 180) return incArrayValue(arr, "اشتراک 180");
      return arr;
    }, startData)
    .filter((obj: any) => obj.value > 0);

  return data;
}

export const userSubscriptionHref = (
  subscription,
  info,
  isKid = false,
  episodeId = null,
) => {
  const href = subscription?.hasSubscription
    ? `${isKid ? "/kids" : ""}/${info?.type === "film" ? "movie" : "series"}/${info?.link}/session/${episodeId ? episodeId : ""}`
    : "/plans";

  return href;
};

export const getDateWithTime = (time: Date) => {
  const date = new Date(time);
  const persianDate = date
    .toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    .replace(/[۰-۹]/g, function (d) {
      return d;
    })
    .replace("،", " ")
    .replace("ساعت", "")
    .trim();

  return persianDate;
};

export const formateData = (data) => {
  return JSON.parse(JSON.stringify(data));
};

export const getAgeRange = (age: number | undefined) => {
  const ageMap: Record<number, string> = {
    3: "three",
    7: "seven",
    12: "twelve",
    15: "fifteen",
    18: "eighteen",
  };
  return ageMap[age] || "eighteen";
};

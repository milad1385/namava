import Search from "@/src/components/modules/p-admin/Search";
import Title from "@/src/components/modules/p-admin/Title";
import AddNewSubscription from "@/src/components/templates/p-admin/Subscription/AddNewSubscription";
import SubscriptionList from "@/src/components/templates/p-admin/Subscription/SubscriptionList";
import { getAllSubscription } from "@/src/libs/service/services";
import { TAdminPage } from "@/src/libs/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "اشتراک ها",
  description: "از این صفحه میتوان برای مدیریت اشتراک  ها استفاده کرد",
};

async function Subscription({ searchParams }: TAdminPage) {
  const { subscriptions, counts }: any = await getAllSubscription(
    +searchParams.page,
    searchParams.q
  );
  return (
    <div>
      <Title name="ساخت اشتراک" />
      <AddNewSubscription />
      <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-y-3">
        <Title name="لیست اشتراک ها" />
        <Search />
      </div>
      <SubscriptionList
        subscriptions={JSON.parse(JSON.stringify(subscriptions))}
        counts={counts}
      />
    </div>
  );
}

export default Subscription;

import Filter from "@/src/components/modules/Filter/Filter";
import OrderTable from "@/src/components/templates/p-user/OrderTable";
import { getAllUserOrders } from "@/src/libs/service/services";
import { IOrdersList, TParams, TSearchParams } from "@/src/libs/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "لیست سفارشات",
};

async function page({ searchParams }: TParams) {
  const { page, status } = await searchParams;
  const { orders, orderCount } = (await getAllUserOrders(+page)) as IOrdersList;
  return (
    <div className="text-white">
      <Filter
        filterField="status"
        options={[
          { label: "همه", slug: "all" },
          { label: "موفق", slug: "success" },
          { label: "ناموفق", slug: "unsuccess" },
        ]}
      />
      <OrderTable
        orderCount={orderCount}
        orders={JSON.parse(JSON.stringify(orders))}
        filter={status as string}
      />
    </div>
  );
}

export default page;

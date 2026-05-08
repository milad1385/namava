import Title from "@/src/components/modules/p-admin/Title";
import TicketsList from "@/src/components/templates/p-admin/tickets/TicketsList";
import { getAllTickets } from "@/src/libs/service/services";
import { IPanelTicket, TParams } from "@/src/libs/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تیکت ها",
  description: "از این صفحه میتوان برای مدیریت تیکت  ها استفاده کرد",
  keywords: "اضافه کردن ، حذف کردن ، ویرایش کردن",
};

async function Ticketspage({ searchParams }: TParams) {
  const { page } = await searchParams;
  const { tickets, ticketsCount } = (await getAllTickets(
    +page,
  )) as IPanelTicket;
  return (
    <div>
      <Title name="لیست تیکت ها" />
      <TicketsList
        ticketsCount={ticketsCount}
        tickets={JSON.parse(JSON.stringify(tickets))}
      />
    </div>
  );
}

export default Ticketspage;

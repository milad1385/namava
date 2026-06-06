import Filter from "@/src/components/modules/Filter/Filter";
import StatBox from "@/src/components/modules/p-admin/StatBox";
import SendNewTicket from "@/src/components/templates/p-user/SendNewTicket";
import TicketsList from "@/src/components/templates/p-user/TicketsList";
import {
  getAllUserTicket
} from "@/src/libs/service/services";
import { IUserTicket, TSearchParams } from "@/src/libs/types";
import { Metadata } from "next";
import { FaClosedCaptioning } from "react-icons/fa6";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { MdAccessTime } from "react-icons/md";

export const metadata: Metadata = {
  title :"لیست تیکت ها"
}

async function page({ searchParams }: TSearchParams) {
  const { tickets, ticketsCount, answeredCount, pendingCount, closeCount } =
    (await getAllUserTicket(+searchParams?.page || 1)) as IUserTicket;
  return (
    <div>
      <Filter
        filterField="status"
        options={[
          { label: "همه", slug: "all" },
          { label: "پاسخ داده شده", slug: "answer" },
          { label: "در انتظار پاسخ", slug: "pending" },
          { label: "بسته شده", slug: "close" },
        ]}
      />
      <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-white gap-3 md:gap-5 mt-5">
        <StatBox
          icon={
            <HiOutlineBriefcase className="text-2xl md:text-3xl lg:text-4xl" />
          }
          title="پاسخ داده شده"
          color="bg-amber-600"
          value={`${answeredCount} تا`}
        />
        <StatBox
          icon={<MdAccessTime className="text-2xl md:text-3xl lg:text-4xl" />}
          title="در انتظار پاسخ"
          color="bg-[#3730a3]"
          value={`${pendingCount} تا`}
        />
        <StatBox
          icon={
            <FaClosedCaptioning className="text-2xl md:text-3xl lg:text-4xl" />
          }
          title="بسته شده"
          color="bg-red-600"
          value={`${closeCount} تا`}
        />

        <SendNewTicket />
      </div>
      <TicketsList
        tickets={JSON.parse(JSON.stringify(tickets))}
        ticketsCount={ticketsCount}
        filter={searchParams?.status}
      />
    </div>
  );
}

export default page;

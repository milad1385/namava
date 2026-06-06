import AnswerBox from "@/src/components/templates/p-admin/tickets/AnswerBox";
import SendAnswerToTicket from "@/src/components/templates/p-user/SendAnswerToTicket";
import { getSpecificTicketInfo } from "@/src/libs/service/services";
import { TParams } from "@/src/libs/types";
import { Metadata } from "next";
import React from "react";

async function page({ params }: TParams) {
  const { ticketInfo, tickets }: any = await getSpecificTicketInfo(
    params?.id as string
  );
  return (
    <div className="bg-namavaBlack text-white rounded-md  p-[18px] shadow h-full">
      <h3 className="text-xl font-DanaDemiBold border-b border-b-gray-500 pb-4">
        {ticketInfo.title}
      </h3>
      {/* start question box */}
      <div className="mt-7 space-y-5">
        <AnswerBox
          isFromUserPanel={ticketInfo.isFromUserPanel}
          {...ticketInfo}
          key={crypto.randomUUID()}
        />
      </div>
      {/* start answer box  */}
      <div className="mt-5 space-y-5">
        {tickets?.length > 0 && (
          <div className="mt-5 space-y-5">
            {tickets?.map((answer: any) => (
              <AnswerBox key={answer._id} {...answer} />
            ))}
          </div>
        )}
      </div>

      {/* reply answer */}

      {ticketInfo?.isOpen ? (
        <SendAnswerToTicket
          ticketInfo={JSON.parse(JSON.stringify(ticketInfo))}
          isFromUserPanel={false}
        />
      ) : (
        <div className="bg-namava text-xs md:text-lg  text-white font-DanaDemiBold text-center rounded-lg py-8 mt-52">
          این چت در تاریخ
          <span className="font-bold">
            {new Date(ticketInfo?.updatedAt).toLocaleString("fa")}
          </span>
          به شکل اتوماتیک بسته شد
        </div>
      )}
    </div>
  );
}

export async function generateMetadata({ params }: TParams): Promise<Metadata> {
  const { ticketInfo }: any = await getSpecificTicketInfo(params?.id as string);
  return {
    title: `${ticketInfo.title}`,
    description: `برای مشاهده و ادامه بحث با ${ticketInfo.title}`,
  };
}

export default page;

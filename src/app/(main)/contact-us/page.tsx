import Form from "@/src/components/templates/contact-us/Form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ارتباط با ما",
  description:
    "از طریق این صفحه میتوانید با ادمین های سایت و دهکده آنلاین میلا فیلم در ارتباط باشید",
  keywords :"ایمیل ، ارتباط ، تماس با ما ، پشتیبانی ، 24 ساعته ، شبانه روز"
};

function ContactUsPage() {
  return (
    <div className="my-28 px-2">
      <h3 className="text-center text-lg md:text-2xl font-IranMedium text-white">
        تماس با پشتیبانی میلا فیلم
      </h3>
      <div className="bg-namava text-white p-[22px] rounded-xl max-w-[700px] mx-auto space-y-3 mt-5">
        <p className="font-IranMedium text-sm md:text-base text-center md:text-right">
          هفت روز هفته، ۲۴ ساعت شبانه‌روز پاسخگوی شما هستیم.
        </p>
        <div className="flex items-center justify-between text-xs md:text-sm">
          <a href="tel:02191000111">۰۲۱-۹۱۰۰۰۱۱۱</a>

          <a href="mailto:support@namava.ir">support@namava.ir</a>
        </div>
      </div>

      <Form />
    </div>
  );
}

export default ContactUsPage;

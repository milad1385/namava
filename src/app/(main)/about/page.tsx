import Accordion from "@/src/components/modules/Accordion/Accordion";
import Button from "@/src/components/modules/auth/Button/Button";
import Header from "@/src/components/templates/index/Header/Header";
import KidLogo from "@/src/icons/KidLogo";
import LapTop from "@/src/icons/LapTop";
import TMobile from "@/src/icons/TMobile";
import Tv from "@/src/icons/Tv";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "درباره سایت ما",
  description:
    "تماشای آنلاین جدیدترین فیلم ها، سریال ها، انیمیشن ها و همچنین پخش زنده‌ مسابقات ورزشی در نماوا. برای مشاهده‌ی محتوای دلخواهتان ثبت‌نام کنید. ما در دهکده نماوا به تمامی نیاز های شما برای تماشای فیلم و سریال های روز داریم ، هر نوع فیلمی یا سریالی در هر نوع ژانر در این دهکده تماشایی وجود دارد فقط کافی است راجع آن سرچ و جستجو داشته باشید ، ارادتمند شما میلاد سلامیان",
  keywords:
    "نماوا ، تماشای فیلم ، سریال ، آنلاین ، بدون محدودیت ، رایگان ، اشتراکی",
};

function AboutUs() {
  return (
    <div className="relative">
      <Header
        className="!h-[380px]"
        isImage
        img="/images/intro.jpg"
        isTitle
        mobileImage="mobileAboutImg.jpg"
      />
      <section className="md:absolute md:top-[550px] md:right-0 md:left-0  mx-auto z-20">
        <p className="text-lg md:text-3xl text-center font-IranMedium text-white">
          تماشای آنلاین فیلم، سریال، انیمیشن و مسابقات ورزشی
        </p>
        <p className="text-base mx-auto md:text-lg text-center text-white mt-8 max-w-[780px]">
          تماشای آنلاین جدیدترین فیلم ها، سریال ها، انیمیشن ها و همچنین پخش
          زنده‌ مسابقات ورزشی در نماوا. برای مشاهده‌ی محتوای دلخواهتان ثبت‌نام
          کنید.
        </p>
      </section>
      <section className="my-10">
        <Link href="/">
          <Button className="text-white !w-[200px] h-[52px] mx-auto text-lg">
            تماشا آنلاین
          </Button>
        </Link>

        <div className="pt-[80px]">
          <p className="text-lg md:text-2xl font-IranMedium text-center text-white">
            هر لحظه، هر کجا، با هر دستگاهی آنلاین فیلم ببین
          </p>
          <Image
            src={"/images/intro2.jpg"}
            alt="intro2.jpg"
            width={1920}
            height={1080}
            className="w-[974px] md:h-[514px] mx-auto mt-10"
          />
          <div className="max-w-[974px] text-white mx-auto grid grid-cols-3 place-items-center">
            <div className="flex-center flex-col mt-5 md:mt-[33px]">
              <TMobile />
              <p className="font-IranMedium text-sm md:text-xl">
                موبایل و تبلت
              </p>
              <ul className="flex-center flex-col gap-y-2 md:gap-y-3 text-xs md:text-lg mt-6">
                <li>اندروید</li>
                <li>IOS</li>
                <li>وب</li>
              </ul>
            </div>
            <div className="flex-center flex-col">
              <Tv />
              <p className="font-IranMedium text-sm md:text-xl">تلوزیون</p>
              <ul className="flex-center flex-col gap-y-2 md:gap-y-3 text-xs md:text-lg mt-6">
                <li>اندروید</li>
                <li>وب</li>
              </ul>
            </div>
            <div className="flex-center flex-col">
              <LapTop />
              <p className="font-IranMedium text-sm md:text-xl">رایانه شخصی</p>
              <ul className="flex-center flex-col gap-y-2 md:gap-y-3 text-xs md:text-lg mt-6">
                <li>ویندوز</li>
                <li>مک</li>
              </ul>
            </div>
          </div>

          <div className="live-section p-5 md:p-0 flex items-center flex-col md:flex-row gap-x-16 text-white">
            <div>
              <Image
                src={"/images/footbal.jpg"}
                alt="footbal.jpg"
                width={1920}
                height={1080}
                className="w-[256px] md:w-[645px] md:h-[364px]"
              />
            </div>

            <div className="space-y-5 md:space-y-12 flex-center md:block flex-col">
              <Image
                src={"/images/namavaLive.svg"}
                alt="namavaLive.svg"
                width={1920}
                height={1080}
                className="w-[110px] mt-5 md:mt-0 md:w-[188px]"
              />

              <p className="text-base md:text-3xl font-IranMedium">
                پخش زنده مهم‌ترین رویدادهای ورزشی در نماوا
              </p>
              <p className="max-w-[727px]  text-center md:text-right text-sm/6 md:text-lg">
                امکان پخش زنده مسابقات و رویدادهای ورزشی فوتبال، والیبال،
                بسکتبال، فرمول 1، بیلیارد، اسنوکر و... بدون نیاز به خرید اشتراک
                در نماوا
              </p>
              <Button className="!w-[150px] md:!w-[175px] md:!h-[52px] !mt-12 !text-xs md:!text-base">
                رفتن به پخش زنده
              </Button>
            </div>
          </div>
          <div className="max-w-[1112px] p-5 md:p-0  mx-auto flex flex-col md:flex-row items-center gap-y-6 gap-x-5 text-white">
            <div className="space-y-4 flex flex-col  items-center md:items-start">
              <KidLogo className="!w-[200px]" />
              <p className="text-sm md:text-xl/9 md:w-[577px] text-center md:text-right">
                برای فرزند خود یک پروفایل جداگانه بسازید، تصویر شخصیت محبوب
                فرزندتان را انتخاب کنید و با خیال راحت محتوای متناسب با سن
                کودکتان را پخش کنید.
                <br />
                به‌علاوه می‌توانید محتوای نامناسب از نظر خودتان را از دسترس کودک
                حذف و حتی میزان و ساعت‌های تماشای محتوای فرزندتان را مدیریت
                کنید.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={"/images/kid.jpg"}
                className="w-[576px] md:h-[576px]"
                alt="kid"
                width={1920}
                height={1080}
              />
            </div>
          </div>

          <div className="max-w-[1300px] mt-16 text-white mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center items-center">
            <div className="flex-center flex-col">
              <Image
                src="/images/download.svg"
                alt="user"
                width={1920}
                height={1080}
                className="w-[100px] md:w-[120px]"
              />
              <h3 className="font-IranMedium mt-10 text-sm md:text-xl">
                دانلود
              </h3>
              <p className="max-w-[256px] h-[93px] text-sm md:text-base/8 text-center mt-5">
                دانلود رایگان فیلم، سریال، انیمیشن و ... در گوشی، تبلت و
                کامپیوتر
              </p>
            </div>
            <div className="flex-center flex-col">
              <Image
                src="/images/user2.svg"
                alt="user"
                width={1920}
                height={1080}
                className="w-[100px] md:w-[120px]"
              />
              <h3 className="font-IranMedium mt-10 text-sm md:text-xl">
                مالتی پروفایل
              </h3>
              <p className="max-w-[256px] h-[93px] text-sm md:text-base/8 text-center mt-5">
                برای هر نفر از اعضای خانواده یک پروفایل شخصی بسازید.
              </p>
            </div>
            <div className="flex-center flex-col">
              <Image
                src="/images/like.svg"
                alt="user"
                width={1920}
                height={1080}
                className="w-[100px] md:w-[120px]"
              />
              <h3 className="font-IranMedium mt-10 text-sm md:text-xl">
                پیشنهاد بر اساس سلیقه
              </h3>
              <p className="max-w-[256px] h-[93px] text-sm md:text-base/8 text-center mt-5">
                پیشنهادهای شگفت انگیز نماوا براساس علاقه‌مندی‌ها و فیلم‌های
                تماشا شده‌ی شما
              </p>
            </div>
            <div className="flex-center flex-col">
              <Image
                src="/images/film.svg"
                alt="user"
                width={1920}
                height={1080}
                className="w-[100px] md:w-[120px]"
              />
              <h3 className="font-IranMedium mt-10 text-sm md:text-xl">
                پردیس
              </h3>
              <p className="max-w-[256px] h-[93px] text-sm md:text-base/8 text-center mt-5">
                اکران آنلاین بهترین‌ فیلم‌های روز سینمای ایران در پردیس نماوا
              </p>
            </div>
          </div>

          <div className="flex px-4 md:px-0 flex-col md:flex-row justify-center gap-12 mt-16">
            <div className="md:w-[384px] flex flex-col items-center gap-y-4 h-[509px] text-white bg-[#37383e] px-[24px] pt-[56px] pb-[46px] border-[2px] border-gray-400 rounded-xl">
              <Image
                src={"/images/about/star2.svg"}
                alt="star"
                width={100}
                height={100}
                className="w-[65px] h-[100px]"
              />
              <h3 className="font-IranMedium text-lg md:text-2xl mt-10">
                اشتراک نماوا
              </h3>
              <p className="flex items-center text-lg mt-6">
                شروع از{" "}
                <span className="px-[20px] font-Dana text-[24px] md:text-[42px] tracking-tighter font-bold">
                  119,000
                </span>
                تومان
              </p>
              <p className="text-center mt-10 leading-8 text-[14px] md:text-base">
                دسترسی نامحدود به تمام محتوای نماوا
              </p>
            </div>
            <div className="md:w-[384px] h-[509px] flex flex-col items-center gap-y-4 text-white bg-[#37383e] px-[24px] pt-[56px] pb-[46px] border-[2px] border-gray-400 rounded-xl">
              <Image
                src={"/images/about/star2.svg"}
                alt="star"
                width={100}
                height={100}
                className="w-[65px] h-[100px]"
              />
              <h3 className="font-IranMedium text-lg md:text-2xl mt-10">
                اشتراک با تمدید خودکار
              </h3>
              <p className="flex items-center text-lg mt-6">
                شروع از{" "}
                <span className="px-[20px] font-Dana text-[24px] md:text-[42px] tracking-tighter font-bold">
                  90,000
                </span>
                تومان
              </p>
              <p className="text-center mt-10 leading-8 text-[14px] md:text-base">
                یکبار پرداخت کنید، یکسال اشتراک داشته باشید. تمدید خودکار اشتراک
                نماوا از طریق شیوه نوین پرداخت بانکی
              </p>
            </div>
          </div>

          <Link href="/plans">
            <Button className="!w-[250px] md:!w-[366px] mx-auto my-10 text-white">
              خرید اشتراک
            </Button>
          </Link>

          <div
            className="questions text-white my-24 max-w-[1216px] mx-auto"
            id="questions"
          >
            <h3 className="text-2xl font-IranMedium text-center">
              سوالات متداول
            </h3>
            {/* question Accordion */}
            <div className="mt-10 space-y-5">
              <Accordion title="آیا برای ساخت پروفایل جدید نیاز به پرداخت جداگانه وجود دارد؟">
                بله، برای تماشای تمامی محتوای نماوا به جز قسمت پخش زنده‌ی
                مسابقات ورزشی نیاز به خرید اشتراک وجود دارد.
              </Accordion>
              <Accordion title="پروفایل کاربری چیست؟ با ساخت اکانت (ایجاد حساب کاربری) چه تفاوتی دارد؟">
                حساب کاربری نماوا پس از ثبت‌نام کاربر به صورت خودکار ایجاد
                می‌شود. در هر حساب کاربری، امکان ساخت پروفایل‌های مختلف (از جمله
                پروفایل‌های مختص کودکان) با تنظیمات اختصاصی هر پروفایل و
                نگه‌داشتن سابقه‌ی تماشای هر پروفایل وجود دارد.
              </Accordion>
              <Accordion title="آیا برای ساخت پروفایل جدید نیاز به پرداخت جداگانه وجود دارد؟">
                خیر، شما با هر حساب کاربری می‌توانید ۵ پروفایل جداگانه داشته
                باشید.
              </Accordion>
              <Accordion title="آیا برای ساخت پروفایل جدید نیاز به پرداخت جداگانه وجود دارد؟">
                اشتراک تمدید خودکار، یک روش امن و راحت برای پرداخت‌های دوره‌ای
                است. این شیوه به شما امکان آن را می‌دهد که با یک قرارداد اشتراک
                نماوای خود را فعال کنید و پس از آن مبلغ اشتراک به صورت ماهانه از
                حساب شما کسر خواهد شد. مبلغ اشتراک در دوره‌ی قرارداد شما تغییری
                نخواهد داشت.
              </Accordion>
            </div>
          </div>

          <div className="text-white my-24 px-4 md:px-0 flex-col md:flex-row flex gap-10 max-w-[1216px] mx-auto">
            <div className="bg-namavaBlack w-full rounded-xl flex items-center pt-10 px-10 flex-col space-y-4">
              <h3 className="font-IranMedium text-base md:text-2xl">
                نماوا تی‌وی
              </h3>
              <p className="max-w-[408px] text-center text-xs/[25px] md:text-lg">
                با نماوا تی وی تلویزیون خود را به یک دستگاه هوشمند با قابلیت نصب
                برنامه‌های دلخواه تبدیل کنید.{" "}
              </p>
              <Button className="!w-[150px] !text-sm md:!text-base">
                اطلاعات بیشتر
              </Button>
              <Image
                width={1920}
                height={1080}
                src="/images/about/nbs4.png"
                alt="nbs4.png"
                className="w-[464px]"
              />
            </div>
            <div className="bg-namavaBlack h-[372px] md:h-[470px] overflow-hidden w-full rounded-xl relative flex items-center pt-10 px-10 flex-col space-y-4">
              <h3 className="font-IranMedium text-base md:text-2xl">
                نماوا مگ
              </h3>
              <p className="max-w-[408px] text-center text-xs/[25px] md:text-lg">
                نقد و بررسی محتواهای روز دنیا را در مجله نماوا بخوانید و از
                خواندن آن لذت ببرید{" "}
              </p>
              <Button className="!w-[150px]">اطلاعات بیشتر</Button>
              <Image
                width={1920}
                height={1080}
                src="/images/about/article.jpg"
                alt="article.jpg"
                className="w-[248px] md:w-[512px] absolute top-52"
              />
            </div>
          </div>

          <div className="my-24 text-white px-4 md:px-0">
            <h3 className="text-lg md:text-2xl font-IranMedium text-center">
              پشتیبانی ۲۴ ساعته
            </h3>
            <div className="px-[46px] py-[24px] rounded-xl space-y-6 bg-namavaBlack max-w-[592px] mx-auto mt-10">
              <h2 className="text-base md:text-xl mx-auto text-center">
                هفت روز هفته، ۲۴ ساعت شبانه‌روز پاسخگوی شما هستیم.
              </h2>
              <h4 className="text-base md:text-lg mx-auto text-center">
                شماره تماس : ۹۱۰۰۰۱۱۱-۰۲۱
              </h4>
              <h6 className="text-base md:text-lg mx-auto text-center">
                ایمیل : support@namava.ir
              </h6>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;

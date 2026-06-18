import type { Metadata } from "next";
import Navbar from "@/src/components/modules/Navbar/Navbar";
import FooterMenu from "@/src/components/modules/FooterMenu/FooterMenu";
import Footer from "@/src/components/modules/Footer/Footer";
import { Toaster } from "react-hot-toast";
import { authUser } from "@/src/utils/serverHelper";
import { checkUserSubscription, getMainMenus } from "../libs/service/services";
import AuthContextProvider from "../context/AuthContextProvider";
import "@/src/globals.css";
import NextTopLoader from "nextjs-toploader";
import ChatButton from "../components/modules/chatbot/ChatButton";

export const metadata: Metadata = {
  title: {
    template: "%s | میلا فیلم",
    default: "تماشای آنلاین فیلم و سریال | میلا فیلم",
  },
  description:
    "تماشای آنلاین فیلم و سریال در سایت فیلم میلا فیلم. دانلود و تماشای آنلاین جدیدترین فیلم و سریال ایرانی و خارجی با قابلیت دانلود رایگان در میلا فیلم.",
  icons: {
    icon: "/images/namava.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await authUser();
  const userSubscription = await checkUserSubscription();
  const menus = await getMainMenus();

  return (
    <html lang="fa" dir="rtl" className="font-Iran bg-[#121212]">
      <body>
        <NextTopLoader height={5} color="#0066ff" showSpinner={false} />
        <AuthContextProvider>
          <Navbar
            user={JSON.parse(JSON.stringify(user))}
            userSubscription={userSubscription}
            menus={JSON.parse(JSON.stringify(menus))}
          />
          {children}
          <ChatButton />
          <Footer />
          <FooterMenu />
          <Toaster />
        </AuthContextProvider>
      </body>
    </html>
  );
}

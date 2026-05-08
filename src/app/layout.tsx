import Footer from "@/src/components/modules/Footer/Footer";
import FooterMenu from "@/src/components/modules/FooterMenu/FooterMenu";
import Navbar from "@/src/components/modules/Navbar/Navbar";
import "@/src/globals.css";
import { authUser } from "@/src/utils/serverHelper";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "../context/AuthContextProvider";
import { checkUserSubscription, getMainMenus } from "../libs/service/services";

export const metadata: Metadata = {
  title: {
    template: "%s | نماوا",
    default: "تماشای آنلاین فیلم و سریال | نماوا",
  },
  description:
    "تماشای آنلاین فیلم و سریال در سایت فیلم نماوا. دانلود و تماشای آنلاین جدیدترین فیلم و سریال ایرانی و خارجی با قابلیت دانلود رایگان در نماوا.",
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
          <Footer />
          <FooterMenu />
          <Toaster />
        </AuthContextProvider>
      </body>
    </html>
  );
}

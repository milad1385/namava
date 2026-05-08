import LoginForm from "@/src/components/templates/auth/Login/LoginForm";
import SendOtpCode from "@/src/components/templates/auth/Login/OtpLogin";
import VerifyOtp from "@/src/components/templates/auth/Login/VerifyOtp";
import Logo from "@/src/icons/Logo";
import Link from "next/link";
import { TParams } from "@/src/libs/types";

async function Login({ searchParams }: TParams) {
  const { type } = await searchParams;
  return (
    <div className="bg-namavaBlack md:bg-[#121212] flex-center min-h-screen text-white">
      <div className="login-form relative  md:shadow w-[500px] max-h-[641px] bg-namavaBlack px-[40px] md:px-[60px] py-[20px] md:py-[30px] rounded-lg">
        <Logo className="fill-namava !w-[96px] !h-[61px] mx-auto" />
        <Link
          href={"/register"}
          className="text-namava absolute left-10 md:left-20 top-10 md:top-12"
        >
          ثبت نام
        </Link>
        {type === "verify" && <VerifyOtp />}
        {type === "otp" && <SendOtpCode />}
        {!type && <LoginForm />}

        {type !== "verify" && (
          <div className="flex-center flex-col text-xs md:text-sm text-namava space-y-6 !mt-8">
            {type !== "otp" && (
              <Link href={"?type=forgot"}>رمز عبور خود را فراموش کرده ام.</Link>
            )}
            <div className="flex items-center gap-x-6">
              <Link
                href={"?type=otp"}
                className={type === "otp" ? "text-white" : ""}
              >
                ورود با کد یکبار مصرف
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateMetadata({ searchParams }: TParams) {
  const { type } = await searchParams;
  const loginType = type === "otp" ? "کد یکبار مصرف" : "اطلاعات هویتی";

  return {
    title: `ورود از طریق ${loginType}`,
  };
}

export default Login;

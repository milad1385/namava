import {
  IoHomeOutline,
  IoSettingsSharp,
  IoTicketOutline,
} from "react-icons/io5";
import { LiaComments } from "react-icons/lia";
import { MdArticle } from "react-icons/md";

import { FaRegCircleUser, FaRegHeart, FaStar } from "react-icons/fa6";
import Folder2 from "@/src/icons/Folder2";
import Star from "@/src/icons/Star";
import Gift from "@/src/icons/gift";
import User from "@/src/icons/User";
import Phone from "@/src/icons/Phone";
export const day: any = [];
export const year: any = [];
export let genres = [
  { name: "ایرانی", id: 1 },
  { name: " انیمه و انیمیشن", id: 2 },
  { name: " دوبله نماوا", id: 3 },
  { name: " پردیس نماوا", id: 4 },
  { name: "کره ای", id: 5 },
  { name: "هندی", id: 6 },
  { name: "ترکی", id: 7 },
  { name: "برترین ها", id: 8 },
  { name: "اسکار", id: 9 },
  { name: " آموزش و سرگرمی", id: 10 },
  { name: "اکشن", id: 11 },
  { name: "کمدی", id: 12 },
  { name: "ترسناک", id: 13 },
  { name: "عاشقانه", id: 14 },
  { name: "درام", id: 15 },
  { name: " علمی تخیلی", id: 16 },
  { name: "جنایی", id: 17 },
  { name: "کودک", id: 18 },
  { name: "ماجراجویی", id: 19 },
  { name: "کلاسیک", id: 20 },
];

export const ITEM_PER_PAGE = 10;

export const RadioOptions = [
  { id: "series", name: "سریال", isActive: false },
  { id: "film", name: "فیلم", isActive: true },
];

export const ContentType = [
  { id: "kid", name: "کودک", isActive: false },
  { id: "adult", name: "بزرگسال", isActive: true },
];

export const MovieStatus = [
  { id: "free", name: "رایگان", isActive: false },
  { id: "price", name: "اشتراکی", isActive: true },
];

export let country = [
  { name: "ایران", id: 1 },
  { name: "هند", id: 2 },
  { name: "آمریکا", id: 3 },
  { name: "کره", id: 4 },
  { name: "ژاپن", id: 5 },
  { name: "انگلیس", id: 6 },
  { name: "ترکیه", id: 7 },
  { name: "آلمان", id: 8 },
  { name: "اسپانیا", id: 8 },
  { name: "فرانسه", id: 9 },
  { name: "چین", id: 10 },
  { name: "روسیه", id: 11 },
  { name: "برزیل", id: 12 },
  { name: "کانادا", id: 13 },
  { name: "آمریکا شمالی", id: 14 },
  { name: "استرالیا", id: 15 },
  { name: "دانمارک", id: 16 },
  { name: "ایتالیا", id: 17 },
  { name: "امارات متحده عربی", id: 17 },
  { name: "عربستان", id: 19 },
  { name: "تایلند", id: 20 },
];

const monthName = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

export let voiceType = [
  { name: "صدای فارسی", id: 1 },
  { name: "صدای انگلیسی", id: 2 },
  { name: "صدای ترکی", id: 3 },
  { name: "صدای کره ای", id: 4 },
  { name: "صدای هندی", id: 5 },
  { name: "صدای ژاپنی", id: 6 },
  { name: "صدای اسپانیایی", id: 7 },
  { name: "صدای آلمانی", id: 8 },
  { name: "صدای فرانسوی", id: 9 },
  { name: "صدای ایتالیایی", id: 10 },
  { name: "صدای آذری", id: 11 },
  { name: "صدای چینی", id: 12 },
  { name: "صدای روسی", id: 13 },
  { name: "دوبله نماوا", id: 14 },
  { name: "دوبله فارسی", id: 15 },
  { name: "زیرنویس انگلیسی", id: 16 },
  { name: "مخصوص ناشنوایان", id: 17 },
];

export let orderType = [
  { name: "پیش فرض (مرتبط ترین)", id: 1, slug: "default" },
  { name: "تازه های نماوا", id: 2, slug: "showTime-desc" },
  { name: "امتیاز IMDB", id: 3, slug: "IMDB-desc" },
  { name: "سال ساخت (جدید ترین)", id: 4, slug: "createdAt-desc" },
  { name: "سال ساخت (قدیمی ترین)", id: 5, slug: "createdAt-asc" },
];

export let date: { shamsi: number[]; miladi: number[] } = {
  shamsi: [],
  miladi: [],
};

const generateShamsi = () => {
  for (let i = 1300; i <= 1403; i++) {
    date.shamsi.push(i);
  }
};

const generateMiladi = () => {
  for (let i = 1900; i <= 2024; i++) {
    date.miladi.push(i);
  }
};

export const sidebarLinks = [
  {
    id: 1,
    title: "صفحه اصلی",
    icon: <IoHomeOutline className="text-[22px]" />,
    link: "/p-user",
  },
  {
    id: 2,
    title: "حساب کاربری",
    icon: <FaRegCircleUser className="text-[22px]" />,
    link: "/p-user/account",
  },
  {
    id: 3,
    title: "وضعیت اشتراک",
    icon: <FaStar className="text-[22px]" />,
    link: "/p-user/subscriptions",
  },
  {
    id: 4,
    title: "لیست سفارش ها",
    icon: <MdArticle className="text-[22px]" />,
    link: "/p-user/orders",
  },
  {
    id: 5,
    title: "تنظیمات پروفایل",
    icon: <IoSettingsSharp className="text-[22px]" />,
    link: "/p-user/settings",
  },
  {
    id: 6,
    title: "کامنت ها",
    icon: <LiaComments className="text-[22px]" />,
    link: "/p-user/comments",
  },
  {
    id: 7,
    title: "تیکت ها",
    icon: <IoTicketOutline className="text-[22px]" />,
    link: "/p-user/tickets",
  },
  {
    id: 8,
    title: "مورد علاقه ها",
    icon: <FaRegHeart className="text-[22px]" />,
    link: "/p-user/favlist",
  },
];

export const profileLinks = [
  { id: 1, title: "لیست من", icon: <Folder2 />, link: "bookmarks" },
  { id: 2, title: "خرید اشتراکی", icon: <Star />, link: "plans" },
  { id: 3, title: "کارت هدیه", icon: <Gift />, link: "plans" },
  { id: 4, title: "حساب کاربری", icon: <User />, link: "p-user" },
  { id: 5, title: "تماس با ما", icon: <Phone />, link: "contact-us" },
];

const generateDate = () => {
  for (let i = 1; i <= 31; i++) {
    day.push({ id: i, label: i, value: i });
  }
};

export const generateFavriteGenres = () => {
  return genres.map((genre) => ({
    id: genre.id,
    label: genre.name,
    value: genre.name,
  }));
};

export const generateMonth = () => {
  return monthName.map((month, index) => ({
    id: index + 1,
    label: month,
    value: month,
  }));
};

export const generateYear = () => {
  for (let i = 1300; i <= 1403; i++) {
    year.push({ id: i, label: i, value: i });
  }
};

export const banks = [
  { id: 1, name: "بانک ملت", icon: "BehPardakht.png" },
  { id: 2, name: "بانک رفاه", icon: "RefahEPay.png" },
  { id: 3, name: "بانک ملی", icon: "SadadEPay.png" },
  { id: 4, name: "بانک کارآفرین", icon: "KarafarinEPay.png" },
  { id: 5, name: "بانک پارسیان", icon: "ParsianEPay.png" },
];

export const priority = [
  { id: 1, value: "1", label: "زیاد" },
  { id: 2, value: "2", label: "متوسط" },
  { id: 3, value: "3", label: "کم" },
];

export const subtitleList = [
  {
    url: "/subtitles/spiderman-fa.vtt",
    lang: "fa",
    label: "فارسی",
    default: false,
  },
  {
    url: "/subtitles/spiderman-en.vtt",
    lang: "en",
    label: "English",
    default: false,
  },
];

generateMiladi();
generateShamsi();
generateDate();
generateYear();

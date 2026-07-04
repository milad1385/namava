import * as z from "zod";

export const User = z.object({
  name: z
    .string()
    .min(3, { message: "نام حداقل باید 3 کارکتر باشد" })
    .max(30, { message: "نام باید 30 کاراکتر داشته باشد" }),
  username: z
    .string({ required_error: "لطفا نام کاربری را وارد کنید" })
    .min(3, { message: "نام کاربری باید حداقل 3 کاراکتر داشته باشد " })
    .max(30, {
      message: "نام کاربری باید حداکثر 30 کاراکتر داشته باشد",
    }),
  phone: z
    .string()
    .min(11, { message: "شماره تلفن باید حداقل 11 کاراکتر داشته باشد " })
    .max(11, {
      message: "شماره تلفن باید حداکثر 11 کاراکتر داشته باشد",
    }),
  email: z
    .string()
    .email({ message: "فرمت ایمیل را صحیح وارد کنید" })
    .max(100, { message: "ایمیل حداکثر باید 100 کارکتر داشته باشد" }),
  password: z
    .string()
    .min(8, { message: "رمز عبور باید حداقل 8 کاراکتر داشته باشد " })
    .max(30, {
      message: " رمز عبور باید حداکثر 30 کاراکتر داشته باشد",
    }),

  biography: z.string().optional(),
});

export type TUser = z.infer<typeof User>;

export const UpdateUserSchema = z.object({
  name: z
    .string()
    .min(3, { message: "نام حداقل باید 3 کارکتر باشد" })
    .max(30, { message: "نام باید 30 کاراکتر داشته باشد" }),
  username: z
    .string({ required_error: "لطفا نام کاربری را وارد کنید" })
    .min(3, { message: "نام کاربری باید حداقل 3 کاراکتر داشته باشد " })
    .max(30, {
      message: "نام کاربری باید حداکثر 30 کاراکتر داشته باشد",
    }),
  phone: z
    .string()
    .min(11, { message: "شماره تلفن باید حداقل 11 کاراکتر داشته باشد " })
    .max(11, {
      message: "شماره تلفن باید حداکثر 11 کاراکتر داشته باشد",
    }),
  email: z
    .string()
    .email({ message: "فرمت ایمیل را صحیح وارد کنید" })
    .max(100, { message: "ایمیل حداکثر باید 100 کارکتر داشته باشد" }),
  password: z
    .string()
    .max(30, {
      message: " رمز عبور باید حداکثر 30 کاراکتر داشته باشد",
    })
    .optional(),

  biography: z
    .string()
    .max(1000, {
      message: "بیوگرافی حداکثر باید 1000 کارکتر داشته باشد",
    })
    .optional(),
});

// categories schema

export const Category = z.object({
  title: z
    .string({ required_error: "عنوان دسته بندی را وارد کنید" })
    .min(3, { message: "عنوان دسته بندی حداقل باید 3 کارکتر باشد" })
    .max(30, { message: "عنوان دسته بندی باید 30 کاراکتر داشته باشد" }),
  link: z
    .string({ required_error: "لینک دسته بندی را وارد کنید" })
    .min(3, { message: "لینک دسته بندی  حداقل باید 3 کارکتر باشد" })
    .max(30, { message: "لینک دسته بندی  باید 30 کاراکتر داشته باشد" }),
  desc: z
    .string({ required_error: "توضیحات دسته بندی را وارد کنید" })
    .min(3, { message: "توضیحات دسته بندی  حداقل باید 3 کارکتر باشد" })
    .max(1000, { message: "توضیحات دسته بندی  باید 1000 کاراکتر داشته باشد" }),
  parrent: z.string().optional(),
  image: z.any().optional(),
  tags: z
    .string({ required_error: "تگ های دسته بندی را بنویسید" })
    .min(3, { message: "تگ باید حداقل 3 کارکتر باشد" })
    .max(150, { message: "تگ باید حداکثر 150 کارکتر باشد" }),
});

export type TCategory = z.infer<typeof Category>;

// menus schema

export const Menu = z.object({
  title: z
    .string()
    .min(3, { message: "عنوان منو حداقل باید 3 کارکتر باشد" })
    .max(30, { message: "عنوان منو باید 30 کاراکتر داشته باشد" }),
  link: z
    .string({ required_error: "لینک منو را وارد کنید" })
    .min(1, { message: "لینک منو  حداقل باید 1 کارکتر باشد" })
    .max(30, { message: "لینک منو  باید 30 کاراکتر داشته باشد" }),
  parrent: z.string().optional(),
});

export type TMenu = z.infer<typeof Menu>;

// actor schema

export const Actor = z.object({
  name: z
    .string({ required_error: "نام ستاره را وارد کنید" })
    .min(3, { message: "نام حداقل باید 3 کارکتر باشد" })
    .max(30, { message: "نام باید 30 کاراکتر داشته باشد" }),
  bio: z
    .string()
    .min(8, { message: "بیوگرافی حداقل باید 8 کارکتر داشته باشد" })
    .max(3000, {
      message: "بیوگرافی حداکثر باید 3000 کارکتر داشته باشد",
    }),

  link: z
    .string({ required_error: "لینک را وارد کنید" })
    .min(3, { message: "لینک  حداقل باید 3 کارکتر باشد" })
    .max(30, { message: "لینک  باید 30 کاراکتر داشته باشد" }),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  image: z.any().refine(
    (file) => {
      return file && file[0] instanceof File;
    },
    { message: "عکس را آپلود کنید" },
  ),
});

export const UpdateActor = z.object({
  name: z
    .string({ required_error: "نام ستاره را وارد کنید" })
    .min(3, { message: "نام حداقل باید 3 کارکتر باشد" })
    .max(30, { message: "نام باید 30 کاراکتر داشته باشد" }),
  bio: z
    .string()
    .min(8, { message: "بیوگرافی حداقل باید 8 کارکتر داشته باشد" })
    .max(3000, {
      message: "بیوگرافی حداکثر باید 3000 کارکتر داشته باشد",
    }),

  link: z
    .string({ required_error: "لینک را وارد کنید" })
    .min(3, { message: "لینک  حداقل باید 3 کارکتر باشد" })
    .max(30, { message: "لینک  باید 30 کاراکتر داشته باشد" }),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  image: z.any(),
});

export type TActor = z.infer<typeof Actor>;

// movie schema

export const Movie = z.object({
  title: z
    .string()
    .min(3, { message: "عنوان اثر حداقل باید 3 کارکتر باشد" })
    .max(60, { message: "عنوان اثر باید 60 کاراکتر داشته باشد" }),
  ageRange: z
    .string()
    .min(1, { message: "رده سنی حداقل باید 1 کارکتر باشد" })
    .max(3, { message: "رده سنی باید حداکثر 3  کاراکتر داشته باشد" }),
  time: z
    .string()
    .min(1, { message: "مدت زمان حداقل باید 1 کارکتر باشد" })
    .max(10, { message: "مدت زمان باید 10 کاراکتر داشته باشد" }),

  link: z
    .string({ required_error: "لینک را وارد کنید" })
    .min(3, { message: "لینک  حداقل باید 3 کارکتر باشد" })
    .max(30, { message: "لینک  باید 30 کاراکتر داشته باشد" }),
  shortDesc: z
    .string({ required_error: "توضیحات اثر را وارد کنید" })
    .min(3, { message: "توضیحات اثر  حداقل باید 3 کارکتر باشد" })
    .max(1000, { message: "توضیحات اثر  باید 1000 کاراکتر داشته باشد" }),
  showTime: z
    .string({ required_error: "توضیحات اثر را وارد کنید" })
    .min(3, { message: "توضیحات اثر  حداقل باید 3 کارکتر باشد" })
    .max(1000, { message: "توضیحات اثر  باید 1000 کاراکتر داشته باشد" }),
  category: z.string().min(1, { message: "دسته بندی اثر را انتخاب کنید" }),
  type: z.string().min(1, { message: "لطفا نوع اثر را انتخاب کنید" }),
  season: z.any().optional().default(null),
  longDesc: z
    .string()
    .min(3, { message: "توضیحات اثر  حداقل باید 3 کارکتر باشد" })
    .max(10000, { message: "توضیحات اثر  باید 10000 کاراکتر داشته باشد" }),
  language: z.string().min(1, { message: "زبان اثر را انتخاب کنید" }),
  mainImage: z.any().refine(
    (file) => {
      return file && file[0] instanceof File;
    },
    { message: "تصویر اصلی را آپلود کنید" },
  ),
  video: z.any().refine(
    (file) => {
      return file && file[0] instanceof File;
    },
    { message: "ویدیو باید آپلود شود" },
  ),
  deskBanner: z.any().refine(
    (file) => {
      return file && file[0] instanceof File;
    },
    { message: "بنر دسکتاپ باید آپلود شود" },
  ),
  mobileBanner: z.any().refine(
    (file) => {
      return file && file[0] instanceof File;
    },
    { message: "بنر موبایل باید آپلود شود" },
  ),
  detailImage: z.any().refine(
    (file) => {
      return file && file[0] instanceof File;
    },
    { message: "تصویر جزییات را آپلود کنید" },
  ),

  logo: z.any().refine(
    (file) => {
      return file && file[0] instanceof File;
    },
    { message: "تصویر لوگو را آپلود کنید" },
  ),

  director: z
    .string()
    .min(2, { message: "نام کارگردان را وارد کنید" })
    .max(20, { message: "حداکثر نام کارگردان 20 کاراکتر است" }),
  contentType: z
    .string()
    .min(1, { message: "نوع محتوا این اثر را انتخاب کنید" }),
  priceStatus: z.string().min(1, {
    message: "وضعیت قیمت این اثر را انتخاب کنید",
  }),
  isSlider: z.boolean().default(false),
});

export type TMovie = z.infer<typeof Movie>;

// session schema

export const Session = z.object({
  title: z
    .string()
    .min(3, { message: "عنوان قسمت حداقل باید 3 کارکتر باشد" })
    .max(60, { message: "عنوان قسمت باید 60 کاراکتر داشته باشد" }),
  time: z
    .string()
    .min(1, { message: "مدت زمان حداقل باید 1 کارکتر باشد" })
    .max(10, { message: "مدت زمان باید 10 کاراکتر داشته باشد" }),
  link: z
    .string()
    .min(3, { message: "لینک  حداقل باید 3 کارکتر باشد" })
    .max(30, { message: "لینک  باید 30 کاراکتر داشته باشد" }),
  desc: z
    .string()
    .min(3, { message: "توضیحات قسمت  حداقل باید 3 کارکتر باشد" })
    .max(1000, { message: "توضیحات قسمت  باید 1000 کاراکتر داشته باشد" }),
  banner: z.any().refine(
    (file) => {
      return file && file[0] instanceof File;
    },
    { message: "بنر  باید آپلود شود" },
  ),
  video: z.any().refine(
    (file) => {
      return file && file[0] instanceof File;
    },
    { message: "ویدیو باید آپلود شود" },
  ),
  serial: z.string().min(1, { message: "سریال را انتخاب کنید" }),
  season: z.string().min(1, { message: "شماره فصل قسمت را وارد کنید" }),
});

export type TSession = z.infer<typeof Session>;

// article schema

export const Article = z.object({
  title: z
    .string()
    .min(3, { message: "عنوان مقاله حداقل باید 3 کارکتر باشد" })
    .max(100, { message: "عنوان مقاله باید 100 کاراکتر داشته باشد" }),
  readingTime: z
    .string()
    .min(1, { message: "مدت زمان خواندن حداقل باید 1 کارکتر باشد" })
    .max(10, { message: "مدت زمان خواندن باید 10 کاراکتر داشته باشد" }),
  shortDesc: z
    .string()
    .min(5, { message: "توضیحات کوتاه حداقل باید 5 کارکتر باشد" })
    .max(1000, {
      message: "توضیحات کوتاه باید حداکثر  1000 کاراکتر داشته باشد",
    }),
  link: z
    .string()
    .min(3, { message: "لینک  حداقل باید 3 کارکتر باشد" })
    .max(30, { message: "لینک  باید 30 کاراکتر داشته باشد" }),
  tags: z
    .string({ required_error: "تگ های دسته بندی را بنویسید" })
    .min(3, { message: "تگ باید حداقل 3 کارکتر باشد" })
    .max(150, { message: "تگ باید حداکثر 150 کارکتر باشد" }),
  image: z.any().refine(
    (file) => {
      return file && file[0] instanceof File;
    },
    { message: "عکس را آپلود کنید" },
  ),
});

export type TArticle = z.infer<typeof Article>;

// contact us schema

export const ContactUs = z.object({
  name: z
    .string()
    .min(3, { message: "نام حداقل باید 3 کارکتر باشد" })
    .max(30, { message: "نام باید 30 کاراکتر داشته باشد" }),
  email: z
    .string()
    .email({ message: "فرمت ایمیل را صحیح وارد کنید" })
    .max(100, { message: "ایمیل حداکثر باید 100 کارکتر داشته باشد" }),
  department: z.string().min(1, { message: "دپارتمان مورد نظر را وارد کنید" }),
  phone: z
    .string()
    .min(11, { message: "شماره تلفن باید حداقل 11 کاراکتر داشته باشد " })
    .max(11, {
      message: "شماره تلفن باید حداکثر 11 کاراکتر داشته باشد",
    }),
  message: z
    .string()
    .min(3, { message: "متن پیغام حداقل باید 3 کاراکتر باشد" })
    .max(1000, { message: "متن پیغام حداکثر باید 1000 کارکتر باشد" }),
});

export type TContactUs = z.infer<typeof ContactUs>;

// update user schema
export const UpdateUser = z.object({
  name: z
    .string()
    .min(5, { message: "نام و نام خانوادگی حداقل باید 5 کارکتر باشد" })
    .max(30, { message: "نام و نام خانوادگی باید 30 کاراکتر داشته باشد" }),
  biography: z
    .string()
    .min(1, { message: "بیوگرافی خودتان را وارد کنید" })
    .max(1000, { message: "حداکثر تعداد کارکتر بیو 1000 کاراکتر است" }),
  province: z.string().optional(),
  birthDay: z.string().optional(),
  birthMouth: z.string().optional(),
  birthYear: z.string().optional(),
  gender: z.string().optional(),
});

export type TUpdateUser = z.infer<typeof UpdateUser>;

// update user account schema

export const UserAccount = z.object({
  email: z
    .string()
    .email({ message: "فرمت ایمیل را صحیح وارد کنید" })
    .max(100, { message: "ایمیل حداکثر باید 100 کارکتر داشته باشد" }),
  phone: z
    .string()
    .min(11, { message: "شماره تلفن باید حداقل 11 کاراکتر داشته باشد " })
    .max(11, {
      message: "شماره تلفن باید حداکثر 11 کاراکتر داشته باشد",
    }),
  favGenre: z.string().optional(),
});

export type TUserAccount = z.infer<typeof UserAccount>;

// login form schema

export const Login = z.object({
  identifier: z
    .string()
    .min(4, { message: "حداقل 4 کاراکتر الزامی است" })
    .max(100, {
      message: "حداکثر کاراکتر 100 می باشد",
    }),
  password: z
    .string()
    .min(8, { message: "رمز عبور باید حداقل 8 کاراکتر داشته باشد " })
    .max(30, {
      message: " رمز عبور باید حداکثر 30 کاراکتر داشته باشد",
    }),
});

export type TLogin = z.infer<typeof Login>;

// send content modal
export const Content = z.object({
  content: z
    .string()
    .min(4, { message: "حداقل 4 کاراکتر الزامی است" })
    .max(100, {
      message: "حداکثر کاراکتر 100 می باشد",
    }),
});

export type TContent = z.infer<typeof Content>;

export const Subscription = z.object({
  title: z
    .string()
    .min(3, { message: "حداقل 3 کاراکتر برای عنوان الزامی است" }),
  price: z.string().min(1, { message: "وارد کردن مبلغ الزامی است" }),
  discount: z.string().optional(),
  time: z.string().min(1, { message: "وارد کردن مدت زمان الزامی است" }),
});

export type TSubscription = z.infer<typeof Subscription>;

export const Collcetion = z.object({
  title: z
    .string()
    .min(3, { message: "حداقل 3 کاراکتر برای عنوان الزامی است" }),
  link: z
    .string({ required_error: "لینک مجموعه را وارد کنید" })
    .min(3, { message: "لینک مجموعه حداقل باید 3 کارکتر باشد" })
    .max(30, { message: "لینک مجموعه باید 30 کاراکتر داشته باشد" }),
  description: z
    .string({ required_error: "توضیحات مجموعه را وارد کنید" })
    .min(3, { message: "توضیحات مجموعه حداقل باید 3 کارکتر باشد" })
    .max(1000, { message: "توضیحات مجموعه باید 1000 کاراکتر داشته باشد" }),

  mainImage: z.any().refine(
    (file) => {
      return file && file[0] instanceof File;
    },
    { message: "تصویر اصلی باید آپلود شود" },
  ),

  deskBanner: z.any().refine(
    (file) => {
      return file && file[0] instanceof File;
    },
    { message: "بنر دسکتاپ باید آپلود شود" },
  ),
  mobileBanner: z.any().refine(
    (file) => {
      return file && file[0] instanceof File;
    },
    { message: "بنر موبایل باید آپلود شود" },
  ),
  logo: z.any().refine(
    (file) => {
      return file && file[0] instanceof File;
    },
    { message: "بنر موبایل باید آپلود شود" },
  ),

  type: z.string().min(1, { message: "نوع محتوا این اثر را انتخاب کنید" }),
});

export const NewTicket = z.object({
  title: z
    .string()
    .min(3, { message: "حداقل 3 کاراکتر برای عنوان الزامی است" }),

  body: z
    .string({ required_error: "متن تیکت را وارد کنید" })
    .min(3, { message: "متن تیکت حداقل باید 3 کارکتر باشد" })
    .max(1000, { message: "متن تیکت باید 1000 کاراکتر داشته باشد" }),
  priority: z
    .string()
    .min(1, { message: "لطفا اولویت تیکت خود را انتخاب کنید" }),
});

export type TNewTicket = z.infer<typeof NewTicket>;

export const passwordSchema = z
  .object({
    password: z
      .string({ message: "پسورد را وارد کنید" })
      .min(1, "رمز عبور جدید الزامی است")
      .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
      .max(32, "رمز عبور نباید بیشتر از ۳۲ کاراکتر باشد")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "رمز عبور باید شامل یک حرف بزرگ، یک حرف کوچک و عدد باشد",
      )
      .regex(
        /^[A-Za-z\d@$!%*?&]+$/,
        "رمز عبور فقط می‌تواند شامل حروف انگلیسی، اعداد و کاراکترهای @$!%*?& باشد",
      )
      .refine(
        (val) =>
          !["12345678", "password", "123456789", "qwerty123"].includes(val),
        "رمز عبور بسیار ضعیف است",
      ),

    confirmPassword: z
      .string({ message: "تکرار پسورد را وارد کنید" })
      .min(1, "تکرار رمز عبور الزامی است"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن مطابقت ندارند",
    path: ["confirmPassword"],
  });

export const emailSchema = z.object({
  email: z
    .string()
    .min(1, "ایمیل الزامی است")
    .email("ایمیل وارد شده معتبر نیست")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "فرمت ایمیل وارد شده صحیح نیست",
    ),
});

export type PasswordFormData = z.infer<typeof passwordSchema>;
export type EmailFormData = z.infer<typeof emailSchema>;

import { ITEM_PER_PAGE } from "@/public/db";
import connectToDB from "@/src/configs/db";
import SeasonModel from "@/src/models/Season";
import ArticleModel from "@/src/models/article";
import BookmarkModel from "@/src/models/bookmark";
import CategoryModel from "@/src/models/category";
import CollcetionModel from "@/src/models/collection";
import CommentModel from "@/src/models/comments";
import ContactModel from "@/src/models/contactus";
import DepartmentModel from "@/src/models/department";
import EpisodeModel from "@/src/models/episode";
import MenuModel from "@/src/models/menu";
import MovieModel from "@/src/models/movie";
import ProfileModel from "@/src/models/profile";
import StarModel from "@/src/models/stars";
import SubscriptionModel from "@/src/models/subscription";
import TicketModel from "@/src/models/ticket";
import UserModel from "@/src/models/user";
import OrderModel from "@/src/models/order";
import { authUser, checkIsAdmin } from "@/src/utils/serverHelper";
import { isValidObjectId } from "mongoose";
import { IWishList, TArticle } from "../types";
import { cookies } from "next/headers";

// get all site stat

export const getAllStats = async (startDate: string) => {
  try {
    connectToDB();
    let filterByDate = {};

    // تبدیل startDate به Date
    if (startDate) {
      const start = new Date(startDate);
      const end = new Date(); // تاریخ امروز
      filterByDate = {
        createdAt: {
          $gte: start,
          $lte: end,
        },
      };
    }

    const usersCount = await UserModel.countDocuments(filterByDate);
    const moviesCount = await MovieModel.countDocuments(filterByDate);

    const orders = await OrderModel.find(filterByDate);
    const sumationOfOrder = orders.reduce(
      (curr, num) => curr + num.totalPrice,
      0
    );

    const latestUsers = await UserModel.find(
      filterByDate,
      "name profiles createdAt"
    )
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("profiles", "image name");

    return {
      usersCount,
      moviesCount,
      latestUsers,
      subscriptionCount: orders.length,
      sumationOfOrder,
      orders,
    };
  } catch (error) {
    return error;
  }
};

export const getAllCategories = async (page: number, search: string) => {
  try {
    connectToDB();
    const isAdmin = await checkIsAdmin();
    if (!isAdmin) {
      return {
        message: "این بخش فقط برای کاربرانی با نقش ادمین مجاز است",
      };
    }
    const regex = new RegExp(search, "i");
    const categories = await CategoryModel.find({
      parent: null,
      title: { $regex: regex },
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    const counts = await CategoryModel.countDocuments({ parrent: null });
    return { categories, counts };
  } catch (error) {
    return error;
  }
};

export const getSubCategory = async (
  id: string,
  page: number,
  search: string
) => {
  try {
    connectToDB();
    const regex = new RegExp(search, "i");

    const parrent = await CategoryModel.findOne({ _id: id }, "title");

    const subCategories = await CategoryModel.find({
      parrent: id,
      title: { $regex: regex },
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .populate("parrent", "title");

    const counts = await CategoryModel.countDocuments({ parrent: id });
    return { subCategories, counts, parrent };
  } catch (error) {
    return error;
  }
};

// get all of the categories with out any pagination and search
export const getCategories = async () => {
  try {
    connectToDB();

    const categories = await CategoryModel.find({ parrent: null });

    return categories;
  } catch (error) {
    return error;
  }
};

export const getAllUsers = async (page: number, search: string) => {
  try {
    connectToDB();
    const isAdmin = await checkIsAdmin();
    if (!isAdmin) {
      return {
        message: "این بخش فقط برای کاربرانی با نقش ادمین مجاز است",
      };
    }

    const regex = new RegExp(search, "i");
    const users = await UserModel.find({
      $or: [{ name: { $regex: regex } }, { username: { $regex: regex } }],
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    const counts = await UserModel.countDocuments();
    return {
      users,
      counts,
    };
  } catch (error) {
    return error;
  }
};

export const getAllStars = async (page: number, search: string) => {
  try {
    connectToDB();
    const regex = new RegExp(search, "i");
    const stars = await StarModel.find({
      name: { $regex: regex },
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    const counts = await StarModel.countDocuments();
    return {
      stars,
      counts,
    };
  } catch (error) {
    return error;
  }
};

export const getAllSubcategories = async () => {
  try {
    connectToDB();
    const allCategoeies = await CategoryModel.find({});

    return allCategoeies.filter((category) => category.parrent !== null);
  } catch (error) {
    return error;
  }
};

// get all of the stars without pagination and search
export const getStars = async () => {
  try {
    connectToDB();
    const stars = await StarModel.find({});
    return stars;
  } catch (error) {
    return error;
  }
};

// use this function for get specific star

export const getStar = async (link: string) => {
  try {
    connectToDB();
    const star = await StarModel.findOne({ link });
    return star;
  } catch (error) {
    return error;
  }
};

export const getActor = async (id: string) => {
  try {
    await connectToDB();
    const star = await StarModel.findOne({ _id: id });
    return star;
  } catch (error) {
    return error;
  }
};

// get all menus with pagination and search
export const getAllMenus = async (page: number, search: string) => {
  try {
    connectToDB();
    const regex = new RegExp(search, "i");
    const allMenus = await MenuModel.find({
      title: { $regex: regex },
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .populate("parrent", "title");

    const counts = await MenuModel.countDocuments();
    return {
      allMenus,
      counts,
    };
  } catch (error) {
    return error;
  }
};

// get all contacts with pagination and search
export const getAllContacts = async (page: number, search: string) => {
  try {
    connectToDB();
    const regex = new RegExp(search, "i");
    const allContacts = await ContactModel.find({
      $or: [{ name: { $regex: regex } }, { phone: { $regex: regex } }],
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .populate("department", "title");

    const counts = await ContactModel.countDocuments();

    return {
      allContacts,
      counts,
    };
  } catch (error) {
    return error;
  }
};

// get all movie with pagination and search

export const getAllMovies = async (page: number, search: string) => {
  try {
    connectToDB();
    const regex = new RegExp(search, "i");
    const allMovies = await MovieModel.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .populate("category creator", "title parrent name");

    const counts = await MovieModel.countDocuments();
    return {
      allMovies,
      counts,
    };
  } catch (error) {
    return error;
  }
};

// get sliders for home page

export const getAllSlidersMovies = async (type?: string) => {
  try {
    let filterObj = {};
    if (type) {
      filterObj = { type };
    }
    connectToDB();
    return await MovieModel.find({ isSlider: true, ...filterObj }).populate(
      "actors",
      "name link"
    );
  } catch (error) {
    return error;
  }
};

// get specific movie

export const getMovie = async (link: any) => {
  try {
    connectToDB();
    const movie = await MovieModel.findOne({ link })
      .populate("category actors", "link image title name")
      .populate({
        path: "comments",
        match: { isAccept: true },
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .lean();

    return movie;
  } catch (error) {
    return error;
  }
};

// get related movies

export const getRealedMovies = async (
  category: string,
  id: string,
  type?: string
) => {
  try {
    let filterObj = {};
    if (type) {
      filterObj = { contentType: type };
    }
    connectToDB();
    const relatedMovies = await MovieModel.find({
      category,
      _id: { $ne: id },
      ...filterObj,
    }).populate("actors", "link name");

    return relatedMovies;
  } catch (error) {
    return error;
  }
};

// get star movies

export const getStarMovies = async (starId: string) => {
  try {
    connectToDB();
    const movies = await MovieModel.find({ actors: { $in: starId } }).populate(
      "actors",
      "link name"
    );

    return movies;
  } catch (error) {
    return error;
  }
};

// get all movies

export const getMovies = async (
  contentType: "adult" | "kid",
  categoryId?: string,
  type?: "film" | "series"
) => {
  try {
    connectToDB();

    let filterObj = {};

    if (contentType === "kid") {
      filterObj = { contentType };
    }

    if (type) {
      filterObj = { ...filterObj, type };
    }

    let allMovies = null;
    if (!categoryId) {
      allMovies = await MovieModel.find(filterObj).populate(
        "category actors",
        "title link parrent link name"
      );
    } else {
      const movies = await MovieModel.find(filterObj)
        .populate("category actors", "title link parrent link name")
        .populate({
          path: "category",
          populate: {
            path: "parrent",
          },
        });

      allMovies = movies.filter(
        (movie) => String(movie.category.parrent._id) === categoryId
      );
    }

    const categorizeFilms = (films: any) => {
      const categorized: any = {};

      films.forEach((film: any) => {
        const categoryTitle = film.category.title;

        // اگر دسته‌بندی وجود ندارد، یک آرایه جدید ایجاد کن
        if (!categorized[categoryTitle]) {
          categorized[categoryTitle] = [];
        }

        // فیلم را به دسته‌بندی مربوطه اضافه کن
        categorized[categoryTitle].push(film);
      });

      return categorized;
    };

    // استفاده از تابع
    const result = categorizeFilms(allMovies);

    return result;
  } catch (error) {
    return error;
  }
};

// get all movies with out any pagination

export const getAllMoviesWithOutPagination = async () => {
  try {
    connectToDB();
    return await MovieModel.find({});
  } catch (error) {
    return error;
  }
};

// get all comments with pagination

export const getAllComments = async (page: string) => {
  try {
    connectToDB();

    if (!checkIsAdmin()) {
      return {
        message: "شما به این روت دسترسی ندارید",
        status: 401,
      };
    }

    const comments = await CommentModel.find({})
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (+page - 1))
      .populate("movie user", "title link name")
      .sort({ createdAt: -1 });

    const counts = await CommentModel.countDocuments();

    return {
      comments,
      counts,
    };
  } catch (error) {
    return error;
  }
};

// get all series

export const getAllSeries = async () => {
  try {
    connectToDB();
    const series = await MovieModel.find({ type: "series" });

    return series;
  } catch (error) {
    return error;
  }
};

// get all seasons of series

export const getSpecificSeasons = async (id: string) => {
  try {
    connectToDB();
    const seasons = await SeasonModel.find({ series: id })
      .populate("episodes")
      .sort({ seasonNumber: 1 });

    return seasons;
  } catch (error) {
    return error;
  }
};

// get all articles
export const getAllArticles = async (page: number, search: string) => {
  try {
    connectToDB();
    const regex = new RegExp(search, "i");
    const articles = await ArticleModel.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .populate("creator movie", "name title link");

    const counts = await ArticleModel.countDocuments();
    return {
      articles,
      counts,
    };
  } catch (error) {
    return error;
  }
};

// get movie / series article

export const getRelatedArticleToMovie = async (id: string) => {
  try {
    connectToDB();
    const article = await ArticleModel.findOne({ movie: id });

    return article;
  } catch (error) {
    return error;
  }
};

// get all articles without pagination
export const getArticles = async (): Promise<TArticle[]> => {
  try {
    connectToDB();
    const articles = await ArticleModel.find({ isAccept: true }).populate(
      "creator movie",
      "name title link"
    );

    return articles;
  } catch (error) {
    return [];
  }
};

// get specific article

export const getArticle = async (link: string) => {
  try {
    connectToDB();
    const article = await ArticleModel.findOne({ link }).populate(
      "creator movie",
      "name title link mainImage type link"
    );

    return article;
  } catch (error) {
    return error;
  }
};

// search between movies and some filters based on movie detail

export const searchMovies = async (
  search: string,
  types: string[],
  categoryNames: string[],
  voices: string[],
  countries: string[],
  order: string,
  range: { from: String; to: String }
) => {
  try {
    await connectToDB();

    let filter = {};

    if (categoryNames?.length) {
      const categories = await CategoryModel.find({
        title: { $in: categoryNames },
      });

      let categoryIds = categories.map((category) => category._id);
      filter = {
        ...filter,
        category: { $in: categoryIds },
      };
    }

    if (voices?.length) {
      filter = {
        ...filter,
        language: { $in: voices },
      };
    }

    if (types?.length) {
      filter = {
        ...filter,
        type: { $in: types },
      };
    }

    if (countries?.length) {
      filter = {
        ...filter,
        country: {
          $in: typeof countries === "string" ? Array(countries) : countries,
        },
      };
    }

    if (range.from && range.to) {
      filter = {
        ...filter,
        showTime: { $gte: range.from, $lte: range.to },
      };
    }

    const [feild, direction] = order ? order.split("-") : [];
    const sort = direction === "asc" ? 1 : -1;

    const regex = new RegExp(search, "i");
    const movies = await MovieModel.find({
      $or: [
        { title: { $regex: regex } },
        { longDesc: { $regex: regex } },
        { shortDesc: { $regex: regex } },
      ],
      ...filter,
    }).sort(order !== "default" ? { [feild]: sort } : {});

    return movies;
  } catch (error) {
    console.error("Error in searchMovies:", error);
    return error;
  }
};

// get all episodes

export const getAllEpisodes = async (
  page: number,
  search: string,
  id: string
) => {
  try {
    connectToDB();
    const regex = new RegExp(search, "i");
    const mainMovie = await MovieModel.findOne({ _id: id });
    const episodes = await EpisodeModel.find({
      title: { $regex: regex },
      series: id,
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .sort({ createdAt: -1 })
      .populate("season");

    const counts = await EpisodeModel.countDocuments({ series: id });
    return {
      episodes,
      counts,
      name: mainMovie.title,
    };
  } catch (error) {
    return error;
  }
};

// get all subscription for admin page

export const getAllSubscription = async (page: number, search: string) => {
  try {
    connectToDB();
    const regex = new RegExp(search, "i");
    const subscriptions = await SubscriptionModel.find({
      title: { $regex: regex },
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .populate("creator", "name username");

    const counts = await SubscriptionModel.countDocuments({});

    return {
      subscriptions,
      counts,
    };
  } catch (error) {
    return error;
  }
};

// get all subscriptions with out any pagination and search

export const getSubscriptions = async () => {
  try {
    connectToDB();
    const subscriptions = await SubscriptionModel.find({}).populate(
      "creator",
      "name username"
    );

    return subscriptions;
  } catch (error) {
    return error;
  }
};

export const getSubscription = async (id: string) => {
  try {
    connectToDB();

    if (!isValidObjectId(id)) {
      return false;
    }
    const subscription = await SubscriptionModel.findOne({ _id: id });

    return subscription;
  } catch (error) {
    return error;
  }
};

export const checkUserSubscription = async () => {
  try {
    const user = await authUser();

    if (!user) {
      return { message: "کاربر مورد نظر یافت نشد" };
    }

    const now = new Date();

    if (!user.subscriptionEnd || new Date(user.subscriptionEnd) < now) {
      return { hasSubscription: false };
    }

    const remainingTime =
      new Date(user.subscriptionEnd).getTime() - now.getTime();
    const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));

    return {
      hasSubscription: true,
      remainingDays,
    };
  } catch (error) {
    return error;
  }
};

// get all collection in p-admin with pagination and search

export const getAllCollcetions = async (page: number, search: string) => {
  try {
    connectToDB();
    const regex = new RegExp(search, "i");

    const collections = await CollcetionModel.find({
      title: { $regex: regex },
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    const counts = await CollcetionModel.countDocuments();

    return {
      collections,
      counts,
    };
  } catch (error) {
    return error;
  }
};

// get specific collcetion

export const getCollection = async (link: string) => {
  try {
    connectToDB();
    const collection = await CollcetionModel.findOne({ link }).populate(
      "movies",
      "link title mainImage type showTime contentType"
    );

    return collection;
  } catch (error) {
    return error;
  }
};

export const getAllCollectionSlider = async (type: "adult" | "kid") => {
  try {
    connectToDB();
    let collections = null;
    if (type === "adult") {
      collections = await CollcetionModel.find({ type: "adult" });
    } else {
      collections = await CollcetionModel.find({ type: "kid" });
    }
    return collections;
  } catch (error) {
    return error;
  }
};

export const getUserBookmarks = async () => {
  try {
    connectToDB();
    const user = await authUser();
    const bookmarks = await BookmarkModel.find({ user: user._id }).populate(
      "movie",
      "link title mainImage type showTime contentType"
    );

    return bookmarks;
  } catch (error) {
    return error;
  }
};

export const getAllUserLikesMovie = async () => {
  try {
    connectToDB();
    const user = await authUser();

    const likesMovie = await MovieModel.find({
      liked: { $in: user._id },
    });
    return likesMovie;
  } catch (error) {
    return error;
  }
};

// user-panel

export const getUserPanelStats = async (userId: string) => {
  try {
    connectToDB();
    const subscription = await checkUserSubscription();
    const commentsCount = await CommentModel.countDocuments({ user: userId });
    const wishListCount = await MovieModel.countDocuments({
      liked: { $in: userId },
    });
    const ticketsCount = await TicketModel.countDocuments({
      isAnswer: false,
      user: userId,
    });

    return {
      subscription,
      commentsCount,
      wishListCount,
      ticketsCount,
    };
  } catch (error) {
    return error;
  }
};

export const getLikesMovies = async (page?: number): Promise<IWishList> => {
  try {
    connectToDB();
    const user = await authUser();
    const movies = await MovieModel.find(
      { liked: { $in: user._id as string } },
      "title category createdAt link showTime type mainImage range IMDB"
    )
      .populate("category", "title")
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page || 1 - 1))
      .sort({ createdAt: -1 });

    const count = await MovieModel.countDocuments({
      liked: { $in: user._id as string },
    });

    return {
      count,
      movies,
    };
  } catch (error) {
    return {
      count: 0,
      movies: [],
    };
  }
};

export const getAllUserComments = async (page: number) => {
  try {
    connectToDB();
    const user = await authUser();
    const comments = await CommentModel.find({ user: user._id })
      .populate("movie user", "title link name score")
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .sort({ createdAt: -1 });

    const count = await CommentModel.countDocuments({ user: user._id });

    return {
      count,
      comments,
    };
  } catch (error) {
    return error;
  }
};

export const getAllDepartments = async () => {
  try {
    const departments = await DepartmentModel.find({});
    return departments;
  } catch (error) {
    return error;
  }
};

export const getLastUserTickets = async () => {
  try {
    const user = await authUser();
    const tickets = await TicketModel.find({ isAnswer: false, user: user._id })
      .sort({ _id: -1 })
      .populate("department subDepartment user", "name title")
      .lean();

    return tickets;
  } catch (error) {
    return error;
  }
};

export const getAllUserTicket = async (page: number) => {
  try {
    const user = await authUser();
    const tickets = await TicketModel.find({ isAnswer: false, user: user._id })
      .sort({ _id: -1 })
      .populate("department subDepartment user", "name title")
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .sort({ createdAt: -1 })
      .lean();

    const ticketsCount = await TicketModel.countDocuments({
      isAnswer: false,
      user: user._id,
    });

    const answeredCount = await TicketModel.countDocuments({
      status: "answered",
    });
    const pendingCount = await TicketModel.countDocuments({
      status: "pending",
    });
    const closeCount = await TicketModel.countDocuments({
      isOpen: false,
    });

    return {
      tickets,
      ticketsCount,
      answeredCount,
      pendingCount,
      closeCount,
    };
  } catch (error) {
    return error;
  }
};

export const getSpecificTicketInfo = async (ticketId: string) => {
  try {
    const ticket = await TicketModel.findOne({ _id: ticketId })
      .populate("user", "name role")
      .lean();
    const answerTicket = await TicketModel.find({ replyTo: ticketId })
      .populate("user", "name role")
      .lean();

    return {
      ticketInfo: ticket,
      tickets: answerTicket,
    };
  } catch (error) {
    return error;
  }
};

export const getAllUserOrders = async (page: number) => {
  try {
    connectToDB();
    const user = await authUser();
    const orders = await OrderModel.find({ user: user._id })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .sort({ createdAt: -1 });

    const orderCount = await OrderModel.countDocuments({ user: user._id });

    return {
      orders,
      orderCount,
    };
  } catch (error) {
    return error;
  }
};

export const getAllOrders = async () => {
  try {
    connectToDB();
    const orders = await OrderModel.find({ status: "pay" });

    return orders;
  } catch (error) {
    return error;
  }
};

export const getAllTickets = async (page: number) => {
  try {
    connectToDB();
    const tickets = await TicketModel.find({ isAnswer: false })
      .populate("user department subDepartment", "name username title")
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .sort({ createdAt: -1 });

    const ticketsCount = await TicketModel.countDocuments({ isAnswer: false });

    return {
      tickets,
      ticketsCount,
    };
  } catch (error) {
    return error;
  }
};

// profiles

export const getSpecificProfile = async (id: string) => {
  try {
    connectToDB();

    const profile = await ProfileModel.findOne({ _id: id }).populate(
      "limitsMovies",
      "title link"
    );

    return profile;
  } catch (error) {
    return error;
  }
};

export const checkUserProfile = async () => {
  try {
    connectToDB();

    const user = await authUser();

    if (!user) {
      return {
        message: "لطفا لاگین کنید",
        status: 401,
      };
    }

    const profileId = cookies().get("profile")?.value;

    const currentProfile = await ProfileModel.findOne({ _id: profileId });

    return currentProfile || user.profiles[0]._id;
  } catch (error) {
    return error;
  }
};

export const getMoviesByCategory = async (categoryId: string) => {
  try {
    const movies = await MovieModel.find({ isSlider: true })
      .populate("actors", "name link")
      .populate({
        path: "category",
        populate: {
          path: "parrent",
        },
      });

    const allMovies = movies.filter(
      (movie) => String(movie.category.parrent._id) === categoryId
    );

    return allMovies;
  } catch (error) {
    return error;
  }
};

export const getCategoryInfo = async (categoryId: string) => {
  try {
    await connectToDB();
    const category = await CategoryModel.findOne({ _id: categoryId });

    return category;
  } catch (error) {
    return error;
  }
};

export const getUserInfo = async (id: string) => {
  try {
    const user = await UserModel.findOne(
      { _id: id },
      "name username phone email biography"
    );
    return user;
  } catch (error) {
    return error;
  }
};

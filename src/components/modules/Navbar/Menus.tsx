import Menu from "./Menu";

function Menus({ menus, user, category }) {
  return menus
    ?.filter((menu) => {
      if (menu.title === "پنل مدیریت" && user?.role !== "ADMIN") {
        return false;
      }
      return true;
    })
    ?.map((menu) => <Menu category={category} menu={menu} key={menu._id} />);
}

export default Menus;

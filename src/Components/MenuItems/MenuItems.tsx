import { Menu } from "antd";
import { Link } from "react-router-dom";

export const menuItems = (
  <>
    <Menu.Item key="contact">تماس با ما</Menu.Item>
    <Menu.Item key="quations">سوالات متداول</Menu.Item>
    <Menu.Item key="supuert">پشتیبانی</Menu.Item>
    <Menu.Item key="contracts">
      <Link to={"/rulespage"}>قوانین و مقررات</Link>
    </Menu.Item>
    <Menu.Item key="dependency">تعرفه</Menu.Item>
    <Menu.Item key="home">
      <Link to={"/"}>خانه</Link>
    </Menu.Item>
  </>
);

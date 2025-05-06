import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home/Home";
import AddAd from "./Pages/AddAd/AddAd";
import {
  Layout,
  Menu,
  Input,
  Button,
  Space,
  Typography,
  Drawer,
  Image,
} from "antd";
import AdsPage from "./Pages/AdsPage/AdsPage";
import SignUp from "./Pages/SignUp/SignUp";
import {
  UserOutlined,
  PlusOutlined,
  NotificationOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import Footer from "./Components/Footer/Footer";
import Dashboard from "./Pages/Dashboard/Dashboard";

const { Header } = Layout;
const {} = Input;
const {} = Typography;

const App: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const isMobile = window.innerWidth <= 768;

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const menuItems = (
    <>
      <Menu.Item key="quations">سوالات متداول</Menu.Item>
      <Menu.Item key="contact">تماس با ما</Menu.Item>
      <Menu.Item key="contracts">قوانین و مقررات</Menu.Item>
      <Menu.Item key="supuert">پشتیبانی</Menu.Item>
      <Menu.Item key="home">
        <Link to={"/"}>خانه</Link>
      </Menu.Item>
    </>
  );

  return (
    <Layout style={{ background: "none" }}>
      <Header
        style={{
          background: "#fff",
          padding: "0 20px",
          position: "fixed",
          width: "100%",
          marginTop: "-1vh",
          zIndex: 10000,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Space size={isMobile ? "small" : "large"} wrap>
          <Link to="/add">
            <Button type="primary" icon={<PlusOutlined />}>
              {/* {!isMobile && "ثبت آگهی"} */}
              ثبت آگهی
            </Button>
          </Link>
          <Link to="/signup">
            <Button icon={<UserOutlined />}>
              {!isMobile && "ورود / ثبت نام"}
            </Button>
          </Link>
          <Button icon={<NotificationOutlined />}>
            {!isMobile && "اعلان ها"}
          </Button>
        </Space>
        <Space
          style={{
            gap: isMobile ? "12px" : "24px",
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            padding: "0 16px",
          }}
        >
          {isMobile ? (
            <>
              <Button icon={<MenuOutlined />} onClick={toggleMenu} />
              <Drawer
                title="منو"
                placement="right"
                onClose={toggleMenu}
                visible={menuVisible}
              >
                <Menu
                  mode="vertical"
                  style={{ border: "none", textAlign: "right" }}
                >
                  {menuItems}
                </Menu>
              </Drawer>
            </>
          ) : (
            <Menu
              mode="horizontal"
              style={{ border: "none", background: "transparent" }}
            >
              {menuItems}
            </Menu>
          )}
          <Image
            src={`${process.env.PUBLIC_URL}favicon.png`}
            preview={false}
            alt="Divar"
            style={{
              height: isMobile ? "30px" : "40px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={(e) => (document.location = "/")}
          />
        </Space>
      </Header>
      <Layout.Content
        style={{
          padding: isMobile ? "16px 20px" : "24px 50px",
          marginTop: 64,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddAd />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/adspage/:id" element={<AdsPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout.Content>
      <Footer />
    </Layout>
  );
};

export default App;

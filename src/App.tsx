import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Space,
  Typography,
  Drawer,
  Image,
  Avatar,
} from "antd";
import "./App.css";
import { UserOutlined, PlusOutlined, MenuOutlined } from "@ant-design/icons";
import Footer from "./Components/Footer/Footer";
import Notifications from "./Components/Notifications/Notifications";
import { menuItems } from "./Components/MenuItems/MenuItems";
import RoutesConfig from "./Config/Routes/RoutesConfig";

const { Header } = Layout;
const { Text } = Typography;

const App: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [user, setUser] = useState<{ username: string; token: string } | null>(
    null
  );
  const isMobile = window.innerWidth <= 768;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const username = localStorage.getItem("username");
    if (token && username) {
      setUser({ username, token });
    }
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        transition: "all 0.3s ease",
        backgroundColor: "white",
      }}
    >
      <Header
        className="headerAppBar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          transition: "all 0.3s ease",
        }}
      >
        <Space size={isMobile ? "small" : "large"} wrap>
          <Link to="/add">
            <Button type="primary" icon={<PlusOutlined />}>
              ثبت آگهی
            </Button>
          </Link>
          {user ? (
            <Button
              icon={<Avatar size={"small"} icon={<UserOutlined />} />}
              onClick={handleProfileClick}
              style={{ display: "flex", alignItems: "center" }}
            >
              {!isMobile && (
                <Text style={{ marginLeft: 8 }}>{user.username && "علی کریمی"}</Text>
              )}
            </Button>
          ) : (
            <Link to="/signup">
              <Button icon={<UserOutlined />}>
                {!isMobile && "ورود / ثبت نام"}
              </Button>
            </Link>
          )}
          <Notifications />
        </Space>

        {isMobile ? (
          <>
            <Button icon={<MenuOutlined />} onClick={toggleMenu} />
            <Drawer
              title="منو"
              placement="right"
              onClose={toggleMenu}
              visible={menuVisible}
              width={"80%"}
            >
              <Menu
                mode="vertical"
                style={{
                  border: "none",
                  textAlign: "right",
                }}
                selectedKeys={[window.location.pathname]}
              >
                {menuItems}
              </Menu>
            </Drawer>
          </>
        ) : (
          <Menu
            mode="horizontal"
            style={{
              border: "none",
              background: "transparent",
            }}
          >
            {menuItems}
          </Menu>
        )}

        <Space style={{ gap: "20px" }}>
          <Typography style={{ color: "#414eff" }}>آگیتو</Typography>
          <Image
            src={`${process.env.PUBLIC_URL}favicon.png`}
            preview={false}
            alt="Divar"
            style={{
              height: isMobile ? "30px" : "40px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          />
        </Space>
      </Header>
      <Layout.Content
        style={{
          padding: isMobile ? "16px 20px" : "24px 50px",
          marginTop: 64,
        }}
      >
        <RoutesConfig user={user} setUser={setUser} />
      </Layout.Content>
      <Footer />
    </Layout>
  );
};

export default App;

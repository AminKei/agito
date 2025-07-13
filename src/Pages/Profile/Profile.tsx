import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuProps,
  Layout,
  Drawer,
  Button,
  Card,
  Typography,
  List,
  Empty,
  Spin,
  Input,
  Row,
  Col,
} from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  WalletOutlined,
  MenuOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Ad } from "../../Models/AdModel";
import { formatPrice } from "../../Hooks/formatPrice";
import { Link, useNavigate } from "react-router-dom";
import { ConfigProvider } from "antd";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

type MenuItem = Required<MenuProps>["items"][number];

interface ProfileProps {
  user: { username: string; token: string } | null;
  setUser: (user: { username: string; token: string } | null) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, setUser }) => {
  const [current, setCurrent] = useState("profile");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Redirect to signup if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/signup");
    }
  }, [user, navigate]);

  // Menu items
  const items: MenuItem[] = [
    {
      label: "اطلاعات کاربری",
      key: "profile",
      icon: <UserOutlined />,
    },
    {
      label: "آگهی‌های من",
      key: "ads",
      icon: <FileTextOutlined />,
    },
    {
      label: "کیف پول",
      key: "wallet",
      icon: <WalletOutlined />,
    },
    {
      label: "خروج",
      key: "logout",
      icon: <LogoutOutlined />,
    },
  ];

  // Handle menu click
  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      handleLogout();
    } else {
      setCurrent(e.key);
      if (isMobile) {
        setDrawerVisible(false);
      }
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setUser(null);
    navigate("/");
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load ads from localStorage
  useEffect(() => {
    try {
      setLoading(true);
      const storedAds = localStorage.getItem("ads");
      if (storedAds) {
        setAds(JSON.parse(storedAds));
      }
    } catch (error) {
      console.error("Error loading ads:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Render profile content
  const renderProfileContent = () => (
    <Card title="اطلاعات کاربری" bordered={false}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Text strong>نام کاربری:</Text>{" "}
          <Text>{(user?.username && "علی کریمی") || "نامشخص"}</Text>
        </Col>
        <Col xs={24} md={12}>
          <Text strong>شماره تماس:</Text>{" "}
          <Text>{user?.username ? `0${user.username}` : "نامشخص"}</Text>
        </Col>
        <Col xs={24} md={12}>
          <Text strong>ایمیل:</Text> <Text>ثبت نشده</Text>
        </Col>
        <Col xs={24} md={12}>
          <Text strong>شهر:</Text> <Text>ثبت نشده</Text>
        </Col>
      </Row>
      <Button type="primary" style={{ marginTop: 16 }}>
        ویرایش اطلاعات
      </Button>
    </Card>
  );

  // Render ads content
  const renderAdsContent = () => (
    <Card title="آگهی‌های من" bordered={false}>
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
          <p style={{ marginTop: "10px" }}>در حال بارگذاری آگهی‌ها...</p>
        </div>
      ) : ads.length > 0 ? (
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 3 }}
          dataSource={ads}
          renderItem={(ad: Ad) => (
            <List.Item>
              <Card
                hoverable
                cover={
                  ad.image && ad.image.length > 0 ? (
                    <img
                      alt={ad.title}
                      src={ad.image[0]}
                      style={{ height: 150, objectFit: "cover" }}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtEY1E5uy1bU9au2oF74LoFPdthQlmZ5YIQ&s";
                      }}
                    />
                  ) : (
                    <Text type="secondary">بدون تصویر</Text>
                  )
                }
              >
                <Card.Meta
                  title={
                    <Link to={`/ads/${ad.id}`}>
                      {ad.title}{" "}
                      {ad.urgent && (
                        <span style={{ color: "red" }}>(فوری)</span>
                      )}
                      {ad.negotiable && (
                        <span style={{ color: "blue" }}>(قابل مذاکره)</span>
                      )}
                    </Link>
                  }
                  description={
                    <>
                      <Text>{formatPrice(ad.price)}</Text>
                      <br />
                      <Text type="secondary">{ad.city}</Text>
                    </>
                  }
                />
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <Empty description="هیچ آگهی‌ای ثبت نشده است" />
      )}
    </Card>
  );

  // Render wallet Classic
  const renderWalletContent = () => (
    <Card title="کیف پول" bordered={false}>
      <Text strong>موجودی فعلی:</Text> <Text>500,000 تومان</Text>
      <br />
      <Input
        placeholder="مبلغ شارژ (تومان)"
        style={{ width: 200, marginTop: 16 }}
        type="number"
      />
      <Button type="primary" style={{ marginTop: 16, marginRight: 8 }}>
        شارژ کیف پول
      </Button>
    </Card>
  );

  // Select content based on menu selection
  const renderContent = () => {
    switch (current) {
      case "profile":
        return renderProfileContent();
      case "ads":
        return renderAdsContent();
      case "wallet":
        return renderWalletContent();
      default:
        return renderProfileContent();
    }
  };

  return (
    <ConfigProvider direction="rtl">
      <Layout style={{ minHeight: "100vh", backgroundColor: "white" }}>
        {isMobile ? (
          <>
            <Button
              type="primary"
              icon={<MenuOutlined />}
              onClick={() => setDrawerVisible(true)}
              style={{ position: "fixed", top: 16, right: 16, zIndex: 1000 }}
            >
              منو
            </Button>
            <Drawer
              title="پروفایل"
              placement="right"
              onClose={() => setDrawerVisible(false)}
              open={drawerVisible}
              width="80%"
            >
              <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="vertical"
                items={items}
                style={{ width: "100%" }}
              />
            </Drawer>
          </>
        ) : (
          <Sider
            width={300}
            style={{
              background: "none",
              padding: "30px",
              position: "fixed",
              right: 0,
              top: "70px",
              minHeight: "100%",
            }}
          >
            <Title level={3} style={{ textAlign: "right", marginBottom: 24 }}>
              پروفایل
            </Title>
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode="vertical"
              items={items}
              style={{ width: "100%" }}
            />
          </Sider>
        )}
        <Content
          style={{
            padding: isMobile ? "16px" : "30px 350px 30px 30px",
            background: "#fff",
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default Profile;

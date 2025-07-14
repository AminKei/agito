import React, { useState, useEffect } from "react";
import { Layout, Modal, ConfigProvider, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { Ad } from "../../Models/AdModel";
import ProfileContent from "./ProfileContent";
import AdsTabContent from "../../Components/ProfileContents/AdsTabContent";
import MenuComponent from "./MenuComponent";

const { Sider, Content } = Layout;

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
  const [activeAdsTab, setActiveAdsTab] = useState("published");
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const navigate = useNavigate();

  // Redirect to signup if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/signup");
    }
  }, [user, navigate]);

  // Handle menu click
  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      setLogoutModalVisible(true);
    } else {
      setCurrent(e.key);
    }
  };

  // Handle logout confirmation
  const handleLogoutConfirm = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setUser(null);
    setLogoutModalVisible(false);
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
        const parsedAds = JSON.parse(storedAds);
        if (Array.isArray(parsedAds) && parsedAds.every((ad) => ad.id && ad.title)) {
          setAds(parsedAds);
        } else {
          console.warn("داده‌های ذخیره‌شده نامعتبر هستند.");
        }
      } else {
        setAds([
          {
            id: "ad001",
            title: "لپ‌تاپ Dell XPS 13",
            description: "لپ‌تاپ نو با مشخصات i7 و 16GB رم.",
            category: "electronics",
            price: 35000000,
            condition: "like-new",
            city: "tehran",
            image: ["https://www.digikala.com/product/dkp-1134567/"],
            date: "2025-07-10",
            address: "تهران، خیابان ولیعصر",
            phone: "09123456789",
            location: { lat: 35.6892, lng: 51.389 },
            urgent: false,
            negotiable: true,
          },
          {
            id: "ad002",
            title: "خودرو پراید 131",
            description: "پراید تمیز و کم‌کارکرد.",
            category: "vehicles",
            price: 250000000,
            condition: "used",
            city: "mashhad",
            image: ["https://www.bama.ir/car/saipa-pride-131"],
            date: "2025-07-09",
            address: "مشهد، بلوار وکیل‌آباد",
            phone: "09151234567",
            location: { lat: 36.2952, lng: 59.6062 },
            urgent: true,
            negotiable: true,
          },
        ]);
      }
    } catch (error) {
      console.error("Error loading ads:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ConfigProvider direction="rtl">
      <Layout style={{ minHeight: "100vh", backgroundColor: "white" }}>
        <Sider
          width={isMobile ? 0 : 300}
          style={{
            background: "none",
            padding: "30px",
            position: "fixed",
            right: 0,
            top: "70px",
            minHeight: "100%",
            display: isMobile ? "none" : "block",
          }}
        >
          <MenuComponent
            current={current}
            onClick={onClick}
            isMobile={isMobile}
            drawerVisible={drawerVisible}
            setDrawerVisible={setDrawerVisible}
          />
        </Sider>
        {isMobile && (
          <MenuComponent
            current={current}
            onClick={onClick}
            isMobile={isMobile}
            drawerVisible={drawerVisible}
            setDrawerVisible={setDrawerVisible}
          />
        )}
        <Content
          style={{
            padding: isMobile ? "16px" : "30px 350px 30px 30px",
            background: "#ffffff",
            marginTop:'5vh'
          }}
        >
          {current === "ads" ? (
            <AdsTabContent
              ads={ads}
              loading={loading}
              activeAdsTab={activeAdsTab}
              setActiveAdsTab={setActiveAdsTab}
            />
          ) : (
            <ProfileContent current={current} user={user} />
          )}
        </Content>
      </Layout>
      <Modal
        title="تأیید خروج"
        open={logoutModalVisible}
        onOk={handleLogoutConfirm}
        onCancel={() => setLogoutModalVisible(false)}
        okText="بله"
        cancelText="خیر"
      >
        <p>آیا مطمئن هستید که می‌خواهید خارج شوید؟</p>
      </Modal>
    </ConfigProvider>
  );
};

export default Profile;
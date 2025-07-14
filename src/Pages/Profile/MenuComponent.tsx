import React from "react";
import { Menu, MenuProps, Drawer, Button, Typography } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  WalletOutlined,
  LogoutOutlined,
  SettingOutlined,
  MessageOutlined,
  HeartOutlined,
  QuestionCircleOutlined,
  BellOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

type MenuItem = Required<MenuProps>["items"][number];

interface MenuComponentProps {
  current: string;
  onClick: MenuProps["onClick"];
  isMobile: boolean;
  drawerVisible: boolean;
  setDrawerVisible: (visible: boolean) => void;
}

const MenuComponent: React.FC<MenuComponentProps> = ({
  current,
  onClick,
  isMobile,
  drawerVisible,
  setDrawerVisible,
}) => {
  const items: MenuItem[] = [
    { label: "اطلاعات کاربری", key: "profile", icon: <UserOutlined /> },
    { label: "آگهی‌های من", key: "ads", icon: <FileTextOutlined /> },
    { label: "کیف پول", key: "wallet", icon: <WalletOutlined /> },
    { label: "تنظیمات", key: "settings", icon: <SettingOutlined /> },
    { label: "پیام‌ها", key: "messages", icon: <MessageOutlined /> },
    { label: "علاقه‌مندی‌ها", key: "favorites", icon: <HeartOutlined /> },
    { label: "پشتیبانی", key: "support", icon: <QuestionCircleOutlined /> },
    { label: "اعلان‌ها", key: "notifications", icon: <BellOutlined /> },
    { label: "خروج", key: "logout", icon: <LogoutOutlined /> },
  ];

  if (isMobile) {
    return (
      <>
        <Button
          type="primary"
          icon={<MenuOutlined />}
          onClick={() => setDrawerVisible(true)}
          style={{ position: "fixed", top: 80, right: 16, zIndex: 1000, }}
        >
            منو
        </Button>
        <Drawer
          title="پروفایل"
          placement="right"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          width="80%"
          style={{marginTop:"9vh"}}
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
    );
  }

  return (
    <div style={{ background: "none", padding: "30px" }}>
      <Title level={3} style={{ textAlign: "right", marginBottom: 24 }}>
        پروفایل
      </Title>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="vertical"
        items={items}
        style={{ width: 300 }}
      />
    </div>
  );
};

export default MenuComponent;

import React from "react";
import { Card, Typography, Row, Col, Button, Input } from "antd";
import { renderSettingsContent } from "../../Components/ProfileContents/SettingsContent";
import { renderMessagesContent } from "../../Components/ProfileContents/MessagesContent";
import { renderFavoritesContent } from "../../Components/ProfileContents/FavoritesContent";
import { renderSupportContent } from "../../Components/ProfileContents/SupportContent";
import { renderNotificationsContent } from "../../Components/ProfileContents/NotificationsContent";
import { renderWalletContent } from "../../Components/ProfileContents/WalletContent";

const { Title, Text } = Typography;

interface ProfileContentProps {
  current: string;
  user: { username: string; token: string } | null;
}

const ProfileContent: React.FC<ProfileContentProps> = ({ current, user }) => {
  const renderProfileContentInfo = () => (
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
        <Col xs={24}>
          <Text strong>تاریخ عضویت:</Text> <Text>1404/04/01</Text>
        </Col>
      </Row>
      <Button type="primary" style={{ marginTop: 16 }}>
        ویرایش اطلاعات
      </Button>
    </Card>
  );

  const renderContent = () => {
    switch (current) {
      case "profile":
        return renderProfileContentInfo();
      case "wallet":
        return renderWalletContent();
      case "settings":
        return renderSettingsContent();
      case "messages":
        return renderMessagesContent();
      case "favorites":
        return renderFavoritesContent();
      case "support":
        return renderSupportContent();
      case "notifications":
        return renderNotificationsContent();
      default:
        return renderProfileContentInfo();
    }
  };

  return <>{renderContent()}</>;
};

export default ProfileContent;

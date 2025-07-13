import { Badge, Button, Dropdown } from "antd";
import { NotificationOutlined } from "@ant-design/icons";
const notificationItems = [
  {
    key: "1",
    label: "آگهی جدید ثبت شد",
  },
  {
    key: "2",
    label: "پیام جدید دارید",
  },
  {
    
    key: "3",
    label: "به روز رسانی سیستم",
  },
  {
    key: "4",
    label: "به روز رسانی سیستم",
  },
  {
    key: "5",
    label: "به روز رسانی سیستم",
  },
];

const Notifications = () => {
  const isMobile = window.innerWidth <= 768;

  return (
    <Dropdown menu={{ items: notificationItems }} placement="top">
      <Badge count={notificationItems.length}>
        <Button icon={<NotificationOutlined />}>
          {!isMobile && "اعلان ها"}
        </Button>
      </Badge>
    </Dropdown>
  );
};

export default Notifications;

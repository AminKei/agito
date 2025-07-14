import { Card, Typography, List, Tag, Button } from "antd";

const { Title, Text } = Typography;

export const renderMessagesContent = () => (
  <Card title="پیام‌ها" bordered={false}>
    <List
      dataSource={[
        { sender: "حسن محمدی", message: "در مورد آگهی لپ‌تاپ...", time: "10:30", replied: false },
        { sender: "علی رضایی", message: "قیمت خودرو چنده؟", time: "09:15", replied: true },
      ]}
      renderItem={(item) => (
        <List.Item>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div>
              <Text strong>{item.sender}</Text>
              <Text style={{ marginLeft: 8 }}>{item.message}</Text>
              <Tag color={item.replied ? "green" : "orange"} style={{ marginLeft: 8 }}>
                {item.replied ? "پاسخ داده" : "در انتظار"}
              </Tag>
            </div>
            <Text type="secondary">{item.time}</Text>
          </div>
        </List.Item>
      )}
    />
    <Button type="primary" style={{ marginTop: 16 }}>
      ارسال پیام جدید
    </Button>
    <Text type="secondary" style={{ marginTop: 8 }}>
      پیام‌های خوانده‌نشده: 1
    </Text>
  </Card>
);
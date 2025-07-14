import { Card, Typography, List, Tag, Button } from "antd";

const { Title, Text } = Typography;

export const renderNotificationsContent = () => (
  <Card title="اعلان‌ها" bordered={false}>
    <List
      dataSource={[
        { message: "آگهی شما تأیید شد", date: "1404/04/14", read: false },
        { message: "موجودی کیف پول به‌روزرسانی شد", date: "1404/04/13", read: true },
      ]}
      renderItem={(item) => (
        <List.Item>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div>
              <Text>{item.message}</Text>
              <Tag color={item.read ? "green" : "red"} style={{ marginLeft: 8 }}>
                {item.read ? "خوانده" : "نخوانده"}
              </Tag>
            </div>
            <Text type="secondary">{item.date}</Text>
          </div>
        </List.Item>
      )}
    />
    <Button  style={{ marginTop: 16 }}>
      پاک کردن همه اعلان‌ها
    </Button>
    <Text type="secondary" style={{ marginTop: 8 }}>
      اعلان‌های جدید در 24 ساعت گذشته: 2
    </Text>
  </Card>
);
import { Card, Typography, List, Tag, Button } from "antd";

const { Title, Text } = Typography;

export const renderFavoritesContent = () => (
  <Card title="علاقه‌مندی‌ها" bordered={false}>
    <List
      dataSource={[
        { title: "لپ‌تاپ Dell XPS 13", category: "electronics", price: "35,000,000 تومان" },
        { title: "خودرو پراید 131", category: "vehicles", price: "250,000,000 تومان" },
      ]}
      renderItem={(item) => (
        <List.Item>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div>
              <Text strong>{item.title}</Text>
              <Tag color="blue" style={{ marginLeft: 8 }}>
                {item.category}
              </Tag>
            </div>
            <Text>{item.price}</Text>
          </div>
        </List.Item>
      )}
    />
    <Button type="primary" style={{ marginTop: 16 }}>
      مدیریت علاقه‌مندی‌ها
    </Button>
    <Text type="secondary" style={{ marginTop: 8 }}>
      حداکثر 10 مورد می‌توانید اضافه کنید.
    </Text>
  </Card>
);
import { Card, Typography, List, Button } from "antd";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

export const renderSupportContent = () => (
  <Card title="پشتیبانی" bordered={false}>
    <List
      dataSource={[
        { question: "چطور آگهی ثبت کنم؟", answer: "از بخش آگهی‌های من..." },
        { question: "پرداخت چگونه انجام می‌شود؟", answer: "از طریق کیف پول..." },
      ]}
      renderItem={(item) => (
        <List.Item>
          <Text strong>{item.question}</Text>
          <Text style={{ marginLeft: 8 }}>{item.answer}</Text>
        </List.Item>
      )}
    />
    <Button type="primary" style={{ marginTop: 16 }}>
      تماس با پشتیبانی (021-12345678)
    </Button>
    <Button type="default" style={{ marginTop: 16, marginRight: 8 }}>
      چت زنده
    </Button>
    <Link to="#" style={{ marginTop: 8, display: "block" }}>
      راهنمای کامل
    </Link>
    <Text type="secondary" style={{ marginTop: 8 }}>
      زمان پاسخگویی: 9:00 - 18:00
    </Text>
  </Card>
);
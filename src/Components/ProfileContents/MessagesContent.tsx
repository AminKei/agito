import { Card, Typography } from "antd";

const { Title, Text } = Typography;

export const renderMessagesContent = () => (
  <Card title="پیام‌ها" bordered={false}>
    <Text>پیامی موجود نیست</Text>
  </Card>
);

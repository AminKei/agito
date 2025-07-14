import { Card, Typography } from "antd";

const { Title, Text } = Typography;

export const renderSupportContent = () => (
    <Card title="پشتیبانی" bordered={false}>
      <Text>برای تماس با پشتیبانی: 021-12345678</Text>
    </Card>
  );
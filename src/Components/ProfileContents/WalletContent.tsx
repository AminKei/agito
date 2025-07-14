import { Button, Card, Input, Typography } from "antd";

const { Title, Text } = Typography;

export const renderWalletContent = () => (
  <Card title="کیف پول" bordered={false}>
    <Text strong>موجودی فعلی:</Text> <Text>500,000 تومان</Text>
    <br />
    <Input
      placeholder="مبلغ شارژ (تومان)"
      style={{ width: 200, marginTop: 16 }}
      type="number"
    />
    <Button type="primary" style={{ marginTop: 16, marginRight: 8 }}>
      شارژ کیف پول
    </Button>
  </Card>
);

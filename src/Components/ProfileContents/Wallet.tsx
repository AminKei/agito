import React from "react";
import { Card, Typography, Input, Button } from "antd";

const { Text } = Typography;

const Wallet: React.FC = () => {
  return (
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
};

export default Wallet;

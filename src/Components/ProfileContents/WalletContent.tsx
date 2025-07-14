import { Button, Card, Input, Typography, List } from "antd";

const { Title, Text } = Typography;

export const renderWalletContent = () => (
  <Card title="کیف پول" bordered={false}>
    <Text strong>موجودی فعلی:</Text>{" "}
    <Text style={{ fontSize: 18 }}>500,000 تومان</Text>
    <Text type="secondary" style={{ marginTop: 4 }}>
      (موجودی قابل برداشت: 450,000 تومان)
    </Text>
    <br />
    <Input
      placeholder="مبلغ شارژ (تومان)"
      style={{ width: 200, marginTop: 16 }}
      type="number"
    />
    <Button type="primary" style={{ marginTop: 16, marginRight: 8 }}>
      شارژ کیف پول
    </Button>
    <Button type="default" style={{ marginTop: 16 }}>
      برداشت
    </Button>
    <List
      header={<Text strong>تاریخچه تراکنش‌ها</Text>}
      dataSource={[
        { date: "1404/04/14", amount: "+100,000 تومان", type: "شارژ" },
        { date: "1404/04/13", amount: "-50,000 تومان", type: "پرداخت" },
      ]}
      renderItem={(item) => (
        <List.Item>
          <Text>{item.date}</Text>
          <Text style={{ marginLeft: 16 }}>{item.amount}</Text>
          <Text type="secondary" style={{ marginLeft: 16 }}>
            {item.type}
          </Text>
        </List.Item>
      )}
      style={{ marginTop: 16 }}
    />
    <Button type="link" style={{ marginTop: 16 }}>
      گزارش تراکنش‌ها
    </Button>
  </Card>
);
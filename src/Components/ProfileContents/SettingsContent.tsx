import { Button, Card, Col, Row, Typography, Switch } from "antd";

const { Title, Text } = Typography;

export const renderSettingsContent = () => (
  <Card title="تنظیمات" bordered={false}>
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <Text strong>زبان:</Text>{" "}
        <Text>فارسی</Text>
        <Button type="link" style={{ marginLeft: 8 }}>
          تغییر زبان
        </Button>
      </Col>
      <Col xs={24}>
        <Text strong>نوتیفیکیشن:</Text>{" "}
        <Switch defaultChecked />
      </Col>
      <Col xs={24}>
        <Text strong>تم:</Text>{" "}
        <Text>روشن</Text>
        <Button type="link" style={{ marginLeft: 8 }}>
          تغییر تم
        </Button>
      </Col>
      <Col xs={24}>
        <Text strong>منطقه زمانی:</Text>{" "}
        <Text>تهران (GMT+3:30)</Text>
        <Button type="link" style={{ marginLeft: 8 }}>
          تغییر منطقه
        </Button>
      </Col>
    </Row>
    <Button type="primary" style={{ marginTop: 16 }}>
      ذخیره تغییرات
    </Button>
    <Button type="link" style={{ marginTop: 8 }}>
      تغییر رمز عبور
    </Button>
  </Card>
);
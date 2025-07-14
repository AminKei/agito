import { Button, Card, Col, Row, Typography } from "antd";
const { Title, Text } = Typography;
export const renderSettingsContent = () => (
  <Card title="تنظیمات" bordered={false}>
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <Text strong>زبان:</Text> <Text>فارسی</Text>
      </Col>
      <Col xs={24}>
        <Text strong>نوتیفیکیشن:</Text> <Text>فعال</Text>
      </Col>
    </Row>
    <Button type="primary" style={{ marginTop: 16 }}>
      ذخیره تغییرات
    </Button>
  </Card>
);

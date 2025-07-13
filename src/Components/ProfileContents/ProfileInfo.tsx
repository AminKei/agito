import React from "react";
import { Card, Typography, Button, Row, Col } from "antd";

const { Text } = Typography;

const ProfileInfo: React.FC = () => {
  return (
    <Card title="اطلاعات کاربری" bordered={false}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Text strong>نام:</Text> <Text>علی محمدی</Text>
        </Col>
        <Col xs={24} md={12}>
          <Text strong>ایمیل:</Text> <Text>ali.mohammadi@example.com</Text>
        </Col>
        <Col xs={24} md={12}>
          <Text strong>شماره تماس:</Text> <Text>09123456789</Text>
        </Col>
        <Col xs={24} md={12}>
          <Text strong>شهر:</Text> <Text>تهران</Text>
        </Col>
      </Row>
      <Button type="primary" style={{ marginTop: 16 }}>
        ویرایش اطلاعات
      </Button>
    </Card>
  );
};

export default ProfileInfo;
import {
  InstagramOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { Button, Space, Col, Divider, Image } from "antd";
import { Layout, Row, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;
const Footer = () => {
  return (
    <Layout.Footer
      style={{
        backgroundColor: "white",
        bottom: "0px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        width: "100%",
        padding: "20px 16px",
        textAlign: "center",
        zIndex: "10",
      }}
    >
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={6}>
          <Title level={5}>همراه ما باشید</Title>
          <Space size="large" wrap>
            <Button shape="circle" icon={<InstagramOutlined />} />
            <Button shape="circle" icon={<TwitterOutlined />} />
            <Button shape="circle" icon={<LinkedinOutlined />} />
            <Button shape="circle" icon={<WhatsAppOutlined />} />
          </Space>
          <Paragraph style={{ marginTop: 16 }}>
            تلفن پشتیبانی: ۰۲۱-۱۲۳۴۵۶۷۸
          </Paragraph>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Title level={5}>راهنما</Title>
          <Space direction="vertical">
            <Link to="/faq" style={{ color: "gray" }}>
              سوالات متداول
            </Link>
            <Link to="/rules" style={{ color: "gray" }}>
              قوانین و مقررات
            </Link>
            <Link to="/privacy" style={{ color: "gray" }}>
              حریم خصوصی
            </Link>
          </Space>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Title level={5}>خدمات مشتریان</Title>
          <Space direction="vertical">
            <Link to="/support" style={{ color: "gray" }}>
              پشتیبانی
            </Link>
            <Link to="/feedback" style={{ color: "gray" }}>
              ارسال نظرات
            </Link>
            <Link to="/report" style={{ color: "gray" }}>
              گزارش مشکلات
            </Link>
          </Space>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Title level={5}>درباره ما</Title>
          <Space direction="vertical">
            <Link to="/about" style={{ color: "gray" }}>
              معرفی شرکت
            </Link>
            <Link to="/contact" style={{ color: "gray" }}>
              تماس با ما
            </Link>
            <Link to="/careers" style={{ color: "gray" }}>
              فرصت‌های شغلی
            </Link>
          </Space>
        </Col>
      </Row>
      <Divider />
      <Row justify="space-evenly" align="middle" gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Text>کلیه حقوق این وب‌سایت محفوظ می‌باشد © ۱۴۰۲</Text>
        </Col>
        <Col xs={24} md={12}>
          <Space size="large" wrap>
            <Image
              src="https://imenlogo.com/files/notices/file_20191206_1550_36991.jpg"
              alt="نماد اعتماد الکترونیکی"
              style={{ height: 30, maxWidth: "100%" }}
            />
            <Image
              src="https://setinmarket.net/wp-content/uploads/2022/07/samandehi.png"
              alt="نشان ملی ثبت"
              style={{ height: 50, maxWidth: "100%" }}
            />
          </Space>
        </Col>
      </Row>
    </Layout.Footer>
  );
};
export default Footer;

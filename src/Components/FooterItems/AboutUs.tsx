import { Space, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

const AboutUs = () => {
  return (
    <>
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
    </>
  );
};

export default AboutUs;

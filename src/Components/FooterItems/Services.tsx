import { Space, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

const Services = () => {
  return (
    <>
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
    </>
  );
};

export default Services;

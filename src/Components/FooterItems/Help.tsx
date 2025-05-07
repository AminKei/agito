import { Space, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

const Help = () => {
  return (
    <>
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
    </>
  );
};

export default Help;

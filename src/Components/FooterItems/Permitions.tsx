import { Col, Image, Space, Typography } from "antd";
const { Text } = Typography;

const Permitions = () => {
  return (
    <>
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
    </>
  );
};

export default Permitions;

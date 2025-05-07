import { Button, Space, Typography } from "antd";
import {
  InstagramOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
const { Title, Paragraph } = Typography;

const ContactUs = () => {
  return (
    <>
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
    </>
  );
};

export default ContactUs;

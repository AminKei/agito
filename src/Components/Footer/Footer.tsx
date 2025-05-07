import { Col, Divider } from "antd";
import { Layout, Row } from "antd";
import ContactUs from "../FooterItems/ContactUs";
import Permitions from "../FooterItems/Permitions";
import Services from "../FooterItems/Services";
import Help from "../FooterItems/Help";
import AboutUs from "../FooterItems/AboutUs";
import "./Footer.css";
const Footer = () => {
  return (
    <Layout.Footer className="LeyoutFooter">
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={6}>
          <ContactUs />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Help />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Services />
        </Col>

        <Col xs={24} sm={12} md={6}>
          <AboutUs />
        </Col>
      </Row>
      <Divider />
      <Row justify="space-evenly" align="middle" gutter={[16, 16]}>
        <Permitions />
      </Row>
    </Layout.Footer>
  );
};
export default Footer;

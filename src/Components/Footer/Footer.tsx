import { Col, Divider } from "antd";
import { Layout, Row } from "antd";
import ContactUs from "../FooterItems/ContactUs";
import Permitions from "../FooterItems/Permitions";
import Services from "../FooterItems/Services";
import Help from "../FooterItems/Help";
import AboutUs from "../FooterItems/AboutUs";
import "./Footer.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
const Footer = () => {
  const [theme, setTheme] = useState<string>("light"); // default to light

  const curenntTheme = useSelector(
    (state: RootState) => (state.theme as { theme: string }).theme
  );

  useEffect(() => {
    localStorage.setItem("theme", curenntTheme);
    setTheme(curenntTheme);
  }, [curenntTheme]);

  return (
    <Layout.Footer
      className="LeyoutFooter"
      style={{
        backgroundColor: theme === "light" ? "#ffffff" : "#252525",
        color: theme === "light" ? "#252525" : "#f5f5f5",
        transition: "all 0.3s ease",
      }}
    >
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

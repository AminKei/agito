import {
  Card,
  Typography,
  Divider,
  Row,
  Col,
  Space,
  Button,
  Image,
  message,
  Alert,
} from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  PhoneOutlined,
  FlagOutlined,
  ArrowLeftOutlined,
  SaveOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Ad } from "../../Models/AdModel";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  translateCategorisa,
  translateCity,
  translateCondition,
} from "../../TranslateCases/TranslateCases";
import RelatedAds from "../../Components/RelatedAds/RelatedAds";
import { formatPrice } from "../../Hooks/formatPrice";
import { RootState } from "../../Redux/store";
import { useSelector } from "react-redux";

const { Title, Text } = Typography;

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const AdsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [ad, setAd] = useState<Ad | null>(null);
  const [showPhone, setShowPhone] = useState(false);
  const [massage, setMassage] = useState("");
  const [theme, setTheme] = useState<string>("light"); // default to light

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: ad?.title,
          text: `${ad?.title} - ${formatPrice(ad?.price || 0)}`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          message.success("لینک آگهی کپی شد");
          setMassage("لینک آگهی کپی شد");
        })
        .catch((error: Error) => console.log("Error copying:", error));
    }
  };

  const curenntTheme = useSelector(
    (state: RootState) => (state.theme as { theme: string }).theme
  );

  useEffect(() => {
    localStorage.setItem("theme", curenntTheme);
    setTheme(curenntTheme);
  }, [curenntTheme]);

  useEffect(() => {
    const storedAds = localStorage.getItem("ads");
    if (storedAds) {
      const ads = JSON.parse(storedAds);
      const foundAd = ads.find((ad: Ad) => ad.id === id);
      setAd(foundAd || null);
    }
  }, [id]);

  if (!ad)
    return (
      <Card loading style={{ marginTop: "10vh", textAlign: "center" }}>
        در حال بارگذاری...
      </Card>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        textAlign: "right",
      }}
    >
      <Row justify="center" gutter={[16, 16]}>
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Link
              to="/"
              style={{ gap: "10px", justifyContent: "end", display: "flex" }}
            >
              <ArrowLeftOutlined />
              بازگشت به صفحه اصلی
            </Link>
            <Card
              bordered={false}
              style={{
                marginBottom: "16px",
                backgroundColor: theme === "light" ? "#ffffff" : "#252525",
                color: theme === "light" ? "#ececec" : "#252525",
                transition: "all 0.3s ease",
              }}
            >
              <Row gutter={[24, 24]}>
                <Col xs={24} md={14}>
                  <Card
                    bordered={false}
                    style={{ boxShadow: "none" }}
                    cover={
                      ad.image ? (
                        <Image
                          src={ad.image[0]}
                          alt={ad.title}
                          style={{
                            width: "100%",
                            borderRadius: "8px",
                            height: "400px",
                            objectFit: "cover",
                            backgroundColor:
                              theme === "light" ? "#ffffff" : "#252525",
                            transition: "all 0.3s ease",
                            color: theme === "light" ? "#252525" : "#ffffff",
                          }}
                        />
                      ) : (
                        <Text type="secondary">بدون تصویر</Text>
                      )
                    }
                  ></Card>
                </Col>

                <Col xs={24} md={10}>
                  <Space
                    direction="vertical"
                    size="large"
                    style={{ width: "100%" }}
                  >
                    <div>
                      <p
                        // level={5}
                        style={{
                          marginBottom: "8px",
                          color: theme === "light" ? "#181818" : "#eeeaea",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {ad.title}
                      </p>
                      <Text
                        type="secondary"
                        style={{
                          fontSize: "14px",
                          color: theme === "light" ? "#181818" : "#eeeaea",
                          transition: "all 0.3s ease",
                        }}
                      >
                        آگهی شده{" "}
                        {new Date(ad.date).toLocaleDateString("fa-IR") ===
                        new Date().toLocaleDateString("fa-IR")
                          ? "امروز "
                          : "دیروز یا روز های قبل  "}
                        در {translateCity(ad.city)}{" "}
                      </Text>
                    </div>

                    <Divider
                      style={{
                        margin: "12px 0",
                        color: theme === "light" ? "#181818" : "#eeeaea",
                        transition: "all 0.3s ease",
                      }}
                    />

                    <Space direction="vertical" size="middle">
                      <Typography.Paragraph>
                        <Text
                          strong
                          style={{
                            fontSize: "18px",
                            color: theme === "light" ? "#181818" : "#eeeaea",
                            transition: "all 0.3s ease",
                          }}
                        >
                          قیمت: {formatPrice(ad.price)}
                        </Text>
                      </Typography.Paragraph>

                      <Button
                        type="primary"
                        icon={<PhoneOutlined />}
                        size="large"
                        block
                        onClick={() => setShowPhone(true)}
                      >
                        {showPhone ? ad.phone : "اطلاعات تماس"}
                      </Button>

                      <Row gutter={10}>
                        <Col span={8}>
                          <Button
                            icon={<ShareAltOutlined />}
                            block
                            onClick={handleShare}
                          >
                            اشتراک گذاری آگهی
                          </Button>
                        </Col>
                        <Col span={8}>
                          <Button icon={<FlagOutlined />} block>
                            گزارش مشکل
                          </Button>
                        </Col>
                        <Col span={8}>
                          <Button icon={<SaveOutlined />} block>
                            ذخیره در لیست
                          </Button>
                        </Col>
                      </Row>
                      {massage && <Alert message={massage} type="success" />}
                    </Space>

                    <Divider style={{ margin: "12px 0" }} />

                    <Space direction="vertical" size="small">
                      <div>
                        <Text
                          type="secondary"
                          style={{
                            color: theme === "light" ? "#181818" : "#eeeaea",
                            transition: "all 0.3s ease",
                          }}
                        >
                          دسته‌بندی:
                        </Text>
                        <Text
                          style={{
                            color: theme === "light" ? "#181818" : "#eeeaea",
                            transition: "all 0.3s ease",
                          }}
                        >
                          {" "}
                          {translateCategorisa(ad.category)}
                        </Text>
                      </div>
                      <div>
                        <Text
                          type="secondary"
                          style={{
                            color: theme === "light" ? "#181818" : "#eeeaea",
                            transition: "all 0.3s ease",
                          }}
                        >
                          وضعیت:
                        </Text>
                        <Text
                          style={{
                            color: theme === "light" ? "#181818" : "#eeeaea",
                            transition: "all 0.3s ease",
                          }}
                        >
                          {" "}
                          {translateCondition(ad.condition)}
                        </Text>
                      </div>
                      <div>
                        <Text
                          type="secondary"
                          style={{
                            color: theme === "light" ? "#181818" : "#eeeaea",
                            transition: "all 0.3s ease",
                          }}
                        >
                          محل:
                        </Text>
                        <Text
                          style={{
                            color: theme === "light" ? "#181818" : "#eeeaea",
                            transition: "all 0.3s ease",
                          }}
                        >
                          {" "}
                          {ad.address}
                        </Text>
                      </div>
                    </Space>
                  </Space>
                </Col>
              </Row>
              <Title
                level={4}
                style={{
                  marginBottom: "16px",
                  color: theme === "light" ? "#181818" : "#eeeaea",
                  transition: "all 0.3s ease",
                }}
              >
                توضیحات
              </Title>
              <Typography.Paragraph
                style={{
                  whiteSpace: "pre-line",
                  color: theme === "light" ? "#181818" : "#eeeaea",
                  transition: "all 0.3s ease",
                }}
              >
                {ad.description}
              </Typography.Paragraph>
              <br />
              <Typography
                style={{
                  whiteSpace: "pre-line",
                  fontSize: "18px",
                  color: theme === "light" ? "#181818" : "#eeeaea",
                  transition: "all 0.3s ease",
                }}
              >
                موقعیت روی نقشه
              </Typography>
              {ad.location && (
                <div
                  style={{
                    marginTop: 40,
                    borderRadius: 8,
                    overflow: "hidden",
                    width: "100%",
                    height: "250px",
                  }}
                >
                  <MapContainer
                    center={[ad.location.lat, ad.location.lng]}
                    zoom={13}
                    style={{ height: 300, width: "100%" }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[ad.location.lat, ad.location.lng]} />
                  </MapContainer>
                </div>
              )}
            </Card>
          </Space>
        </Col>
      </Row>
      <RelatedAds />
    </div>
  );
};
export default AdsPage;

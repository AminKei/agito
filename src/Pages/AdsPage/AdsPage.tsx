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
  Tag, // اضافه کردن Tag برای نمایش urgent و negotiable
} from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
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
import ContractPermisens from "../../Components/ContractPermisens/ContractPermisens";

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
  const Location = useLocation();

  const { id } = useParams<{ id: string }>();
  const [ad, setAd] = useState<Ad | null>(null);
  const [showPhone, setShowPhone] = useState(false);
  const [massage, setMassage] = useState("");

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
    <div style={{ minHeight: "100vh", textAlign: "right" }}>
      <Row justify="center" gutter={[16, 16]}>
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Row
              justify={"space-between"}
              style={{ display: "flex", alignItems: "center", color: "gray" }}
            >
              <p color="red">همه آگهی ها{Location.pathname}</p>
              <Link
                to="/"
                style={{ gap: "10px", justifyContent: "end", display: "flex" }}
              >
                <ArrowLeftOutlined />
                بازگشت به صفحه اصلی
              </Link>
            </Row>
            <Card bordered={false} style={{ marginBottom: "16px" }}>
              <Row gutter={[24, 24]}>
                <Col xs={24} md={14}>
                  <Card
                    bordered={false}
                    style={{ boxShadow: "none" }}
                    cover={
                      ad.image && ad.image.length > 0 ? (
                        <Image
                          src={ad.image[0]}
                          onError={(error) => {
                            error.currentTarget.src =
                              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtEY1E5uyX1bU9au2oF74LoFPdthQlmZ5YIQ&s";
                          }}
                          alt={ad.title}
                          style={{
                            width: "100%",
                            borderRadius: "8px",
                            height: "400px",
                            objectFit: "cover",
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
                      <Title level={4} style={{ marginBottom: "8px" }}>
                        {ad.title}
                      </Title>
                      <Text type="secondary" style={{ fontSize: "14px" }}>
                        آگهی شده{" "}
                        {new Date(ad.date).toLocaleDateString("fa-IR") ===
                        new Date().toLocaleDateString("fa-IR")
                          ? "امروز "
                          : "دیروز یا روز‌های قبل "}
                        در {translateCity(ad.city)}
                      </Text>
                    </div>

                    <Divider style={{ margin: "12px 0" }} />

                    <Space direction="vertical" size="middle">
                      <Typography.Paragraph>
                        <Text strong style={{ fontSize: "18px" }}>
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
                        {showPhone ? (
                          <a href={`tel:`}>{ad.phone}</a>
                        ) : (
                          "اطلاعات تماس"
                        )}
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
                      <Row justify={"end"}>
                        {ad.urgent && (
                          <Tag color="red" style={{ marginRight: 8 }}>
                            فوری
                          </Tag>
                        )}
                        {ad.negotiable && (
                          <Tag color="blue" style={{ marginRight: 8 }}>
                            قابل مذاکره
                          </Tag>
                        )}
                      </Row>
                    </Space>

                    <Divider style={{ margin: "12px 0" }} />

                    <Space direction="vertical" size="small">
                      <div>
                        <Text type="secondary">دسته‌بندی:</Text>
                        <Text> {translateCategorisa(ad.category)}</Text>
                      </div>
                      <div>
                        <Text type="secondary">وضعیت:</Text>
                        <Text> {translateCondition(ad.condition)}</Text>
                      </div>
                      <div>
                        <Text type="secondary">محل:</Text>
                        <Text> {ad.address}</Text>
                      </div>
                    </Space>
                  </Space>
                </Col>
              </Row>
              <Title level={4} style={{ marginBottom: "16px" }}>
                توضیحات
              </Title>
              <Typography.Paragraph
                style={{ whiteSpace: "pre-line", color: "#313131" }}
              >
                {ad.description}
              </Typography.Paragraph>
              <br />
              <Typography
                style={{
                  whiteSpace: "pre-line",
                  color: "#313131",
                  fontSize: "18px",
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
                      attribution='© <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[ad.location.lat, ad.location.lng]} />
                  </MapContainer>
                </div>
              )}
              <ContractPermisens
                content="بررسی اعتبار آگهی: قبل از تماس با فروشنده، اطلاعات آگهی (مانند قیمت، توضیحات و تصاویر) را به‌دقت بررسی کنید.
تأیید هویت فروشنده: برای معاملات امن، هویت فروشنده را از طریق اطلاعات تماس یا پیام‌های آگیتو تأیید کنید.
اجتناب از آگهی‌های مشکوک: آگهی‌هایی که قیمت غیرواقعی یا اطلاعات ناقص دارند را به پشتیبانی گزارش دهید."
                title="نکات کلیدی مشاهده آگهی‌ها"
              />
            </Card>
          </Space>
        </Col>
      </Row>
      <RelatedAds />
    </div>
  );
};

export default AdsPage;

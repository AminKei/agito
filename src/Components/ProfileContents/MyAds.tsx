import React from "react";
import { Card, Tabs, List, Empty, Spin, Typography } from "antd";
import { formatPrice } from "../../Hooks/formatPrice";
import { Link } from "react-router-dom";
import { ProfileModelAds } from "../../Models/ProfileModelAds";

const { Text } = Typography;
const { TabPane } = Tabs;

interface ads {
  ads: ProfileModelAds[];
  loading: boolean;
}

// داده‌های تستی
export const mockAds: ProfileModelAds[] = [
  {
    id: "1",
    title: "لپ‌تاپ دل XPS 13",
    description: "لپ‌تاپ در حد نو با گارانتی",
    category: "electronics",
    price: 25000000,
    condition: "like-new",
    city: "تهران",
    image: ["https://example.com/laptop.jpg"],
    date: new Date().toLocaleString(),
    address: "تهران، خیابان ولیعصر",
    phone: "09123456789",
    urgent: true,
    negotiable: false,
    status: "published",
  },
  {
    id: "2",
    title: "خودرو پراید 131",
    description: "پراید سفید، سالم و بدون تصادف",
    category: "vehicles",
    price: 180000000,
    condition: "used",
    city: "مشهد",
    image: ["https://example.com/car.jpg"],
    date: new Date().toLocaleString(),
    address: "مشهد، بلوار وکیل‌آباد",
    phone: "09123456789",
    urgent: false,
    negotiable: true,
    status: "published",
  },
  {
    id: "3",
    title: "آپارتمان 100 متری",
    description: "آپارتمان دوخوابه در مرکز شهر",
    category: "property",
    price: 2000000000,
    condition: "new",
    city: "اصفهان",
    image: ["https://example.com/apartment.jpg"],
    date: new Date().toLocaleString(),
    address: "اصفهان، خیابان چهارباغ",
    phone: "09123456789",
    urgent: false,
    negotiable: true,
    status: "expired",
  },
  {
    id: "4",
    title: "موبایل سامسونگ A50",
    description: "گوشی سالم با جعبه",
    category: "electronics",
    price: 5000000,
    condition: "used",
    city: "شیراز",
    image: ["https://example.com/phone.jpg"],
    date: new Date().toLocaleString(),
    address: "شیراز، خیابان زند",
    phone: "09123456789",
    urgent: true,
    negotiable: false,
    status: "expired",
  },
  {
    id: "5",
    title: "دوچرخه کوهستان",
    description: "دوچرخه با کیفیت، استفاده‌شده",
    category: "sports",
    price: 3000000,
    condition: "used",
    city: "تبریز",
    image: ["https://example.com/bicycle.jpg"],
    date: new Date().toLocaleString(),
    address: "تبریز، خیابان آزادی",
    phone: "09123456789",
    urgent: false,
    negotiable: true,
    status: "canceled",
  },
  {
    id: "6",
    title: "مبلمان راحتی",
    description: "ست مبلمان 7 نفره",
    category: "home",
    price: 15000000,
    condition: "like-new",
    city: "کرج",
    image: ["https://example.com/furniture.jpg"],
    date: new Date().toLocaleString(),
    address: "کرج، خیابان طالقانی",
    phone: "09123456789",
    urgent: true,
    negotiable: false,
    status: "canceled",
  },
];

const MyAds: React.FC = () => {
  const renderAdsList = (adsList: ProfileModelAds[]) => (
    <List
      grid={{ gutter: 16, xs: 1, sm: 2, md: 2 }}
      dataSource={adsList}
      renderItem={(ad: ProfileModelAds) => (
        <List.Item>
          <Card
            hoverable
            cover={
              ad.image && ad.image.length > 0 ? (
                <img
                  alt={ad.title}
                  src={ad.image[0]}
                  style={{ height: 150, objectFit: "cover" }}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtEY1E5uy1bU9au2oF74LoFPdthQlmZ5YIQ&s";
                  }}
                />
              ) : (
                <Text type="secondary">بدون تصویر</Text>
              )
            }
          >
            <Card.Meta
              title={
                <Link to={`/ads/${ad.id}`}>
                  {ad.title} {ad.urgent && <span style={{ color: "red" }}>(فوری)</span>}
                  {ad.negotiable && <span style={{ color: "blue" }}>(قابل مذاکره)</span>}
                </Link>
              }
              description={
                <>
                  <Text>{formatPrice(ad.price)}</Text>
                  <br />
                  <Text type="secondary">{ad.city}</Text>
                </>
              }
            />
          </Card>
        </List.Item>
      )}
    />
  );

  const publishedAds = mockAds.filter((ad) => ad.status === "published").slice(0, 2);
  const expiredAds = mockAds.filter((ad) => ad.status === "expired").slice(0, 2);
  const canceledAds = mockAds.filter((ad) => ad.status === "canceled").slice(0, 2);

  return (
    <Card title="آگهی‌های من" bordered={false}>
      <Tabs defaultActiveKey="published">
        <TabPane tab="منتشرشده" key="published">
          {publishedAds.length > 0 ? (
            renderAdsList(publishedAds)
          ) : (
            <Empty description="هیچ آگهی منتشرشده‌ای وجود ندارد" />
          )}
        </TabPane>
        <TabPane tab="منقضی‌شده" key="expired">
          {expiredAds.length > 0 ? (
            renderAdsList(expiredAds)
          ) : (
            <Empty description="هیچ آگهی منقضی‌شده‌ای وجود ندارد" />
          )}
        </TabPane>
        <TabPane tab="لغوشده" key="canceled">
          {canceledAds.length > 0 ? (
            renderAdsList(canceledAds)
          ) : (
            <Empty description="هیچ آگهی لغوشده‌ای وجود ندارد" />
          )}
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default MyAds;
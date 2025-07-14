import React, { useState } from "react";
import { Card, Typography, List, Empty, Spin, Tabs, Button } from "antd";
import { Ad } from "../../Models/AdModel";
import { formatPrice } from "../../Hooks/formatPrice";
import { Link } from "react-router-dom";

const { Text } = Typography;

interface AdsTabContentProps {
  ads: Ad[];
  loading: boolean;
  activeAdsTab: string;
  setActiveAdsTab: (tab: string) => void;
}

const AdsTabContent: React.FC<AdsTabContentProps> = ({
  ads,
  loading,
  activeAdsTab,
  setActiveAdsTab,
}) => {
  const publishedAds = ads.filter((ad) => !ad.urgent && ad.negotiable);
  const rejectedAds = ads.filter((ad) => ad.urgent && !ad.negotiable);
  const expiredAds = ads.filter((ad) => !ad.urgent && !ad.negotiable);

  const handleDeleteAd = (adId: string) => {
    const updatedAds = ads.filter((ad) => ad.id !== adId);
    localStorage.setItem("ads", JSON.stringify(updatedAds));
    // فرض می‌کنیم parent component state رو به‌روزرسانی می‌کنه
    // اینجا فقط localStorage رو آپدیت می‌کنیم، باید از parent callback استفاده کنی
    console.log("آگهی با ID", adId, "حذف شد");
  };

  const items = [
    {
      key: "published",
      label: "منتشرشده",
      children: loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
          <p style={{ marginTop: "10px" }}>در حال بارگذاری آگهی‌ها...</p>
        </div>
      ) : publishedAds.length > 0 ? (
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 3 }}
          dataSource={publishedAds}
          renderItem={(ad: Ad) => (
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
                      {ad.title}{" "}
                      {ad.urgent && (
                        <span style={{ color: "red" }}>(فوری)</span>
                      )}
                      <span style={{ color: "green" }}>(منتشر شده)</span>
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
                <Button
                  style={{ marginTop: 8 }}
                  onClick={() => handleDeleteAd(ad.id)}
                >
                  حذف
                </Button>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <Empty description="هیچ آگهی‌ای در تب منتشرشده وجود ندارد" />
      ),
    },
    {
      key: "rejected",
      label: "ردشده",
      children: loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
          <p style={{ marginTop: "10px" }}>در حال بارگذاری آگهی‌ها...</p>
        </div>
      ) : rejectedAds.length > 0 ? (
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 3 }}
          dataSource={rejectedAds}
          renderItem={(ad: Ad) => (
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
                      {ad.title} <span style={{ color: "red" }}>(رد شده)</span>
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
                <Button
                  style={{ marginTop: 8 }}
                  onClick={() => handleDeleteAd(ad.id)}
                >
                  حذف
                </Button>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <Empty description="هیچ آگهی‌ای در تب ردشده وجود ندارد" />
      ),
    },
    {
      key: "expired",
      label: "منقضی‌شده",
      children: loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
          <p style={{ marginTop: "10px" }}>در حال بارگذاری آگهی‌ها...</p>
        </div>
      ) : expiredAds.length > 0 ? (
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 3 }}
          dataSource={expiredAds}
          renderItem={(ad: Ad) => (
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
                      {ad.title} <span style={{ color: "gray" }}>(منقضی)</span>
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
                <Button
                  style={{ marginTop: 8 }}
                  onClick={() => handleDeleteAd(ad.id)}
                >
                  حذف
                </Button>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <Empty description="هیچ آگهی‌ای در تب منقضی‌شده وجود ندارد" />
      ),
    },
    {
      key: "all",
      label: "همه آگهی‌ها",
      children: loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
          <p style={{ marginTop: "10px" }}>در حال بارگذاری آگهی‌ها...</p>
        </div>
      ) : ads.length > 0 ? (
        <div
          style={{
            overflowX: "auto",
            whiteSpace: "nowrap",
            padding: "16px 0",
          }}
        >
          {ads.map((ad) => (
            <Card
              key={ad.id}
              hoverable
              style={{ display: "inline-block", width: 300, marginRight: 16 }}
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
                    {ad.title}{" "}
                    {ad.urgent && <span style={{ color: "red" }}>(فوری)</span>}
                    {!ad.urgent && ad.negotiable && (
                      <span style={{ color: "green" }}>(منتشر شده)</span>
                    )}
                    {ad.urgent && !ad.negotiable && (
                      <span style={{ color: "red" }}>(رد شده)</span>
                    )}
                    {!ad.urgent && !ad.negotiable && (
                      <span style={{ color: "gray" }}>(منقضی)</span>
                    )}
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
              <Button
                style={{ marginTop: 8 }}
                onClick={() => handleDeleteAd(ad.id)}
              >
                حذف
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <Empty description="هیچ آگهی‌ای وجود ندارد" />
      ),
    },
  ];

  return (
    <Card title="آگهی‌های من" bordered={false}>
      <Tabs
        activeKey={activeAdsTab}
        items={items}
        onChange={(key) => setActiveAdsTab(key)}
      />
    </Card>
  );
};

export default AdsTabContent;
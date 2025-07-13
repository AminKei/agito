import React, { useEffect, useState } from "react";
import { List, Card, Typography, Space, Tag, Image } from "antd";
import { Link } from "react-router-dom";
import {
  DeleteOutlined,
  EnvironmentOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import "./AdsItem.css";
import {
  translateCity,
  translateCondition,
} from "../../TranslateCases/TranslateCases";
import { formatPrice } from "../../Hooks/formatPrice";
import { Ad } from "../../Models/AdModel";
const { Text } = Typography;

interface AdsListProps {
  ads: Ad[];
  onDelete: (id: string) => void;
}

const AdsItem: React.FC<AdsListProps> = ({ ads, onDelete }) => {
  // مدیریت وضعیت خطا برای تصاویر
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <List
      style={{ width: "100%", margin: "0 auto" }} // عرض کامل برای نمایش همه آگهی‌ها
      grid={{ gutter: 15, xs: 1, sm: 2, md: 3, lg: 4 }} // بهینه‌سازی تعداد ستون‌ها
      dataSource={ads}
      renderItem={(ad) => (
        <List.Item>
          <Link to={`/adspage/${ad.id}`} style={{ width: "100%" }}>
            <Card
              className="card-item"
              hoverable
              style={{
                height: "150px",
                display: "flex",
                flexDirection: "row",
                textAlign: "right",
                overflow: "hidden", // جلوگیری از سرریز
              }}
              bodyStyle={{
                padding: "12px",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: "16px",
              }}
            >
              <Card
                cover={
                  ad.image && ad.image.length > 0 ? (
                    <Image
                      width={130}
                      height={125}
                      style={{ borderRadius: "10px", objectFit: "cover" }}
                      src={
                        imageErrors[ad.id]
                          ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtEY1E5uyX1bU9au2oF74LoFPdthQlmZ5YIQ&s"
                          : ad.image[0]
                      }
                      preview={{
                        mask: <EyeOutlined />,
                        maskClassName: "custom-mask",
                      }}
                      onError={() => handleImageError(ad.id)}
                      alt={ad.title}
                    />
                  ) : (
                    <Image
                      width={130}
                      height={125}
                      style={{ borderRadius: "10px", objectFit: "cover" }}
                      src="https://via.placeholder.com/130x125"
                      alt="Placeholder"
                    />
                  )
                }
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  flex: 1,
                  justifyContent: "space-between",
                  overflow: "hidden", // جلوگیری از سرریز متن
                }}
              >
                <Typography.Title
                  level={5}
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2, // محدود کردن به 2 خط
                    WebkitBoxOrient: "vertical",
                    lineHeight: "1.5",
                    marginBottom: "-4px",
                    direction: "rtl",
                  }}
                >
                  {ad.title}
                </Typography.Title>
                <Text
                  strong
                  style={{
                    fontSize: "14px",
                    color: "#1890ff",
                    direction: "rtl",
                  }}
                >
                  {formatPrice(ad.price)} تومان
                </Text>
                <Space
                  style={{
                    fontSize: "12px",
                    color: "#666",
                    direction: "rtl",
                    width: "100%",
                    justifyContent: "flex-start",
                  }}
                >
                  <Tag color="blue" style={{ fontSize: "12px" }}>
                    {translateCondition(ad.condition)}
                  </Tag>
                  {ad.negotiable && <Tag color="green">قابل مذاکره</Tag>}
                  {ad.urgent && <Tag color="red">فوری</Tag>}
                </Space>
                <Space
                  size="small"
                  style={{
                    direction: "rtl",
                    width: "100%",
                    justifyContent: "flex-start",
                  }}
                >
                  <Space>
                    <EnvironmentOutlined style={{ color: "#1890ff" }} />
                    <Text style={{ fontSize: "12px" }}>
                      در {translateCity(ad.city)}
                    </Text>
                  </Space>
                </Space>
              </div>
              {/* <Space
                style={{ alignSelf: "flex-start", marginLeft: "10px" }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete(ad.id);
                }}
              >
                <DeleteOutlined style={{ color: "#ff4d4f", cursor: "pointer" }} />
              </Space> */}
            </Card>
          </Link>
        </List.Item>
      )}
    />
  );
};

export default AdsItem;

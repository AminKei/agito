import React from "react";

import { List, Card, Typography, Space, Tag, Image } from "antd";
import { Link } from "react-router-dom";
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import "./AdsItem.css";
import {
  translateCity,
  translateCondition,
} from "../../TranslateCases/TranslateCases";
const { Text } = Typography;

export interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  image: string[];
  date: string;
  sity: string;
  phone: string;
  address: string;
  urgent?: boolean;
  negotiable?: boolean;
}

interface AdsListProps {
  ads: Ad[];
  onDelete: (id: string) => void;
}

const AdsItem: React.FC<AdsListProps> = ({ ads, onDelete }) => {
  const formatPrice = (price: number) => {
    if (price === 0) return "توافقی";
    return `${price.toLocaleString()} تومان`;
  };

  return (
    <List
      style={{ width: "85%" }}
      grid={{ gutter: 15, xs: 1, sm: 2, md: 2, lg: 2 }}
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
              }}
              bodyStyle={{
                padding: "12px",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: "16px",
              }}
            >
              {/* <Space onClick={() => onDelete(ad.id)}>
                <DeleteOutlined />
              </Space> */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <Typography.Title
                  level={5}
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    overflow: "hidden",
                    textOverflow: "clip",
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    lineHeight: "1.5",
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
                  {formatPrice(ad.price)}
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
                  {ad.negotiable && <Tag color="green">قابل معاوضه</Tag>}
                </Space>
                <Space
                  size="small"
                  style={{
                    direction: "rtl",
                    width: "100%",
                    justifyContent: "flex-start",
                  }}
                >
                  {/* <Space>
                    <ClockCircleOutlined style={{ color: "#1890ff" }} />
                    <Text style={{ fontSize: "12px" }}>{ad.date}</Text>
                  </Space> */}
                  <Space>
                    <EnvironmentOutlined style={{ color: "#1890ff" }} />
                    <Text style={{ fontSize: "12px" }}>
                      در {translateCity(ad.sity)}
                    </Text>
                  </Space>
                </Space>
              </div>
              <Card
                cover={
                  ad.image ? (
                    <Image
                      width={130}
                      height={125}
                      style={{ borderRadius: "10px", objectFit: "cover" }}
                      src={ad.image[0]}
                      preview={{
                        mask: <EyeOutlined />,
                        maskClassName: "custom-mask",
                      }}
                    />
                  ) : null
                }
              ></Card>{" "}
            </Card>
          </Link>
        </List.Item>
      )}
    />
  );
};

export default AdsItem;

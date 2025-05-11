import { Card, Typography, Button, Image } from "antd";
import { useState, useRef, useEffect } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatPrice } from "../../Hooks/formatPrice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

const RelatedAds = () => {
  const [theme, setTheme] = useState<string>("light"); // default to light
  const curenntTheme = useSelector(
    (state: RootState) => (state.theme as { theme: string }).theme
  );

  useEffect(() => {
    localStorage.setItem("theme", curenntTheme);
    setTheme(curenntTheme);
  }, [curenntTheme]);

  const [ads, setAds] = useState(() => {
    const storedAds = localStorage.getItem("ads");
    return storedAds
      ? JSON.parse(storedAds)
      : [
          { title: "آگهی ۱", image: "/path/to/image1.jpg", price: 100000 },
          { title: "آگهی ۲", image: "/path/to/image2.jpg", price: 200000 },
          { title: "آگهی ۳", image: "/path/to/image3.jpg", price: 150000 },
          { title: "آگهی ۴", image: "/path/to/image4.jpg", price: 120000 },
          { title: "آگهی ۵", image: "/path/to/image5.jpg", price: 130000 },
        ];
  });

  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const next = () => {
    if (sliderRef.current) sliderRef.current.slickNext();
  };
  const prev = () => {
    if (sliderRef.current) sliderRef.current.slickPrev();
  };

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: theme === "light" ? "#ffffff" : "#252525",
        transition: "all 0.3s ease",
        color: theme === "light" ? "#ffffff" : "#252525",
      }}
      dir="rtl"
      className="related-ads-container"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Typography.Title level={4} style={{
           backgroundColor: theme === "light" ? "#ffffff" : "#252525",
           transition: "all 0.3s ease",
           color: theme === "light" ? "#252525" : "#ffffff",
        }}>آگهی های مرتبط</Typography.Title>
        <div>
          <Button
            shape="circle"
            icon={<RightOutlined />}
            onClick={next}
            style={{ marginRight: "8px" }}
          />
          <Button shape="circle" icon={<LeftOutlined />} onClick={prev} />
        </div>
      </div>

      <Slider ref={sliderRef} {...settings}>
        {ads.map((ad: any, index: number) => (
          <div key={index} style={{ padding: "0 10px" }}>
            <Link to={`/adspage/${ad.id}`}>
              <Card
                hoverable
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  width: "310px",
                  backgroundColor: theme === "light" ? "#ffffff" : "#252525",
                  transition: "all 0.3s ease",
                  color: theme === "light" ? "#ffffff" : "#252525",
                }}
                cover={
                  <Image
                    alt={ad.title}
                    src={ad.image}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "200px",
                    }}
                  />
                }
              >
                <Card.Meta
                  title={
                    <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                      <Typography
                        style={{
                          color: theme === "light" ? "#161616" : "#c5c5c5",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {ad.title}
                      </Typography>
                    </div>
                  }
                  description={
                    <div
                      style={{
                        marginTop: "8px",
                        fontSize: "14px",
                      }}
                    >
                      <Typography
                        style={{
                          color: theme === "light" ? "#161616" : "#c7c7c7",
                          transition: "all 0.3s ease",
                        }}
                      >
                        قیمت: {formatPrice(ad.price)}
                      </Typography>
                    </div>
                  }
                />
              </Card>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RelatedAds;

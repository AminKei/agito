import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  Card,
  Row,
  Col,
  Typography,
  Divider,
  message,
  InputNumber,
  ConfigProvider,
  Alert,
  Checkbox, // اضافه کردن Checkbox
} from "antd";
import {
  UploadOutlined,
  DollarOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import { RootState } from "../../Config/Redux/Store";
import Paragraph from "antd/es/typography/Paragraph";
import ContractPermisens from "../../Components/ContractPermisens/ContractPermisens";
import { RulsTips } from "../../Tips/RulsTips";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LocationPicker: React.FC<{
  location: { lat: number; lng: number } | null;
  setLocation: (loc: { lat: number; lng: number } | null) => void;
}> = ({ location, setLocation }) => {
  useMapEvents({
    click(e) {
      setLocation(e.latlng);
    },
  });

  return location === null ? null : <Marker position={location} />;
};

const AddAd: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [theme, setTheme] = useState<string>("light");

  const handleFinish = (values: any) => {
    setLoading(true);
    const fileList = values.image || [];
    if (fileList.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        saveAd(values, [imageUrl]);
      };
      reader.onerror = () => {
        message.error("خطا در بارگذاری تصویر");
        setLoading(false);
      };
      reader.readAsDataURL(fileList[0].originFileObj);
    } else {
      saveAd(values, []);
    }
  };

  const saveAd = (values: any, imageUrl: string[]) => {
    try {
      const newAd = {
        id: Date.now().toString(),
        title: values.title,
        description: values.description,
        price: Number(values.price),
        category: values.category,
        condition: values.condition,
        city: values.city,
        address: values.address,
        phone: values.phone,
        image: imageUrl,
        date: new Date().toLocaleString(),
        location,
        urgent: values.urgent || false, // اضافه کردن urgent
        negotiable: values.negotiable || false, // اضافه کردن negotiable
      };

      const storedAds = localStorage.getItem("ads");
      const ads = storedAds ? JSON.parse(storedAds) : [];

      localStorage.setItem("ads", JSON.stringify([newAd, ...ads]));

      setShowSuccess(true);
      message.success("آگهی با موفقیت ثبت شد");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error saving ad:", error);
      message.error("خطا در ذخیره‌سازی آگهی");
    } finally {
      setLoading(false);
    }
  };

  const curenntTheme = useSelector(
    (state: RootState) => (state.theme as { theme: string }).theme
  );

  useEffect(() => {
    localStorage.setItem("theme", curenntTheme);
    setTheme(curenntTheme);
  }, [curenntTheme]);

  return (
    <ConfigProvider direction="rtl">
      <Row
        justify="center"
        style={{
          minHeight: "100vh",
        }}
      >
        <Col xs={24} sm={24} md={20} lg={16} xl={20}>
          <Card
            bordered={false}
            style={{
              borderRadius: 8,
            }}
            title="افزودن آگهی جدید"
          >
            {showSuccess && (
              <Alert
                message="آگهی با موفقیت ثبت شد"
                type="success"
                showIcon
                style={{
                  marginBottom: 16,
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1000,
                  textAlign: "center",
                  padding: "40px 140px",
                  fontSize: "20px",
                }}
              />
            )}
            <Divider />
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFinish}
              size="large"
              requiredMark="optional"
            >
              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="title"
                    label="عنوان"
                    rules={[
                      { required: true, message: "لطفا عنوان را وارد کنید" },
                      { min: 3, message: "عنوان باید حداقل 3 کاراکتر باشد" },
                    ]}
                  >
                    <Input placeholder="عنوان آگهی را وارد کنید" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="price"
                    label="قیمت"
                    rules={[
                      { required: true, message: "لطفا قیمت را وارد کنید" },
                    ]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      prefix={<DollarOutlined />}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                      placeholder="قیمت به تومان"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="description"
                label="توضیحات"
                rules={[
                  { required: true, message: "لطفا توضیحات را وارد کنید" },
                  { min: 20, message: "توضیحات باید حداقل 20 کاراکتر باشد" },
                ]}
              >
                <Input.TextArea
                  rows={6}
                  placeholder="توضیحات کامل آگهی را وارد کنید"
                />
              </Form.Item>
              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="category"
                    label="دسته‌بندی"
                    rules={[
                      {
                        required: true,
                        message: "لطفا دسته‌بندی را انتخاب کنید",
                      },
                    ]}
                  >
                    <Select placeholder="دسته‌بندی را انتخاب کنید">
                      <Select.Option value="electronics">
                        الکترونیک
                      </Select.Option>
                      <Select.Option value="vehicles">خودرو</Select.Option>
                      <Select.Option value="property">املاک</Select.Option>
                      <Select.Option value="home">لوازم خانگی</Select.Option>
                      <Select.Option value="services">خدمات</Select.Option>
                      <Select.Option value="clothing">پوشاک</Select.Option>
                      <Select.Option value="sports">ورزشی</Select.Option>
                      <Select.Option value="books">
                        کتاب و لوازم التحریر
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="condition"
                    label="وضعیت"
                    rules={[
                      { required: true, message: "لطفا وضعیت را انتخاب کنید" },
                    ]}
                  >
                    <Select placeholder="وضعیت کالا را انتخاب کنید">
                      <Select.Option value="new">نو</Select.Option>
                      <Select.Option value="like-new">در حد نو</Select.Option>
                      <Select.Option value="used">کارکرده</Select.Option>
                      <Select.Option value="needs-repair">
                        نیاز به تعمیر
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="city"
                    label="شهر"
                    rules={[
                      { required: true, message: "لطفا شهر را انتخاب کنید" },
                    ]}
                  >
                    <Select placeholder="شهر را انتخاب کنید">
                      <Select.Option value="tehran">تهران</Select.Option>
                      <Select.Option value="mashhad">مشهد</Select.Option>
                      <Select.Option value="isfahan">اصفهان</Select.Option>
                      <Select.Option value="shiraz">شیراز</Select.Option>
                      <Select.Option value="tabriz">تبریز</Select.Option>
                      <Select.Option value="karaj">کرج</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="phone"
                    label="شماره تماس"
                    rules={[
                      {
                        required: true,
                        message: "لطفا شماره تماس را وارد کنید",
                      },
                      {
                        pattern: /^[0-9]{11}$/,
                        message: "شماره تماس معتبر نیست",
                      },
                    ]}
                  >
                    <Input
                      prefix={<PhoneOutlined />}
                      placeholder="شماره تماس خود را وارد کنید"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item name="urgent" valuePropName="checked">
                    <Checkbox
                      style={{
                        border: "1px solid #d9d9d9",
                        padding: "8px",
                        borderRadius: "6px",
                        width: "100%",
                        background: "#fafafa",
                      }}
                    >
                      <span style={{ fontSize: "14px", fontWeight: 500 }}>
                        فوری
                      </span>
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name="negotiable" valuePropName="checked">
                    <Checkbox
                      style={{
                        border: "1px solid #d9d9d9",
                        padding: "8px",
                        borderRadius: "6px",
                        width: "100%",
                        background: "#fafafa",
                      }}
                    >
                      <span style={{ fontSize: "14px", fontWeight: 500 }}>
                        قابل مذاکره
                      </span>
                    </Checkbox>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="address"
                label="آدرس"
                rules={[
                  { required: true, message: "لطفا آدرس را وارد کنید" },
                  { min: 10, message: "آدرس باید حداقل 10 کاراکتر باشد" },
                ]}
              >
                <Input.TextArea rows={3} placeholder="آدرس دقیق را وارد کنید" />
              </Form.Item>

              <Form.Item label="موقعیت بر روی نقشه">
                <div style={{ height: 300, width: "100%", marginBottom: 10 }}>
                  <MapContainer
                    center={[location?.lat || 35.6892, location?.lng || 51.389]}
                    zoom={13}
                    style={{ height: "100%", borderRadius: 8 }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <LocationPicker
                      location={location}
                      setLocation={setLocation}
                    />
                  </MapContainer>
                </div>
                {!location && (
                  <Typography style={{ color: "red", fontSize: "12px" }}>
                    برای انتخاب موقعیت روی نقشه کلیک کنید
                  </Typography>
                )}
              </Form.Item>

              <Form.Item
                name="image"
                label="تصویر آگهی"
                valuePropName="fileList"
                getValueFromEvent={(e) => e?.fileList}
                rules={[
                  { required: true, message: "لطفا تصویر آگهی را آپلود کنید" },
                ]}
              >
                <Upload
                  listType="picture-card"
                  maxCount={1}
                  beforeUpload={() => false}
                  accept="image/*"
                >
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>آپلود تصویر</div>
                </Upload>
              </Form.Item>
              <Form.Item style={{ textAlign: "center", marginTop: 40 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  style={{ minWidth: 200 }}
                  loading={loading}
                  disabled={!location}
                >
                  ثبت آگهی
                </Button>
              </Form.Item>
            </Form>
            <ContractPermisens
              content={RulsTips}
              title="قوانین ثبت آگهی در آگیتو"
            />
          </Card>
        </Col>
      </Row>
    </ConfigProvider>
  );
};

export default AddAd;

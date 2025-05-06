import { Button, ConfigProvider, Form, Input, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otpvalue, setotpvalue] = useState<number>();
  const handlePhoneSubmit = (values: any) => {
    setPhoneNumber(values.phone);
    setShowOTP(true);
  };

  const handleOTPSubmit = (values: any) => {
    console.log("کد تایید ارسال شد:", values.otp);
    if (otpvalue === 431291) {
      navigate("/dashboard");
    } else {
      form.setFields([
        {
          name: "otp",
          errors: ["کد وارد شده صحیح نمیباشد"],
        },
      ]);
    }
  };

  return (
    <div
      className="signup-container"
      style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}
    >
      <ConfigProvider direction="rtl">
        {!showOTP ? (
          <Form form={form} layout="vertical" onFinish={handlePhoneSubmit}>
            <Typography.Title level={2} style={{ textAlign: "center" }}>
              ثبت نام
            </Typography.Title>
            <Form.Item
              style={{ textAlign: "right" }}
              name="phone"
              label={<span style={{ direction: "rtl" }}>شماره موبایل</span>}
              rules={[
                {
                  required: true,
                  message: "لطفا شماره موبایل خود را وارد کنید",
                },
                { pattern: /^09\d{9}$/, message: "شماره موبایل نامعتبر است" },
              ]}
            >
              <Input placeholder="۰۹۱۲۳۴۵۶۷۸۹" maxLength={11} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                دریافت کد تایید
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Form form={form} layout="vertical" onFinish={handleOTPSubmit}>
            <Typography.Title level={2} style={{ textAlign: "center" }}>
              تایید کد
            </Typography.Title>
            <Typography.Text
              style={{
                display: "block",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              کد تایید به شماره <a href="#">{phoneNumber}</a> ارسال شد
            </Typography.Text>
            <Form.Item
              name="otp"
              rules={[
                { required: true, message: "لطفا کد تایید را وارد کنید" },
                { len: 6, message: "کد تایید باید ۶ رقم باشد" },
              ]}
            >
              <Input.Password
                placeholder="کد تایید را وارد کنید"
                maxLength={6}
                value={otpvalue}
                onChange={(e) => setotpvalue(Number(e.target.value))}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                تایید
              </Button>
            </Form.Item>
            <Button type="link" block onClick={() => setShowOTP(false)}>
              تغییر شماره موبایل
            </Button>
          </Form>
        )}
      </ConfigProvider>
    </div>
  );
};
export default SignUp;

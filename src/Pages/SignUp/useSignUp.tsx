import { Form, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSignUp = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otpvalue, setotpvalue] = useState<number>();
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePhoneSubmit = (values: any) => {
    setPhoneNumber(values.phone);
    setShowOTP(true);
  };

  const handleOTPSubmit = (values: any) => {
    console.log("کد تایید ارسال شد:", values.otp);
    if (otpvalue === 431291) {
      setShowSuccess(true);
      message.success("ورود موفقیت آمیز بود خوش آمدید");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      form.setFields([
        {
          name: "otp",
          errors: ["کد وارد شده صحیح نمیباشد"],
        },
      ]);
    }
  };

  return {
    form,
    phoneNumber,
    setShowOTP,
    showOTP,
    setShowSuccess,
    setPhoneNumber,
    showSuccess,
    otpvalue,
    setotpvalue,
    handleOTPSubmit,
    handlePhoneSubmit,
  };
};

export default useSignUp;

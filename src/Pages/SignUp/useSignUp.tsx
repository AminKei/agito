import { Form, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  token: string;
}

const useSignUp = (setUser?: (user: User | null) => void) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otpvalue, setotpvalue] = useState<number>();
  const [showSuccess, setShowSuccess] = useState(false);

  // Simulate token generation (JWT-like structure)
  const generateToken = (phone: string): string => {
    const payload = {
      phone,
      exp: Math.floor(Date.now() / 1000) + 2 * 24 * 60 * 60, // 2 days expiration
      iat: Math.floor(Date.now() / 1000),
    };
    // In a real app, this would be signed with a secret key on the backend
    const token = btoa(JSON.stringify(payload)); // Simplified base64 encoding for demo
    return token;
  };

  const handlePhoneSubmit = (values: any) => {
    setPhoneNumber(values.phone);
    setShowOTP(true);
  };

  const handleOTPSubmit = (values: any) => {
    console.log("کد تایید ارسال شد:", values.otp);
    if (otpvalue === 431291) {
      setShowSuccess(true);
      message.success("ورود موفقیت آمیز بود خوش آمدید");
      const token = generateToken(phoneNumber);
      const username = phoneNumber.slice(0, 8); // Derive username from phone number
      localStorage.setItem("authToken", token);
      localStorage.setItem("username", username);
      if (setUser) {
        setUser({ username, token });
      }
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

  const isAuthenticated = (): boolean => {
    const token = localStorage.getItem("authToken");
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch {
      return false;
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
    isAuthenticated,
  };
};

export default useSignUp;
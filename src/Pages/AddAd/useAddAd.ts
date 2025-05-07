import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, message } from "antd";

export const useAddAd = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFinish = (values: any) => {
    setLoading(true);
    const fileList = values.image || [];
    if (fileList.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        saveAd(values, [imageUrl] as any);
      };
      reader.onerror = () => {
        message.error("خطا در بارگذاری تصویر");
        setLoading(false);
      };
      reader.readAsDataURL(fileList[0].originFileObj);
    } else {
      saveAd(values, [] as any);
    }
  };

  const saveAd = (values: any, imageUrl: string | null) => {
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

  return {
    form,
    loading,
    location,
    setLocation,
    showSuccess,
    handleFinish
  };
};

import { useState, useEffect } from "react";
import { Ad } from "../../Models/AdModel"; // فرض می‌کنیم مدل Ad تعریف شده
import {  adsData } from "../../ApiData/adsData";

export const useHomeState = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000000000]);
  const [conditionFilter, setConditionFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [urgentFilter, setUrgentFilter] = useState<string>("false");
  const [negotiableFilter, setNegotiableFilter] = useState<string>("false");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [loading, setLoading] = useState<boolean>(true);
  const [ads, setAds] = useState<Ad[]>([]);
  const [filteredAds, setFilteredAds] = useState<Ad[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const isMobile = window.innerWidth <= 768;
  const [showMobileFilter, setShowMobileFilter] = useState<boolean>(false);

  // لود داده‌ها از localStorage یا استفاده از داده‌های پیش‌فرض
  useEffect(() => {
    setLoading(true);
    try {
      const storedAds = localStorage.getItem("ads");
      if (storedAds) {
        const parsedAds: Ad[] = JSON.parse(storedAds);
        setAds(parsedAds);
        setFilteredAds(parsedAds);
      } else {
        // اگر داده‌ای در localStorage نبود، از داده‌های پیش‌فرض استفاده کن
        setAds(adsData);
        setFilteredAds(adsData);
        localStorage.setItem("ads", JSON.stringify(adsData)); // ذخیره برای دفعات بعدی
      }
    } catch (error) {
      console.error("Error loading ads:", error);
      // در صورت خطا، از داده‌های پیش‌فرض استفاده کن
      setAds(adsData);
      setFilteredAds(adsData);
      localStorage.setItem("ads", JSON.stringify(adsData));
    } finally {
      setLoading(false);
    }
  }, []);

  // اعمال فیلترها و جستجو
  useEffect(() => {
    let result = [...ads];

    // اعمال جستجو
    if (searchQuery) {
      result = result.filter((ad) =>
        ad.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // اعمال فیلتر محدوده قیمت
    result = result.filter(
      (ad) => ad.price >= priceRange[0] && ad.price <= priceRange[1]
    );

    // اعمال فیلتر شهر
    if (cityFilter !== "all") {
      result = result.filter((ad) => ad.city === cityFilter);
    }

    // اعمال فیلتر دسته‌بندی
    if (categoryFilter !== "all") {
      result = result.filter((ad) => ad.category === categoryFilter);
    }

    // اعمال فیلتر وضعیت
    if (conditionFilter !== "all") {
      result = result.filter((ad) => ad.condition === conditionFilter);
    }

    // اعمال فیلتر فوری (فقط وقتی true باشه)
    if (urgentFilter === "true") {
      result = result.filter((ad) => ad.urgent === true);
    }

    // اعمال فیلتر قابل مذاکره (فقط وقتی true باشه)
    if (negotiableFilter === "true") {
      result = result.filter((ad) => ad.negotiable === true);
    }

    // اعمال مرتب‌سازی
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "priceLow":
        result.sort((a, b) => a.price - b.price);
        break;
      case "priceHigh":
        result.sort((a, b) => b.price - a.price);
        break;
    }

    setFilteredAds(result);
  }, [
    ads,
    searchQuery,
    priceRange,
    cityFilter,
    categoryFilter,
    conditionFilter,
    urgentFilter,
    negotiableFilter,
    sortBy,
  ]);

  // مدیریت جستجو
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // مدیریت حذف آگهی
  const handleDelete = (id: string) => {
    const updatedAds = ads.filter((ad) => ad.id !== id);
    setAds(updatedAds);
    setFilteredAds(updatedAds);
    localStorage.setItem("ads", JSON.stringify(updatedAds));
  };

  return {
    priceRange,
    setPriceRange,
    conditionFilter,
    setConditionFilter,
    categoryFilter,
    setCategoryFilter,
    cityFilter,
    setCityFilter,
    urgentFilter,
    setUrgentFilter,
    negotiableFilter,
    setNegotiableFilter,
    sortBy,
    setSortBy,
    loading,
    isMobile,
    showMobileFilter,
    setShowMobileFilter,
    handleDelete,
    handleSearch,
    filteredAds,
  };
};
import { useState, useEffect } from "react";
import { message } from "antd";
import { Ad } from "../../Models/AdModel";
import adsData from "../../ApiData/adsData.json";

export const useHomeState = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000000000]);
  const [conditionFilter, setConditionFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [urgentFilter, setUrgentFilter] = useState<string>("all"); // فیلتر جدید برای urgent
  const [negotiableFilter, setNegotiableFilter] = useState<string>("all"); // فیلتر جدید برای negotiable
  const [sortBy, setSortBy] = useState<string>("newest");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1400);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    try {
      setLoading(true);
      const storedAds = localStorage.getItem("ads");
      if (storedAds) {
        const parsedAds = JSON.parse(storedAds);
        setAds(parsedAds);
      } else {
        setAds(adsData);
        localStorage.setItem("ads", JSON.stringify(adsData));
      }
      console.log("Loaded ads count:", ads.length);
    } catch (error) {
      console.error("Error loading ads:", error);
      message.error("خطا در بارگذاری آگهی‌ها");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = (id: string) => {
    try {
      const updatedAds = ads.filter((ad) => ad.id !== id);
      setAds(updatedAds);
      localStorage.setItem("ads", JSON.stringify(updatedAds));
      message.success("آگهی با موفقیت حذف شد");
    } catch (error) {
      console.error("Error deleting ad:", error);
      message.error("خطا در حذف آگهی");
    }
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const toggleMobileFilter = () => {
    setShowMobileFilter(!showMobileFilter);
  };

  const filteredAds = ads
    .filter((ad) => {
      if (
        searchQuery &&
        !Object.values(ad).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
        return false;
      const [minPrice, maxPrice] = priceRange;
      if (ad.price < minPrice || ad.price > maxPrice) return false;
      if (conditionFilter !== "all" && ad.condition !== conditionFilter)
        return false;
      if (categoryFilter !== "all" && ad.category !== categoryFilter)
        return false;
      if (cityFilter !== "all" && ad.city !== cityFilter) return false;
      if (urgentFilter !== "all" && ad.urgent !== (urgentFilter === "true"))
        return false; // فیلتر urgent
      if (negotiableFilter !== "all" && ad.negotiable !== (negotiableFilter === "true"))
        return false; // فیلتر negotiable
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "oldest")
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === "priceLow") return a.price - b.price;
      if (sortBy === "priceHigh") return b.price - a.price;
      return 0;
    });

  return {
    ads,
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
    searchQuery,
    isMobile,
    showMobileFilter,
    setShowMobileFilter,
    handleDelete,
    handleSearch,
    toggleMobileFilter,
    filteredAds,
  };
};
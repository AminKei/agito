import { useState, useEffect } from "react";
import { message } from "antd";
import { Ad } from "../../Interface";

export const useHomeState = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000000000]);
  const [conditionFilter, setConditionFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1400);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load ads from localStorage
  useEffect(() => {
    try {
      setLoading(true);
      const storedAds = localStorage.getItem("ads");
      if (storedAds) {
        const parsedAds = JSON.parse(storedAds);
        const adsWithSity = parsedAds.map((ad: Ad) => ({
          ...ad,
          sity: ad.city,
        }));
        setAds(adsWithSity);
      }
    } catch (error) {
      console.error("Error loading ads:", error);
      message.error("خطا در بارگذاری آگهی‌ها");
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle ad deletion
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

  // Handle search
  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  // Toggle mobile filter
  const toggleMobileFilter = () => {
    setShowMobileFilter(!showMobileFilter);
  };

  // Filter and sort ads
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
    })
    .map((ad) => ({
      ...ad,
      sity: ad.city,
    }));

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
    filteredAds
  };
};

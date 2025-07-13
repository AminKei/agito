import { useState, useEffect } from "react";
import { Ad } from "../../Models/AdModel"; // Assumed Ad model import

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

  // Load ads from localStorage (or API in a real app)
  useEffect(() => {
    setLoading(true);
    try {
      const storedAds = localStorage.getItem("ads");
      const parsedAds: Ad[] = storedAds ? JSON.parse(storedAds) : [];
      setAds(parsedAds);
      setFilteredAds(parsedAds);
    } catch (error) {
      console.error("Error loading ads:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle search and filtering
  useEffect(() => {
    let result = [...ads];

    // Apply search query
    if (searchQuery) {
      result = result.filter((ad) =>
        ad.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply price range filter
    result = result.filter(
      (ad) => ad.price >= priceRange[0] && ad.price <= priceRange[1]
    );

    // Apply city filter
    if (cityFilter !== "all") {
      result = result.filter((ad) => ad.city === cityFilter);
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter((ad) => ad.category === categoryFilter);
    }

    // Apply condition filter
    if (conditionFilter !== "all") {
      result = result.filter((ad) => ad.condition === conditionFilter);
    }

    // Apply urgent filter (only when true)
    if (urgentFilter === "true") {
      result = result.filter((ad) => ad.urgent === true);
    }
    // Note: No else clause; when urgentFilter is "false", skip filtering (equivalent to "all")

    // Apply negotiable filter (only when true)
    if (negotiableFilter === "true") {
      result = result.filter((ad) => ad.negotiable === true);
    }
    // Note: No else clause; when negotiableFilter is "false", skip filtering (equivalent to "all")

    // Apply sorting
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case "oldest":
        result.sort((a, b) => parseInt(a.id) - parseInt(b.id));
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

  // Handle search input
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle ad deletion
  const handleDelete = (id: string) => {
    const updatedAds = ads.filter((ad) => ad.id !== id);
    setAds(updatedAds);
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
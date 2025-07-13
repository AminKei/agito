import React from "react";
import {
  Select,
  Space,
  Layout,
  Empty,
  Spin,
  Button,
  Drawer,
  Input,
} from "antd";
import AdsItem from "../AdsItem/AdsItem";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { useHomeState } from "./useHomeState";
import FilterContent from "../../Components/FilterContent/FilterContent";

const { Sider, Content } = Layout;

const Home: React.FC = () => {
  const {
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
  } = useHomeState();

  return (
    <Layout
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
      }}
    >
      <Content
        style={{
          flex: 1,
          padding: "0px",
          background: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "-2vh",
            marginBottom: "3vh",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "10px" : "0",
          }}
        >
          {isMobile ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                width: "100%",
              }}
            >
              <Input
                placeholder="جستجو در همه آگهی‌ها"
                style={{ width: "100%", textAlign: "right", direction: "rtl" }}
                size="large"
                suffix={<SearchOutlined />}
                onChange={(e) => handleSearch(e.target.value)}
                onPressEnter={(e) =>
                  handleSearch((e.target as HTMLInputElement).value)
                }
              />
              <Button
                type="primary"
                icon={<FilterOutlined />}
                onClick={() => setShowMobileFilter(true)}
                style={{ width: "25%", height: "38px" }}
              >
                فیلترها
              </Button>
            </div>
          ) : (
            <Input
              placeholder="جستجو در همه آگهی‌ها"
              style={{ width: 400, textAlign: "right", direction: "rtl" }}
              size="large"
              suffix={<SearchOutlined />}
              onChange={(e) => handleSearch(e.target.value)}
              onPressEnter={(e) =>
                handleSearch((e.target as HTMLInputElement).value)
              }
            />
          )}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Spin size="large" />
            <p style={{ marginTop: "10px" }}>در حال بارگذاری آگهی‌ها...</p>
          </div>
        ) : filteredAds.length > 0 ? (
          <AdsItem ads={filteredAds} onDelete={handleDelete} />
        ) : (
          <Empty
            description="هیچ آگهی یافت نشد"
            style={{ marginTop: "50px" }}
          />
        )}
      </Content>

      {isMobile ? (
        <Drawer
          title="فیلترها"
          placement="right"
          onClose={() => setShowMobileFilter(false)}
          open={showMobileFilter}
          width="80%"
        >
          <FilterContent
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            conditionFilter={conditionFilter}
            setConditionFilter={setConditionFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            cityFilter={cityFilter}
            setCityFilter={setCityFilter}
            urgentFilter={urgentFilter}
            setUrgentFilter={setUrgentFilter}
            negotiableFilter={negotiableFilter}
            setNegotiableFilter={setNegotiableFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </Drawer>
      ) : (
        <Sider
          width={350}
          style={{
            background: "none",
            padding: "30px",
            position: "fixed",
            right: "10px",
            top: "70px",
            minHeight: "100%",
          }}
        >
          <FilterContent
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            conditionFilter={conditionFilter}
            setConditionFilter={setConditionFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            cityFilter={cityFilter}
            setCityFilter={setCityFilter}
            urgentFilter={urgentFilter}
            setUrgentFilter={setUrgentFilter}
            negotiableFilter={negotiableFilter}
            setNegotiableFilter={setNegotiableFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </Sider>
      )}
    </Layout>
  );
};

export default Home;

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
    sortBy,
    setSortBy,
    loading,
    isMobile,
    showMobileFilter,
    setShowMobileFilter,
    handleDelete,
    handleSearch,
    filteredAds
  } = useHomeState();

  const FilterContent = () => (
    <Space direction="vertical" style={{ width: "100%", gap: "15px" , marginTop:"3px"}}>
      {/* Price Range Dropdown */}
      <div>
        <p
          style={{
            marginBottom: "8px",
            fontWeight: "bold",
            textAlign: "right",
          }}
        >
          محدوده قیمت (تومان)
        </p>
        <Select
          style={{
            width: "100%",
            fontSize: "14px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          placeholder="انتخاب محدوده قیمت"
          value={
            priceRange[0] === 0 && priceRange[1] === 1000000000000
              ? undefined
              : `${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}`
          }
          onChange={(value: string) => {
            if (value) {
              const [minStr, maxStr] = value.split(" - ");
              const min = parseInt(minStr.replace(/,/g, ""), 10);
              const max = parseInt(maxStr.replace(/,/g, ""), 10);
              setPriceRange([min, max]);
            } else {
              setPriceRange([0, 1000000000000]);
            }
          }}
        >
          <Select.Option value="">همه</Select.Option>
          <Select.Option value="0 - 1000000">0 - 1 میلیون</Select.Option>
          <Select.Option value="1000001 - 5000000">
            1 میلیون - 5 میلیون
          </Select.Option>
          <Select.Option value="5000001 - 10000000">
            5 میلیون - 10 میلیون
          </Select.Option>
          <Select.Option value="10000001 - 50000000">
            10 میلیون - 50 میلیون
          </Select.Option>
          <Select.Option value="50000001 - 100000000">
            50 میلیون - 100 میلیون
          </Select.Option>
          <Select.Option value="100000001 - 500000000">
            100 میلیون - 500 میلیون
          </Select.Option>
          <Select.Option value="500000001 - 1000000000">
            500 میلیون - 1 میلیارد
          </Select.Option>
          <Select.Option value="1000000001 - 250000000000">
            1 میلیارد - 250 میلیارد
          </Select.Option>
          <Select.Option value="250000000001 - 500000000000">
            250 میلیارد - 500 میلیارد
          </Select.Option>
          <Select.Option value="500000000001 - 750000000000">
            500 میلیارد - 750 میلیارد
          </Select.Option>
          <Select.Option value="750000000001 - 1000000000000">
            750 میلیارد - 1 تریلیون
          </Select.Option>
        </Select>
      </div>
      {/* City Filter */}
      <div>
        <p
          style={{
            marginBottom: "8px",
            fontWeight: "bold",
            textAlign: "right",
          }}
        >
          شهر
        </p>
        <Select
          style={{ width: "100%" }}
          value={cityFilter}
          onChange={(value) => setCityFilter(value)}
        >
          <Select.Option value="all">همه</Select.Option>
          <Select.Option value="tehran">تهران</Select.Option>
          <Select.Option value="mashhad">مشهد</Select.Option>
          <Select.Option value="isfahan">اصفهان</Select.Option>
          <Select.Option value="shiraz">شیراز</Select.Option>
          <Select.Option value="tabriz">تبریز</Select.Option>
          <Select.Option value="karaj">کرج</Select.Option>
        </Select>
      </div>

      {/* Category Filter */}
      <div>
        <p
          style={{
            marginBottom: "8px",
            fontWeight: "bold",
            textAlign: "right",
          }}
        >
          دسته بندی
        </p>
        <Select
          style={{ width: "100%" }}
          value={categoryFilter}
          onChange={(value) => setCategoryFilter(value)}
        >
          <Select.Option value="all">همه</Select.Option>
          <Select.Option value="electronics">الکترونیک</Select.Option>
          <Select.Option value="vehicles">خودرو</Select.Option>
          <Select.Option value="property">املاک</Select.Option>
          <Select.Option value="home">لوازم خانگی</Select.Option>
          <Select.Option value="services">خدمات</Select.Option>
          <Select.Option value="clothing">پوشاک</Select.Option>
          <Select.Option value="sports">ورزشی</Select.Option>
          <Select.Option value="books">کتاب و لوازم التحریر</Select.Option>
        </Select>
      </div>

      {/* Condition Filter */}
      <div>
        <p
          style={{
            marginBottom: "8px",
            fontWeight: "bold",
            textAlign: "right",
          }}
        >
          وضعیت کالا
        </p>
        <Select
          style={{ width: "100%" }}
          value={conditionFilter}
          onChange={(value) => setConditionFilter(value)}
        >
          <Select.Option value="all">همه</Select.Option>
          <Select.Option value="new">نو</Select.Option>
          <Select.Option value="like-new">در حد نو</Select.Option>
          <Select.Option value="used">کارکرده</Select.Option>
          <Select.Option value="needs-repair">نیاز به تعمیر</Select.Option>
        </Select>
      </div>

      {/* Sorting */}
      <div>
        <p
          style={{
            marginBottom: "8px",
            fontWeight: "bold",
            textAlign: "right",
          }}
        >
          مرتب سازی
        </p>
        <Select
          style={{ width: "100%" }}
          value={sortBy}
          onChange={(value) => setSortBy(value)}
        >
          <Select.Option value="newest">جدیدترین</Select.Option>
          <Select.Option value="oldest">قدیمی‌ترین</Select.Option>
          <Select.Option value="priceLow">قیمت: کم به زیاد</Select.Option>
          <Select.Option value="priceHigh">قیمت: زیاد به کم</Select.Option>
        </Select>
      </div>
    </Space>
  );

  return (
    <Layout
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        background: "none",
      }}
    >
      <Content
        style={{
          flex: 1,
          padding: "0px",
          background: "#fff",
        }}
      >
        {/* Search and Filter Buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "-1vh",
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
                placeholder="جستجو در همه آگهی ها"
                style={{ width: "100%", textAlign: "right" }}
                size="large"
                suffix={<SearchOutlined />}
                onChange={(e) => handleSearch(e.target.value)}
                onPressEnter={(e) => handleSearch((e.target as HTMLInputElement).value)}
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
              placeholder="جستجو در همه آگهی ها"
              style={{ width: 400 }}
              size="large"
              suffix={<SearchOutlined />}
              onChange={(e) => handleSearch(e.target.value)}
              onPressEnter={(e) => handleSearch((e.target as HTMLInputElement).value)}
            />
          )}
        </div>

        {/* Ads List / Loader / Empty */}
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

      {/* Mobile Filter Drawer or Sidebar */}
      {isMobile ? (
        <Drawer
          title="فیلترها"
          placement="right"
          onClose={() => setShowMobileFilter(false)}
          open={showMobileFilter}
          width="80%"
        >
          <FilterContent />
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
          <FilterContent />
        </Sider>
      )}
    </Layout>
  );
};

export default Home;

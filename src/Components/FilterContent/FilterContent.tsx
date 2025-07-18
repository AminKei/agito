import React from "react";
import { Select, Space, Switch, Typography } from "antd";

interface FilterContentProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  conditionFilter: string;
  setConditionFilter: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  cityFilter: string;
  setCityFilter: (value: string) => void;
  urgentFilter: string;
  setUrgentFilter: (value: string) => void;
  negotiableFilter: string;
  setNegotiableFilter: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

const FilterContent: React.FC<FilterContentProps> = ({
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
}) => {
  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
        gap: "12px",
        zIndex: 1000,
      }}
    >
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
          direction="rtl"
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
          direction="rtl"
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
      <div>
        <p
          style={{
            marginBottom: "8px",
            fontWeight: "bold",
            textAlign: "right",
          }}
        >
          دسته‌بندی
        </p>
        <Select
          style={{ width: "100%" }}
          value={categoryFilter}
          onChange={(value) => setCategoryFilter(value)}
          direction="rtl"
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
          direction="rtl"
        >
          <Select.Option value="all">همه</Select.Option>
          <Select.Option value="new">نو</Select.Option>
          <Select.Option value="like-new">در حد نو</Select.Option>
          <Select.Option value="used">کارکرده</Select.Option>
          <Select.Option value="needs-repair">نیاز به تعمیر</Select.Option>
        </Select>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "7px",
          border: "solid 1px #dadada",
          padding: "5px",
          height: "40px",
          marginTop: "2vh",
        }}
      >
        <Switch
          checked={urgentFilter === "true"}
          onChange={(checked) => setUrgentFilter(checked ? "true" : "false")}
        />
        <p
          style={{
            marginBottom: "8px",
            fontWeight: "bold",
            textAlign: "right",
          }}
        >
          فوری
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "7px",
          border: "solid 1px #dadada",
          padding: "5px",
          height: "40px",
          marginTop: "2vh",
        }}
      >
        <Switch
          checked={negotiableFilter === "true"}
          onChange={(checked) =>
            setNegotiableFilter(checked ? "true" : "false")
          }
        />
        <p
          style={{
            marginBottom: "8px",
            fontWeight: "bold",
            textAlign: "right",
          }}
        >
          قابل مذاکره
        </p>
      </div>
      <div>
        <p
          style={{
            marginBottom: "8px",
            fontWeight: "bold",
            textAlign: "right",
          }}
        >
          مرتب‌سازی
        </p>
        <Select
          style={{ width: "100%" }}
          value={sortBy}
          onChange={(value) => setSortBy(value)}
          direction="rtl"
        >
          <Select.Option value="newest">جدیدترین</Select.Option>
          <Select.Option value="oldest">قدیمی‌ترین</Select.Option>
          <Select.Option value="priceLow">قیمت: کم به زیاد</Select.Option>
          <Select.Option value="priceHigh">قیمت: زیاد به کم</Select.Option>
        </Select>
      </div>
    </Space>
  );
};

export default FilterContent;

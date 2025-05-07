import React, { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Space,
  Modal,
  message,
  Select,
  Form,
  Tabs,
  Card,
  Row,
  Col,
  Tag,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  HomeOutlined,
  ProfileOutlined,
  SettingOutlined,
  FolderOutlined,
  LogoutOutlined,
  EyeOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const {} = Select;
const { TabPane } = Tabs;

interface Post {
  key: number;
  title: string;
  description: string;
  date: string;
  status: "فعال" | "در انتظار" | "فروخته شده";
  price: string;
  location: string;
  category: string;
  views: number;
  image: string;
}

const initialPosts: Post[] = [
  {
    key: 1,
    title: "موتور سیکلت برای فروش",
    description: "موتور در وضعیت خوبی است.",
    date: "2025-04-20",
    status: "فعال",
    price: "۱۵,۰۰۰,۰۰۰ تومان",
    location: "تهران، تجریش",
    category: "وسایل نقلیه",
    views: 150,
    image: "https://via.placeholder.com/150",
  },
  {
    key: 2,
    title: "لپ‌تاپ دست‌دوم",
    description: "گیمینگ با مشخصات بالا.",
    date: "2025-04-18",
    status: "در انتظار",
    price: "۲۵,۰۰۰,۰۰۰ تومان",
    location: "تهران، ونک",
    category: "کالای دیجیتال",
    views: 89,
    image: "https://via.placeholder.com/150",
  },
];

const Dashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [activeTab, setActiveTab] = useState("active");

  const [form] = Form.useForm();

  const handleEdit = (record: Post) => {
    form.setFieldsValue(record);
    setCurrentPost(record);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleDelete = (key: number) => {
    Modal.confirm({
      title: "آیا مطمئن هستید؟",
      content: "با حذف این آگهی، اطلاعات آن از بین می‌رود.",
      onOk: () => {
        setPosts((prev) => prev.filter((post) => post.key !== key));
        message.success("آگهی حذف شد");
      },
    });
  };

  const handleLogout = () => {
    Modal.confirm({
      title: "خروج از حساب",
      content: "آیا مطمئن هستید که می‌خواهید خارج شوید؟",
      okText: "بله",
      cancelText: "خیر",
      onOk: () => {
        message.success("با موفقیت خارج شدید");
      },
    });
  };

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "خانه",
      children: [
        { key: "dashboard", label: "داشبورد" },
        { key: "analytics", label: "تحلیل‌ها" },
      ],
    },
    {
      key: "posts",
      icon: <FolderOutlined />,
      label: "آگهی‌های من",
      children: [
        { key: "active-posts", label: "آگهی‌های فعال" },
        { key: "pending-posts", label: "در انتظار تایید" },
        { key: "sold-posts", label: "فروخته شده" },
      ],
    },
    {
      key: "profile",
      icon: <ProfileOutlined />,
      label: "پروفایل",
      children: [
        { key: "edit-profile", label: "ویرایش پروفایل" },
        { key: "settings", label: "تنظیمات حساب" },
      ],
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "تنظیمات",
      children: [
        { key: "notifications", label: "اعلان‌ها" },
        { key: "privacy", label: "حریم خصوصی" },
      ],
    },
  ];

  const renderPostCard = (post: Post) => (
    <Card
      hoverable
      style={{ marginBottom: 16, width: "100%" }}
      className="post-card"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <img
          alt={post.title}
          src={post.image}
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}
        >
          <div>
            <h3 style={{ fontSize: 18, marginBottom: 8 }}>{post.title}</h3>
            <p style={{ color: "#666", marginBottom: 12 }}>
              {post.description}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Tag color="blue">{post.category}</Tag>
              <Tag color="green">{post.price}</Tag>
              <Tag color="orange">{post.location}</Tag>
            </div>
            <div
              style={{
                display: "flex",
                gap: 16,
                color: "#666",
                flexWrap: "wrap",
              }}
            >
              <span>
                <EyeOutlined /> {post.views} بازدید
              </span>
              <span>
                <ClockCircleOutlined />{" "}
                {new Date(post.date).toLocaleDateString("fa-IR")}
              </span>
            </div>
            <Space style={{ marginTop: 8 }}>
              <Button
                type="primary"
                size="small"
                icon={<EditOutlined />}
                onClick={() => handleEdit(post)}
              >
                ویرایش
              </Button>
              <Button
                danger
                size="small"
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(post.key)}
              >
                حذف
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <Layout style={{ minHeight: "100vh", direction: "rtl" }}>
      <Sider
        width={220}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          height: "100vh",
          zIndex: 1000,
        }}
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div
          style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["posts"]}
            defaultOpenKeys={["posts"]}
            style={{ flex: 1, backgroundColor: "white" }}
            items={menuItems}
          />
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{
              margin: "16px",
              transition: "all 0.3s ease",
              borderRadius: "8px",
            }}
            block
          >
            خروج از حساب
          </Button>
        </div>
      </Sider>
      <Layout
        style={{ marginRight: collapsed ? 0 : 220, transition: "all 0.2s" }}
      >
        <Header
          style={{
            background: "#ffffff",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <p style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>
            آگهی‌های من
          </p>
        </Header>
        <Content
          style={{
            padding: 24,
            overflow: "auto",
            flex: 1,
            backgroundColor: "#ffffff",
          }}
        >
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab="آگهی‌های فعال" key="active">
              <Row gutter={[16, 16]}>
                {posts
                  .filter((post) => post.status === "فعال")
                  .map((post) => (
                    <Col xs={24} sm={24} md={12} lg={8} xl={6} key={post.key}>
                      {renderPostCard(post)}
                    </Col>
                  ))}
              </Row>
            </TabPane>
            <TabPane tab="در انتظار تایید" key="pending">
              <Row gutter={[16, 16]}>
                {posts
                  .filter((post) => post.status === "در انتظار")
                  .map((post) => (
                    <Col xs={24} sm={24} md={12} lg={8} xl={6} key={post.key}>
                      {renderPostCard(post)}
                    </Col>
                  ))}
              </Row>
            </TabPane>
            <TabPane tab="فروخته شده" key="sold">
              <Row gutter={[16, 16]}>
                {posts
                  .filter((post) => post.status === "فروخته شده")
                  .map((post) => (
                    <Col xs={24} sm={24} md={12} lg={8} xl={6} key={post.key}>
                      {renderPostCard(post)}
                    </Col>
                  ))}
              </Row>
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

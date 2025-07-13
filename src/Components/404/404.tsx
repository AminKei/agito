import { Button } from "antd";

const Error404 = () => {
  return (
    <div
      style={{
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1 
        style={{ 
          fontSize: "clamp(5rem, 15vw, 10rem)", 
          margin: 0, 
          color: "#1890ff",
          lineHeight: 1.2,
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: "clamp(1.5rem, 4vw, 2rem)",
          margin: "20px 0",
          color: "rgba(0, 0, 0, 0.85)",
          wordWrap: "break-word",
        }}
      >
        صفحه پیدا نشد
      </h2>
      <p 
        style={{ 
          color: "rgba(0, 0, 0, 0.45)", 
          marginBottom: "24px",
          fontSize: "clamp(0.9rem, 2vw, 1rem)",
          maxWidth: "90%",
        }}
      >
        متاسفانه صفحه مورد نظر شما یافت نشد
      </p>
      <div>
        <Button 
          type="primary" 
          href="/"
          style={{
            fontSize: "clamp(0.9rem, 2vw, 1rem)",
            padding: "clamp(8px, 2vw, 16px) clamp(16px, 4vw, 32px)",
          }}
        >
          بازگشت به خانه
        </Button>
      </div>
    </div>
  );
};

export default Error404;

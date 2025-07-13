import { Spin } from "antd";

const ScreenLoading = () => {
    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spin size="large" tip="Loading..." />
        </div>
    );
}
 
export default ScreenLoading;
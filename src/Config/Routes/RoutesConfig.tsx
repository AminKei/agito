import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ScreenLoading from "../../Components/ScreenLoading/ScreenLoading";
import Error404 from "../../Components/404/404";

const Home = lazy(() => import("../../Pages/Home/Home"));
const AddAd = lazy(() => import("../../Pages/AddAd/AddAd"));
const AdsPage = lazy(() => import("../../Pages/AdsPage/AdsPage"));
const SignUp = lazy(() => import("../../Pages/SignUp/SignUp"));
const Profile = lazy(() => import("../../Pages/Profile/Profile"));
const RulesPage = lazy(() => import("../../Pages/RulesPage/RulesPage"));

interface RoutesConfigProps {
  user: { username: string; token: string } | null;
  setUser: (user: { username: string; token: string } | null) => void;
}

const RoutesConfig: React.FC<RoutesConfigProps> = ({ user, setUser }) => {
  return (
    <Suspense fallback={<ScreenLoading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddAd />} />
        <Route path="/rulespage" element={<RulesPage user={user} />} />
        <Route path="/signup" element={<SignUp setUser={setUser} />} />
        <Route path="/adspage/:id" element={<AdsPage />} />
        <Route
          path="/profile"
          element={<Profile setUser={setUser} user={user} />}
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  );
};

export default RoutesConfig;

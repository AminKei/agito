import { useNavigate } from "react-router-dom";
import { RoutePath } from "../Constants/Routes.Path";

const useRedirect = () => {
  const navigate = useNavigate();

  function navigateToProfile(path: string) {
    navigate(RoutePath.profile);
  }

  return { navigateToProfile };
};

export default useRedirect;

import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { RootState } from "../redux";
import MainRoute from "./MainRoute";
import LoginRoute from "./LoginRoute";

function AppRoutes() {
  const { isAuth } = useSelector((state: RootState) => state.auth);

  return <BrowserRouter>{isAuth ? <MainRoute /> : <LoginRoute />}</BrowserRouter>;
}

export default AppRoutes;

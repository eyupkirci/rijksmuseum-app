import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";

function LoginRoute() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
}

export default LoginRoute;

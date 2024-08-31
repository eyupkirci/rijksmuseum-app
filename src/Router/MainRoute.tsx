import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

function MainRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
}

export default MainRoute;

import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail";

function MainRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:objectNumber" element={<Detail />} />
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
}

export default MainRoute;

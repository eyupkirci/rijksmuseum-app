// import "./App.css";

import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RootState } from "./redux/store";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const { isAuth } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <header>Header</header>
      <main>
        <BrowserRouter>
          {isAuth ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          )}
        </BrowserRouter>
      </main>
      <footer>Footer</footer>
    </>
  );
}

export default App;

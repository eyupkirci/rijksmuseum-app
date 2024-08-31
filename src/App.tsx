// import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AppRoutes from "./Router/AppRoutes";

function App() {
  return (
    <div className="flex  h-screen flex-col  justify-between">
      <Header />
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;

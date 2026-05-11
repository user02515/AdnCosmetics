import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Brands from "./pages/Brands";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/productos"
          element={<Products />}
        />

        <Route
          path="/producto/:id"
          element={<ProductDetail />}
        />

        <Route
          path="/marcas"
          element={<Brands />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
import { Routes, Route } from "react-router-dom";

import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Brands from "./pages/Brands";

function App() {

  return (
    <Routes>

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
  );
}

export default App;
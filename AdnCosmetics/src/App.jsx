
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

import ACercaDe from './pages/sobre-nosotros.jsx'
import Home from './pages/home.jsx'
import Categoria from './pages/Categorias.jsx'
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Brands from "./pages/Brands";
import AddBrand from "./pages/AddBrand";
import EditBrand from "./pages/EditBrand";
import DeleteBrand from "./pages/DeleteBrand";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import DeleteProduct from "./pages/DeleteProduct";
import EditCarousel from "./pages/EditCarousel";

function App() {
  return (
    <>
      {/* ── NAVBAR ── */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre-nosotros" element={<ACercaDe />} />

        {/* NUEVA PAGINA */}
        <Route path="/categorias" element={<Categoria />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/marcas" element={<Brands />} />
        <Route path="/marcas/añadir" element={<AddBrand />} />
        <Route path="/marcas/editar/:id" element={<EditBrand />} />
        <Route path="/marcas/eliminar/:id" element={<DeleteBrand />} />
        <Route path="/productos/añadir" element={<AddProduct />} />
        <Route path="/productos/editar/:id" element={<EditProduct />} />
        <Route path="/productos/eliminar/:id" element={<DeleteProduct />} />
        <Route path="/edit-carousel" element={<EditCarousel />} />
      </Routes>

      <Footer />
    </>
  )
}


export default App


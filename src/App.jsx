
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

import ACercaDe from './pages/sobre-nosotros.jsx'
import Home from './pages/home.jsx'
import Categoria from './pages/Categorias.jsx'
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Brands from "./pages/Brands";
import AdminLogin from './pages/adminlogin.jsx'


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
        <Route path='/admin/login' element={<AdminLogin />} />
      </Routes>

      <Footer />
    </>
  )
}


export default App


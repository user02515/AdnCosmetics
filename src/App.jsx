
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

import ACercaDe from './pages/sobre-nosotros.jsx'
import Home from './pages/home.jsx'
import Categoria from './pages/Categorias.jsx'
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Brands from "./pages/Brands";
import AdminLogin from './pages/adminPages/adminlogin.jsx'
import AdminDashboard from './pages/adminPages/adminDashboard.jsx'

// Paginas de administración
import ProductsAdmin from './pages/adminPages/ProductsAdmin.jsx'
import CategoriasAdmin from './pages/adminPages/CategoriasAdmin.jsx'
import BrandsAdmin from './pages/adminPages/BrandsAdmin.jsx'
import CarruselAdmin from './pages/adminPages/EditCarousel.jsx'
import ConfigPagina from './pages/adminPages/ConfigPagina.jsx'

// Paginas de edicion, adicion y eliminacion de productos, categorias, marcas
import AddBrand from './pages/adminPages/AddBrand.jsx'
import EditBrand from './pages/adminPages/EditBrand.jsx'
import AddProduct from './pages/adminPages/AddProduct.jsx'
import EditProduct from './pages/adminPages/EditProduct.jsx'
import ProductDetailAd from './pages/adminPages/ProductDetailAdmin.jsx'
import DeleteBrand from './pages/adminPages/DeleteBrand.jsx'
import DeleteProduct from './pages/adminPages/DeleteProduct.jsx'
import EditarInfoPagina from './pages/adminPages/EditarInfoPagina.jsx'

// Rutas protegidas
import ProtectedRoute from './components/ProtectedRoute.jsx'


function PublicLayout({ children }) {
  return (
    <>
      {/* ── NAVBAR ── */}
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        } />
        <Route path="/sobre-nosotros" element={
          <PublicLayout>
            <ACercaDe />
          </PublicLayout>
        } />
        <Route path="/categorias" element={
          <PublicLayout>
            <Categoria />
          </PublicLayout>
        } />
        <Route path="/productos" element={
          <PublicLayout>
            <Products />
          </PublicLayout>
        } />
        <Route path="/producto/:id" element={
          <PublicLayout>
            <ProductDetail />
          </PublicLayout>
        } />
        <Route path="/marcas" element={
          <PublicLayout>
            <Brands />
          </PublicLayout>
        } />

        {/* Rutas de administración */}
        <Route path="/admin/login" element={
          <AdminLogin />
        } />

        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route
          path="/admin/productos"
          element={
            <ProtectedRoute>
              <ProductsAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/producto/:id"
          element={
            <ProtectedRoute>
              <ProductDetailAd />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/producto/anadir"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/producto/editar/:id"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/producto/eliminar/:id"
          element={
            <ProtectedRoute>
              <DeleteProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/categorias"
          element={
            <ProtectedRoute>
              <CategoriasAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/marcas"
          element={
            <ProtectedRoute>
              <BrandsAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/marca/editar/:id"
          element={
            <ProtectedRoute>
              <EditBrand />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/marca/eliminar/:id"
          element={
            <ProtectedRoute>
              <DeleteBrand />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/marca/anadir"
          element={
            <ProtectedRoute>
              <AddBrand />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/configuracion"
          element={
            <ProtectedRoute>
              <ConfigPagina />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/configuracion/carrusel"
          element={
            <ProtectedRoute>
              <CarruselAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/configuracion/editar-info"
          element={
            <ProtectedRoute>
              <EditarInfoPagina />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}


export default App


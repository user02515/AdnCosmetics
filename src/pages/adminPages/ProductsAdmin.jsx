import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCardAdmin";

import { products as defaultProducts } from "../../data/products";

import "./ProductsAdmin.css";

function Products() {

  const adminNombre = localStorage.getItem("vdn_admin_nombre") || "Administrador";
  const handleLogout = () => {
    localStorage.removeItem("vdn_admin_token");
    localStorage.removeItem("vdn_admin_nombre");
    navigate("/admin/login");
  };

  const navigate = useNavigate();

  const [allProducts, setAllProducts] =
    useState([]);

  useEffect(() => {

    const savedProducts =
      JSON.parse(
        localStorage.getItem("products")
      ) || [];

    setAllProducts([
      ...defaultProducts,
      ...savedProducts
    ]);

  }, []);

  return (
    <div className="products-page-wrapper">

      <div className="ad-topbar">
        <Link to="/" className="ad-topbar-brand">
          <div className="ad-topbar-brand-name">VDN Cosmetics</div>
          <div className="ad-topbar-brand-sub">Panel de administración</div>
        </Link>

        <div className="ad-topbar-right">
          <div className="ad-topbar-admin">
            <div className="ad-topbar-avatar">
              {adminNombre.charAt(0).toUpperCase()}
            </div>
            <span className="ad-topbar-name">{adminNombre}</span>
          </div>
          <button className="ad-logout-btn" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>


      {/* HERO */}
      <section className="products-hero">

        <div className="products-hero-bg"></div>

        <div className="products-hero-content">

          <span className="section-eyebrow">
            Catálogo VDN
          </span>

          <h1>
            Nuestros <em>Productos</em>
          </h1>

          <p>
            Cosméticos importados de alta calidad
            seleccionados para resaltar tu belleza.
          </p>

        </div>

      </section>

      {/* GRID */}
      <section className="products-section">

        <div className="products-container">

          <div className="products-grid">

            {allProducts.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
              />

            ))}

          </div>

          {/* BOTÓN AÑADIR */}
          <div className="products-add-container">

            <button
              className="products-add-btn"
              onClick={() =>
                navigate("/admin/producto/anadir")
              }
            >
              + Añadir Producto
            </button>
          </div>

          {/* BOTÓN Volver al Panel */}
          <div>
            <br />
            <Link to="/admin/dashboard">
              <button className="products-add-btn">
                Volver al Panel
              </button>
            </Link>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Products;
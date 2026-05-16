import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import ProductCard from "../components/ProductCard";

import { products as defaultProducts } from "../data/products";

import "./Products.css";

function Products() {

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
                navigate("/productos/añadir")
              }
            >
              + Añadir Producto
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Products;
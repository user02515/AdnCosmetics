import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { API_URL, BASE_URL } from "../config/api";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {

    fetch(`${API_URL}/get_products.php`)
      .then((res) => res.json())
      .then((data) => {

        const formattedProducts = data.map((p) => ({
          id: p.id,

          name: p.nombre,

          brand: p.marca,

          category: p.categoria,

          price: p.precio_minoritario,

          image: p.imagen_principal
            ? `${BASE_URL}${p.imagen_principal}`
            : "https://via.placeholder.com/500x500?text=Sin+Imagen",

          slug: p.slug,
        }));

        setProducts(formattedProducts);

      })
      .catch((err) => {
        console.error("Error cargando productos:", err);
      });

  }, []);

  return (
    <div className="products-page-wrapper">

      {/* HERO */}
      <section className="products-hero">
        <div className="products-hero-bg"></div>

        <div className="products-hero-content">
          <span className="section-eyebrow">Catálogo VDN</span>
          <h1>
            Nuestros <em>Productos</em>
          </h1>
          <p>
            Cosméticos importados de alta calidad seleccionados para resaltar tu belleza.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="products-section">
        <div className="products-container">
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default Products;
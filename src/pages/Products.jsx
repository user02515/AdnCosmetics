import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import "./Products.css";

function Products() {
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
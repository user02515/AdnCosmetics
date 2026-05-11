import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import "./Products.css";

function Products() {
  return (
    <div className="products-container">
      <div className="products-page">
        <h1 className="page-title">Nuestros Productos</h1>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>

    </div>
    
  );
}

export default Products;
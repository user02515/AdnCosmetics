import { Link } from "react-router-dom";
import "./ProductsCard.css";
function ProductCard({ product }) {
  return (
    <Link
      to={`/producto/${product.id}`}
      className="product-card"
    >
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info">
        <span className="product-brand">{product.brand}</span>

        <h3>{product.name}</h3>

        <p>{product.category}</p>

        <div className="product-price">
          Bs. {product.price}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
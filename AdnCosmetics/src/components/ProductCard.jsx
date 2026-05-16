import { Link, useNavigate } from "react-router-dom";
import "./ProductsCard.css";

function ProductCard({ product }) {

  const navigate = useNavigate();

  return (

    <Link
      to={`/producto/${product.id}`}
      className="product-card"
    >

      {/* BOTONES HOVER */}
      <div className="product-actions">

        <button
          className="product-edit-btn"
          onClick={(e) => {

            e.preventDefault();

            navigate(`/productos/editar/${product.id}`);
          }}
        >
          Editar
        </button>

        <button
          className="product-delete-btn"
          onClick={(e) => {

            e.preventDefault();

            navigate(`/productos/eliminar/${product.id}`);
          }}
        >
          Eliminar
        </button>

      </div>

      {/* IMAGEN */}
      <div className="product-image">

        <img
          src={product.image}
          alt={product.name}
        />

      </div>

      {/* INFO */}
      <div className="product-info">

        <span className="product-brand">
          {product.brand}
        </span>

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
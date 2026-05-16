import { useParams } from "react-router-dom";
import { products } from "../data/products";
import "./ProductDetails.css";
function ProductDetail() {

  const { id } = useParams();

  const product = products.find(
    (p) => p.id === Number(id)
  );

  if (!product) {
    return <h1>Producto no encontrado</h1>;
  }

  return (
    <div className="detail-page">

      <div className="detail-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="detail-info">

        <span className="detail-brand">
          {product.brand}
        </span>

        <h1>{product.name}</h1>

        <p className="detail-price">
          Bs. {product.price}
        </p>

        <p>{product.description}</p>

        <h3>¿Para qué sirve?</h3>
        <p>{product.use}</p>

        <h3>Público recomendado</h3>
        <p>{product.audience}</p>

      </div>

    </div>
  );
}

export default ProductDetail;
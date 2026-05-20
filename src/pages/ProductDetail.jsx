import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL, BASE_URL } from "../config/api";
import "./ProductDetails.css";
import { useNavigate } from "react-router-dom";
function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {

    fetch(`${API_URL}/get_products.php`)
      .then((res) => res.json())
      .then((data) => {

        const found = data.find(
          (p) => p.id === id
        );

        if (found) {

          setProduct({
            id: found.id,

            name: found.nombre,

            brand: found.marca,

            category: found.categoria,

            price: found.precio_minoritario,

            image: found.imagen_principal,

            description: found.descripcion_corta || "",

            use: found.uso || "",

            audience: found.publico || "",
          });

        }

      })
      .catch((err) => {
        console.error(err);
      });

  }, [id]);

  if (!product) {
    return <h1>Producto no encontrado</h1>;
  }

  return (
    <div className="detail-page">

      <div className="detail-image">
        <img
          src={BASE_URL + product.image}
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

      <div className="back-btn">
        <button
          className="back-button"
          onClick={() => navigate('/productos')}
        >
          Volver a productos
        </button>
      </div>

    </div>
  );
}

export default ProductDetail;
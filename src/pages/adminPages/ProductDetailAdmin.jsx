import { useParams, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { API_URL, BASE_URL } from "../../config/api";
import "./ProductDetailsAdmin.css";

function ProductDetailAd() {

  const { id } = useParams();

  const navigate = useNavigate();
  const [product, setProduct] =
    useState(null);

  useEffect(() => {

    window.scrollTo(0, 0);

    fetch(`${API_URL}/get_products.php`)
      .then((res) => res.json())
      .then((data) => {

        const foundProduct = data.find(
          (p) => p.id === id
        );

        if (foundProduct) {

          setProduct({
            id: foundProduct.id,

            name: foundProduct.nombre,

            brand: foundProduct.marca,

            category: foundProduct.categoria,

            price: foundProduct.precio_minoritario,

            image: `${BASE_URL}/${foundProduct.imagen_principal}`,

            description:
              foundProduct.descripcion_corta,

            use: foundProduct.uso,

            audience: foundProduct.publico,
          });

        }

      })
      .catch((err) => {
        console.error(err);
      });

  }, [id]);

  if (!product) {

    return (
      <h1>
        Producto no encontrado
      </h1>
    );
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

        <h1>
          {product.name}
        </h1>

        <p className="detail-price">
          Bs. {product.price}
        </p>

        <p>
          {product.description}
        </p>

        <h3>
          ¿Para qué sirve?
        </h3>

        <p>
          {product.use || "Sin información"}
        </p>

        <h3>
          Público recomendado
        </h3>

        <p>
          {product.audience || "Sin información"}
        </p>

      </div>

      <div className="back-btn">
        <button
          className="back-button"
          onClick={() => navigate('/admin/productos')}
        >
          Volver a productos
        </button>
      </div>

    </div>
  );
}

export default ProductDetailAd;
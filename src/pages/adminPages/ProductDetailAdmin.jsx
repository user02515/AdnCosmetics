import { useParams, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import { products as defaultProducts }
  from "../../data/products";

import "./ProductDetailsAdmin.css";

function ProductDetailAd() {

  const { id } = useParams();

  const navigate = useNavigate();
  const [product, setProduct] =
    useState(null);

  useEffect(() => {

    window.scrollTo(0, 0);

    // productos añadidos
    const savedProducts =
      JSON.parse(
        localStorage.getItem("products")
      ) || [];

    // unir productos base + añadidos
    const allProducts = [
      ...defaultProducts,
      ...savedProducts
    ];

    // buscar producto
    const foundProduct =
      allProducts.find(
        (p) => p.id === Number(id)
      );

    setProduct(foundProduct);

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
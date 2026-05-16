import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "./DeleteProduct.css";

function DeleteProduct() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [showModal, setShowModal] =
    useState(false);

  useEffect(() => {

    window.scrollTo(0, 0);

    const savedProducts =
      JSON.parse(localStorage.getItem("products")) || [];

    const selectedProduct =
      savedProducts.find(
        (p) => p.id === Number(id)
      );

    if (!selectedProduct) {

      navigate("/productos");

      return;
    }

    setProduct(selectedProduct);

  }, [id, navigate]);

  const handleDelete = () => {

    const savedProducts =
      JSON.parse(localStorage.getItem("products")) || [];

    const updatedProducts =
      savedProducts.filter(
        (p) => p.id !== Number(id)
      );

    localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts)
    );

    navigate("/productos");
  };

  if (!product) return null;

  return (
    <>
      <div className="delete-product-page">

        <div className="delete-product-card">

          <div className="delete-product-content">

            <div className="delete-product-image">

              <img
                src={product.image}
                alt={product.name}
              />

            </div>

            <div className="delete-product-info">

              <h2>
                ¿Eliminar producto?
              </h2>

              <p>
                {product.name}
              </p>

              <button
                onClick={() =>
                  setShowModal(true)
                }
              >
                Eliminar Producto
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* MODAL */}
      {showModal && (

        <div className="delete-modal-overlay">

          <div className="delete-modal">

            <h3>
              Eliminar Producto
            </h3>

            <p>
              ¿Seguro que deseas eliminar este
              producto?
            </p>

            <div className="delete-modal-actions">

              <button
                className="cancel-btn"
                onClick={() =>
                  setShowModal(false)
                }
              >
                Cancelar
              </button>

              <button
                className="confirm-btn"
                onClick={handleDelete}
              >
                Eliminar
              </button>

            </div>

          </div>

        </div>

      )}
    </>
  );
}

export default DeleteProduct;
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL, BASE_URL } from "../../config/api";
import "./DeleteProduct.css";

function DeleteProduct() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ───────── CARGAR PRODUCTO ───────── */
  useEffect(() => {

    window.scrollTo(0, 0);

    fetch(`${API_URL}/get_products.php`)
      .then(res => res.json())
      .then(data => {

        const found = data.find(p => Number(p.id) === Number(id));

        if (!found) {
          navigate("/admin/productos");
          return;
        }

        setProduct({
          id: found.id,
          name: found.nombre,
          image: found.imagen_principal
            ? `${BASE_URL}/${found.imagen_principal}`
            : "https://via.placeholder.com/500x500?text=Sin+Imagen",
        });

      })
      .catch(() => navigate("/admin/productos"));

  }, [id, navigate]);

  /* ───────── ELIMINAR ───────── */
  const handleDelete = async () => {

    setLoading(true);

    try {

      const form = new FormData();
      form.append("id", id);

      const res = await fetch(`${API_URL}/delete_product.php`, {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (data.success) {
        navigate("/admin/productos");
      } else {
        console.error("Error al eliminar:", data.message);
        setLoading(false);
        setShowModal(false);
      }

    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (!product) return null;

  return (
    <>
      <div className="delete-product-page">
        <div className="delete-product-card">
          <div className="delete-product-content">

            <div className="delete-product-image">
              <img src={product.image} alt={product.name} />
            </div>

            <div className="delete-product-info">
              <h2>¿Eliminar producto?</h2>
              <p>{product.name}</p>
              <button onClick={() => setShowModal(true)}>
                Eliminar Producto
              </button>

              <br />
              <button
                className="cancel-btn"
                onClick={() => navigate("/admin/productos")}
              >
                Cancelar
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">

            <h3>Eliminar Producto</h3>
            <p>¿Seguro que deseas eliminar este producto?</p>

            <div className="delete-modal-actions">

              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
                disabled={loading}
              >
                Cancelar
              </button>

              <button
                className="confirm-btn"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Eliminando..." : "Eliminar"}
              </button>

              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
                disabled={loading}
              >Cerrar</button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default DeleteProduct;
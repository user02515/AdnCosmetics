import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./DeleteBrand.css";
import { API_URL } from "../../config/api";
import { getImageUrl } from "../../config/api";
import { BASE_URL } from "../../config/api";

function DeleteBrand() {

  const navigate = useNavigate();

  // id desde la URL
  const { id } = useParams();

  const [brand, setBrand] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {

    window.scrollTo(0, 0);

    const fetchBrand = async () => {

      try {

        const res = await fetch(
          `${API_URL}/get_unique_brand.php?id=${id}`
        );

        const data = await res.json();

        if (!res.ok) {
          navigate("/admin/marcas");
          return;
        }

        setBrand(data);

      } catch (error) {

        console.error(error);

        navigate("/admin/marcas");

      }

    };

    fetchBrand();

  }, [id, navigate]);

  const handleDelete = async () => {

    try {

      const form = new FormData();

      form.append("id", id);

      const res = await fetch(
        `${API_URL}/delete_brand.php`,
        {
          method: "POST",
          body: form,
        }
      );

      const text = await res.text();

      console.log(text);

      const data = JSON.parse(text);

      if (data.success) {

        navigate("/admin/marcas");

      } else {

        alert(data.message || "Error al eliminar");

      }

    } catch (error) {

      console.error(error);

      alert("Error del servidor");

    }

  };

  if (!brand) return null;

  return (
    <>
      <div className="delete-brand-page">

        <div className="delete-brand-card">

          <div className="delete-brand-content">

            <div className="delete-brand-image">
              <img
                src={getImageUrl(brand.logo_url)}
                alt="Marca"
              />
            </div>

            <div className="delete-brand-info">

              <h2>¿Eliminar marca <em>{brand.nombre}</em>?</h2>

              <p>
                {brand.description}
              </p>

              <button onClick={() => setShowModal(true)}>
                Desactivar Marca
              </button>

              <br /><br />

              <button onClick={() => navigate("/admin/marcas")}>
                Volver a la lista
              </button>


            </div>

          </div>

        </div>

      </div>

      {/* MODAL */}
      {showModal && (

        <div className="delete-modal-overlay">

          <div className="delete-modal">

            <h3>Desactivar Marca</h3>

            <p>
              ¿Seguro que deseas desactivar la marca <em>{brand.nombre}</em>?
            </p>

            <div className="delete-modal-actions">

              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>

              <button
                className="confirm-btn"
                onClick={handleDelete}
              >
                Desactivar
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );

}

export default DeleteBrand;
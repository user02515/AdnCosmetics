import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { brands } from "../../data/brands";
import "./DeleteBrand.css";
import { API_URL } from "../../config/api";

function DeleteBrand() {

  const navigate = useNavigate();

  // id desde la URL
  const { id } = useParams();

  const [brand, setBrand] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {

    window.scrollTo(0, 0);

    const savedBrands =
      JSON.parse(localStorage.getItem("brands")) || [];

    // juntar TODAS las marcas
    const allBrands = [...brands, ...savedBrands];

    const selectedBrand = allBrands.find(
      (b) => b.id === Number(id)
    );

    if (!selectedBrand) {
      navigate("/admin/marcas");
      return;
    }

    setBrand(selectedBrand);

  }, [id, navigate]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "¿Seguro que deseas eliminar esta marca?"
    );

    if (!confirmDelete) return;

    const form = new FormData();
    form.append("id", id);

    const res = await fetch(
      "${API_URL}/delete_brand.php",
      {
        method: "POST",
        body: form,
      }
    );

    const data = await res.json();

    if (data.success) {
      navigate("/admin/marcas");
    } else {
      alert(data.message || "Error al eliminar");
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
                src={brand.logo}
                alt="Marca"
              />
            </div>

            <div className="delete-brand-info">

              <h2>¿Eliminar marca?</h2>

              <p>
                {brand.description}
              </p>

              <button onClick={() => setShowModal(true)}>
                Eliminar Marca
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

            <h3>Eliminar Marca</h3>

            <p>
              ¿Seguro que deseas eliminar esta marca?
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
                Eliminar
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );

}

export default DeleteBrand;
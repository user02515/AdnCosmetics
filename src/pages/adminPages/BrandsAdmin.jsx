import { useNavigate } from "react-router-dom";
import BrandCard from "../../components/BrandCard";
import { brands } from "../../data/brands";
import { useEffect, useState } from "react";
import "./BrandsAdmin.css";

function Brands() {
  const [allBrands, setAllBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedBrands = JSON.parse(localStorage.getItem("brands")) || [];
    setAllBrands([...brands, ...savedBrands]);
  }, []);

  return (
    <div className="brands-page-wrapper">

      {/* HERO */}
      <section className="brands-hero">
        <div className="brands-hero-bg"></div>

        <div className="brands-hero-content">
          <span className="section-eyebrow">Colaboraciones</span>

          <h1>
            Marcas <em>internacionales</em>
          </h1>

          <p>
            Trabajamos con marcas reconocidas a nivel mundial
            para traerte productos auténticos y de calidad premium.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="brands-section">

        <div className="brands-container">

          <div className="brands-grid">

            {allBrands.map((brand) => (
              <div className="brand-card-wrapper" key={brand.id}>

                <BrandCard brand={brand} />

                {/* BOTONES (NO TOCAR - HOVER FUNCIONA) */}
                <div className="brand-actions">

                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/admin/marca/editar/${brand.id}`)}
                  >
                    Editar
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => navigate(`/admin/marca/eliminar/${brand.id}`)}
                  >
                    Eliminar
                  </button>

                </div>

              </div>
            ))}

          </div>

          {/* BOTÓN AÑADIR */}
          <div className="add-brand-container">
            <button
              className="add-brand-btn"
              onClick={() => navigate("/admin/marca/anadir")}
            >
              + Añadir Marca
            </button>

            <button
              className="back-button"
              onClick={() => navigate("/admin/dashboard")}
            >
              Volver al panel
            </button>
          </div>


        </div>

      </section>
    </div>
  );
}

export default Brands;
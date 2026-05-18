import BrandCard from "../components/BrandCard";
import { useEffect, useState } from "react";
import { API_URL } from "../config/api";
import "./Brands.css";

function Brands() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/get_brands.php`)
      .then((res) => res.json())
      .then((data) => {
        setBrands(data);
      })
      .catch((err) => {
        console.error(err);
      });
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
            Trabajamos con marcas reconocidas a nivel mundial para traerte productos auténticos y de calidad premium.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="brands-section">
        <div className="brands-container">

          <div className="brands-grid">
            {brands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}

export default Brands;
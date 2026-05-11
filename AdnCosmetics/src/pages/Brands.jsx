import BrandCard from "../components/BrandCard";
import { brands } from "../data/brands";
import "./Brands.css";

function Brands() {
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
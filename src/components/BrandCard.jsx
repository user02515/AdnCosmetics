import { BASE_URL } from "../config/api";
import "./BrandCards.css";
function BrandCard({ brand }) {
  return (
    <div className="brand-card">
        

      <div className="brand-logo">
        <img
          src={`${BASE_URL}${brand.logo_url}`}
          alt={brand.nombre}
        />
      </div>

      <div className="brand-content">
        

        <p>{brand.descripcion}</p>
      </div>

    </div>
  );
}

export default BrandCard;
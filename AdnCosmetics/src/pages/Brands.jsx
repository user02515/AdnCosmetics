import BrandCard from "../components/BrandCard";
import { brands } from "../data/brands";
import "./Brands.css";

function Brands() {
  return (
    <div className="brands-page">
      <h1 className="page-title">Marcas </h1>

      <div className="brands-grid">
        {brands.map((brand) => (
          <BrandCard
            key={brand.id}
            brand={brand}
          />
        ))}
      </div>
    </div>
  );
}

export default Brands;
import "./BrandCards.css";
function BrandCard({ brand }) {
  return (
    <div className="brand-card">
        <div className="brand-name">
            <h2>{brand.name}</h2>
        </div>

      <div className="brand-logo">
        <img
          src={brand.logo}
          alt={brand.name}
        />
      </div>

      <div className="brand-content">
        

        <p>{brand.description}</p>
      </div>

    </div>
  );
}

export default BrandCard;
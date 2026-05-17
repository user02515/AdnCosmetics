import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BrandForm.css";

function AddBrand() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    logo: null,
    description: "",
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "logo") {
      const file = files[0];

      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          logo: reader.result,
        }));

        setPreview(reader.result);
      };

      if (file) reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBrand = {
      id: Date.now(),
      logo: formData.logo,
      description: formData.description,
    };

    const savedBrands =
      JSON.parse(localStorage.getItem("brands")) || [];

    savedBrands.push(newBrand);

    localStorage.setItem("brands", JSON.stringify(savedBrands));

    

    navigate("/admin/marcas");
  };

  return (
    <div className="brand-form-page">

      <div className="brand-form-container">

        <span className="section-eyebrow">
          Nueva Marca
        </span>

        <h1>
          Añadir <em>Marca</em>
        </h1>

        <p className="form-subtitle">
          Agrega una nueva marca internacional al catálogo.
        </p>

        <form onSubmit={handleSubmit} className="brand-form">

          {/* IMAGEN */}
          <div className="form-group">

            <label>Logo de la marca</label>

            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleChange}
              required
            />

          </div>

          {/* PREVIEW */}
          {preview && (
            <div className="image-preview">
              <img src={preview} alt="preview" />
            </div>
          )}

          {/* DESCRIPCION */}
          <div className="form-group">

            <label>Descripción</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Describe la marca..."
              required
            />

          </div>

          <button type="submit" className="save-btn">
            Guardar Marca
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddBrand;
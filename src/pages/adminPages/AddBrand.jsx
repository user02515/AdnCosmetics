import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BrandForm.css";

function AddBrand() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    logo: null,
    description: "",
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "logo") {
      const file = files[0];

      setFormData((prev) => ({
        ...prev,
        logo: file,
      }));

      setPreview(URL.createObjectURL(file));

    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const data = new FormData();

      data.append("nombre", formData.nombre);
      data.append("descripcion", formData.description);
      data.append("logo", formData.logo);

      const res = await fetch(
        "https://green-buffalo-260842.hostingersite.com/api/create_brand.php",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Error");
        return;
      }

      alert("Marca creada correctamente");

      navigate("/admin/marcas");

    } catch (err) {
      console.error(err);
      alert("Error de conexión");
    }
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

          {/* NOMBRE */}
          <div className="form-group">

            <label>Nombre de la marca</label>

            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: L'Oréal"
              required
            />

          </div>

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
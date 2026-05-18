import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../config/api";

import "./BrandForm.css";

function EditBrand() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [formData, setFormData] = useState({
    nombre: "",
    description: "",
    logoFile: null,
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/get_unique_brand.php?id=${id}`)
      .then(res => res.json())
      .then(data => {
        setFormData({
          nombre: data.nombre,
          description: data.descripcion,
          logoFile: null,
        });

        setPreview(data.logo_url);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "logo") {
      const file = files[0];

      if (file) {
        // preview SOLO visual
        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);

        // archivo real para enviar al backend
        setFormData({
          ...formData,
          logoFile: file,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    form.append("id", id);
    form.append("nombre", formData.nombre);
    form.append("descripcion", formData.description);

    if (formData.logoFile) {
      form.append("logo", formData.logoFile);
    }

    const res = await fetch(
      "${API_URL}/update_brand.php",
      {
        method: "POST",
        body: form,
      }
    );

    const data = await res.json();

    if (data.success) {
      navigate("/admin/marcas");
    } else {
      alert(data.message || "Error al actualizar");
    }
  };

  return (
    <div className="brand-form-page">

      <div className="brand-form-container">

        <span className="section-eyebrow">
          Editar Marca
        </span>

        <h1>
          Editar <em>Marca</em>
        </h1>

        <p className="form-subtitle">
          Modifica la información de la marca.
        </p>

        <form
          onSubmit={handleSubmit}
          className="brand-form"
        >

          {/* IMAGEN */}
          <div className="form-group">

            <label>Logo</label>

            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleChange}
            />

          </div>

          {/* preview */}
          {preview && (
            <div className="image-preview">
              <img
                src={preview}
                alt="preview"
              />
            </div>
          )}

          {/* descripcion */}
          <div className="form-group">

            <label>Descripción</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
            />

          </div>

          <button
            type="submit"
            className="save-btn"
          >
            Guardar Cambios
          </button>

          <button
            className="back-button"
            onClick={() => navigate("/admin/marcas")}
          >
            Volver a la lista
            <span className="back-button-arrow">
              &rarr;
            </span>
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditBrand;
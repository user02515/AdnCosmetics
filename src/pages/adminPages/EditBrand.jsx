import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./BrandForm.css";

function EditBrand() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [formData, setFormData] = useState({
    id: "",
    logo: "",
    description: "",
  });

  const [preview, setPreview] = useState("");

  // cargar marca
  useEffect(() => {

    const savedBrands =
      JSON.parse(localStorage.getItem("brands")) || [];

    const brandToEdit = savedBrands.find(
      (brand) => brand.id === Number(id)
    );

    if (brandToEdit) {

      setFormData(brandToEdit);

      setPreview(brandToEdit.logo);

    }

  }, [id]);

  const handleChange = (e) => {

    const { name, value, files } = e.target;

    // imagen
    if (name === "logo") {

      const file = files[0];

      if (file) {

        const imageUrl =
          URL.createObjectURL(file);

        setPreview(imageUrl);

        setFormData({
          ...formData,
          logo: imageUrl,
        });

      }

    } else {

      setFormData({
        ...formData,
        [name]: value,
      });

    }
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const savedBrands =
      JSON.parse(localStorage.getItem("brands")) || [];

    const updatedBrands = savedBrands.map((brand) =>

      brand.id === Number(id)
        ? formData
        : brand

    );

    localStorage.setItem(
      "brands",
      JSON.stringify(updatedBrands)
    );



    // volver
    navigate("/admin/marcas");

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
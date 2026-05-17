import { useState } from "react";

import { useNavigate } from "react-router-dom";

import "./ProductForm.css";

function AddProduct() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    image: "",
    name: "",
    brand: "",
    category: "",
    price: "",
    description: "",
    use: "",
    audience: "",
  });

  const [preview, setPreview] = useState("");

  const handleChange = (e) => {

    const { name, value, files } = e.target;

    if (name === "image") {

      const file = files[0];

      if (file) {

        const reader = new FileReader();

        reader.onloadend = () => {

          setPreview(reader.result);

          setFormData({
            ...formData,
            image: reader.result,
          });

        };

        reader.readAsDataURL(file);
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

    const newProduct = {
      id: Date.now(),
      ...formData
    };

    const savedProducts =
      JSON.parse(localStorage.getItem("products")) || [];

    savedProducts.push(newProduct);

    localStorage.setItem(
      "products",
      JSON.stringify(savedProducts)
    );

    navigate("/admin/productos");
  };

  return (

    <div className="brand-form-page">

      <div className="brand-form-container">

        <span className="section-eyebrow">
          Nuevo Producto
        </span>

        <h1>
          Añadir <em>Producto</em>
        </h1>

        <form
          onSubmit={handleSubmit}
          className="brand-form"
        >

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />

          {preview && (
            <div className="image-preview">
              <img
                src={preview}
                alt="preview"
              />
            </div>
          )}

          <input
            type="text"
            name="name"
            placeholder="Nombre"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="brand"
            placeholder="Marca"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Categoría"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Precio"
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Descripción"
            onChange={handleChange}
            rows="5"
          />
          <textarea
            name="use"
            placeholder="¿Para qué sirve?"
            onChange={handleChange}
            rows="4"
            />

            <textarea
            name="audience"
            placeholder="Público recomendado"
            onChange={handleChange}
            rows="4"
            />

          <button
            type="submit"
            className="save-btn"
          >
            Guardar Producto
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddProduct;
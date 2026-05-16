import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import "./ProductForm.css";

function EditProduct() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [formData, setFormData] = useState({
    id: "",
    image: "",
    name: "",
    brand: "",
    category: "",
    price: "",
    description: "",
  });

  const [preview, setPreview] = useState("");

  // cargar producto
  useEffect(() => {

    const savedProducts =
      JSON.parse(localStorage.getItem("products")) || [];

    const productToEdit =
      savedProducts.find(
        (product) =>
          product.id === Number(id)
      );

    if (productToEdit) {

      setFormData(productToEdit);

      setPreview(productToEdit.image);

    }

  }, [id]);

  const handleChange = (e) => {

    const {
      name,
      value,
      files
    } = e.target;

    // imagen
    if (name === "image") {

      const file = files[0];

      if (file) {

        const reader =
          new FileReader();

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

    const savedProducts =
      JSON.parse(localStorage.getItem("products")) || [];

    const updatedProducts =
      savedProducts.map((product) =>

        product.id === Number(id)
          ? formData
          : product

      );

    localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts)
    );

    navigate("/productos");
  };

  return (

    <div className="brand-form-page">

      <div className="brand-form-container">

        <span className="section-eyebrow">
          Editar Producto
        </span>

        <h1>
          Editar <em>Producto</em>
        </h1>

        <p className="form-subtitle">
          Modifica la información del producto.
        </p>

        <form
          onSubmit={handleSubmit}
          className="brand-form"
        >

          {/* IMAGEN */}
          <div className="form-group">

            <label>Imagen</label>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />

          </div>

          {/* PREVIEW */}
          {preview && (

            <div className="image-preview">

              <img
                src={preview}
                alt="preview"
              />

            </div>

          )}

          {/* NOMBRE */}
          <div className="form-group">

            <label>Nombre</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>

          {/* MARCA */}
          <div className="form-group">

            <label>Marca</label>

            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />

          </div>

          {/* CATEGORIA */}
          <div className="form-group">

            <label>Categoría</label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />

          </div>

          {/* PRECIO */}
          <div className="form-group">

            <label>Precio</label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
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
            />

          </div>

          <button
            type="submit"
            className="save-btn"
          >
            Guardar Cambios
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditProduct;
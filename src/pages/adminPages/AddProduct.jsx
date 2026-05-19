import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";
import "./ProductForm.css";

import { getImageUrl } from "../../config/api";

function AddProduct() {

  const navigate = useNavigate();

  /* ───────── DATA ───────── */
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    image: null,
    name: "",
    brand: "",
    category: "",
    price: "",
    description: "",
    use: "",
    audience: "",
  });

  const [preview, setPreview] = useState("");

  /* ───────── LOAD BRANDS & CATEGORIES ───────── */
  useEffect(() => {

    fetch(`${API_URL}/get_brands.php`)
      .then(res => res.json())
      .then(data => setBrands(data))
      .catch(err => console.error("Error marcas:", err));

    fetch(`${API_URL}/get_categorias.php`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Error categorías:", err));

  }, []);

  /* ───────── HANDLE INPUTS ───────── */
  const handleChange = (e) => {

    const { name, value, files } = e.target;

    if (name === "image") {

      const file = files[0];

      if (file) {
        setFormData({ ...formData, image: file });

        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
      }

    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  /* ───────── SUBMIT ───────── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      /* 1. CREAR PRODUCTO */
      const form = new FormData();

      form.append("nombre", formData.name);
      form.append("marca_id", formData.brand);
      form.append("categoria_id", formData.category);
      form.append("precio_minoritario", formData.price);
      form.append("descripcion_corta", formData.description);
      form.append("uso", formData.use);
      form.append("publico", formData.audience);

      const res = await fetch(`${API_URL}/add_product.php`, {
        method: "POST",
        body: form,
      });

      const text = await res.text();
      console.log("RESPUESTA PHP:", text);

      const data = JSON.parse(text);

      if (!data.success) {
        console.error("Error producto:", data.message);
        return;
      }

      const productoId = data.id;

      /* 2. SUBIR IMAGEN */
      if (formData.image) {

        const imgForm = new FormData();
        imgForm.append("producto_id", productoId);
        imgForm.append("image", formData.image);
        imgForm.append("alt_text", formData.name);
        imgForm.append("es_principal", 1);
        imgForm.append("orden", 1);

        const imgRes = await fetch(`${API_URL}/add_product_image.php`, {
          method: "POST",
          body: imgForm,
        });

        const imgData = await imgRes.json();

        if (!imgData.success) {
          console.error("Error imagen:", imgData.message);
        }
      }

      navigate("/admin/productos");

    } catch (err) {
      console.error("Error general:", err);
    }
  };

  return (
    <div className="brand-form-page">

      <div className="brand-form-container">

        <span className="section-eyebrow">Nuevo Producto</span>
        <h1>Añadir <em>Producto</em></h1>

        <form onSubmit={handleSubmit} className="brand-form">

          {/* IMAGEN */}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />

          {preview && (
            <div className="image-preview">
              <img src={preview} alt="preview" />
            </div>
          )}

          {/* NOMBRE */}
          <input
            type="text"
            name="name"
            placeholder="Nombre del producto"
            onChange={handleChange}
            required
          />

          {/* MARCA */}
          <select
            name="brand"
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar marca</option>

            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.nombre}
              </option>
            ))}
          </select>

          {/* CATEGORÍA */}
          <select
            name="category"
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar categoría</option>

            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>

          {/* PRECIO */}
          <input
            type="number"
            name="price"
            placeholder="Precio"
            onChange={handleChange}
            required
          />

          {/* DESCRIPCIÓN */}
          <textarea
            name="description"
            placeholder="Descripción"
            onChange={handleChange}
            rows="5"
          />

          {/* USO */}
          <textarea
            name="use"
            placeholder="¿Para qué sirve?"
            onChange={handleChange}
            rows="4"
          />

          {/* PÚBLICO */}
          <textarea
            name="audience"
            placeholder="Público recomendado"
            onChange={handleChange}
            rows="4"
          />

          <button type="submit" className="save-btn">
            Guardar Producto
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/admin/productos")}
          >
            Cancelar
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddProduct;
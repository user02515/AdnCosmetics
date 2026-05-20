import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL, BASE_URL } from "../../config/api";
import "./ProductForm.css";

function EditProduct() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    id: "",
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

  /* ───────── LOAD SELECTS ───────── */
  useEffect(() => {

    fetch(`${API_URL}/get_brands.php`)
      .then(res => res.json())
      .then(data => setBrands(data));

    fetch(`${API_URL}/get_categorias.php`)
      .then(res => res.json())
      .then(data => setCategories(data));

  }, []);

  /* ───────── LOAD PRODUCT ───────── */
  useEffect(() => {

    fetch(`${API_URL}/get_products.php`)
      .then(res => res.json())
      .then(data => {

        const product = data.find(
          (p) => Number(p.id) === Number(id)
        );

        if (product) {

          setFormData({
            id: product.id,
            name: product.nombre,
            brand: product.marca_id,
            category: product.categoria_id,
            price: product.precio_minoritario,
            description: product.descripcion_corta,
            use: product.uso,
            audience: product.publico,
            image: null
          });

          setPreview(`${BASE_URL}/${product.imagen_principal}`);
        }

      });

  }, [id]);

  /* ───────── HANDLE CHANGE ───────── */
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

  /* ───────── SUBMIT UPDATE ───────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🔥 FORM DATA ANTES DE ENVIAR:", formData);
    try {

      /* ───────── 1. UPDATE PRODUCT ───────── */
      const form = new FormData();

      form.append("id", formData.id);
      form.append("nombre", formData.name);
      form.append("marca_id", formData.brand);
      form.append("categoria_id", formData.category);
      form.append("precio_minoritario", formData.price);
      form.append("descripcion_corta", formData.description);
      form.append("uso", formData.use);
      form.append("publico", formData.audience);

      const res = await fetch(`${API_URL}/update_product.php`, {
        method: "POST",
        body: form
      });

      const text = await res.text();
      console.log("PRODUCT RESPONSE:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("Error JSON product");
        return;
      }

      if (!data.success) {
        console.error(data.message);
        return;
      }

      /* ───────── 2. UPDATE IMAGE (solo si hay nueva) ───────── */
      if (formData.image) {

        const imgForm = new FormData(); // ✔ AHORA SÍ EXISTE
        imgForm.append("producto_id", formData.id);
        imgForm.append("image", formData.image);
        imgForm.append("alt_text", formData.name);
        imgForm.append("es_principal", 1);
        imgForm.append("orden", 1);

        const imgRes = await fetch(`${API_URL}/update_product_image.php`, {
          method: "POST",
          body: imgForm
        });

        const imgText = await imgRes.text();
        console.log("IMG RESPONSE:", imgText);

        try {
          const imgData = JSON.parse(imgText);

          if (!imgData.success) {
            console.error("Error imagen:", imgData.message);
          }

        } catch (e) {
          console.error("Error JSON imagen");
        }
      }

      navigate("/admin/productos");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="brand-form-page">

      <div className="brand-form-container">

        <h1>Editar <em>Producto</em></h1>

        <form onSubmit={handleSubmit} className="form-group">

          {/* IMAGEN */}
          <input
            type="file"
            name="image"
            onChange={handleChange}
          />

          {preview && (
            <img src={preview} alt="preview" />
          )}

          {/* NOMBRE */}
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* MARCA */}
          <select
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          >
            {brands.map(b => (
              <option key={b.id} value={b.id}>
                {b.nombre}
              </option>
            ))}
          </select>

          {/* CATEGORÍA */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map(c => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>

          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <textarea
            name="use"
            value={formData.use}
            onChange={handleChange}
          />

          <textarea
            name="audience"
            value={formData.audience}
            onChange={handleChange}
          />

          <button type="submit">
            Guardar Cambios
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

export default EditProduct;
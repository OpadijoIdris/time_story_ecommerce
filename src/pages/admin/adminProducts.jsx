import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, X } from "lucide-react";
import { createProduct, getAllProducts, updateProduct, deleteProduct } from "../../../api.js";
import ProductModal from "./ProductModal.jsx";
import EditProductModal from "./EditProductModal.jsx";

const CLOUD_NAME = "dizz525li";
const UPLOAD_PRESET = "idris_cloud_timestory";

export default function Products() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData
    );

    return response.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const imageUrl = await uploadToCloudinary(image);
      const productData = {
        ...formData,
        image: imageUrl, 
      };

       const product = await createProduct(productData);
       ("sending product data", productData)
      setShowForm(false);
      setFormData({ name: '', description: '', price: '', stock: '' });
      setImage(null);
      setPreview(null);
      const updatedProducts = await getAllProducts();
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
        const updatedProducts = await getAllProducts();
        setProducts(updatedProducts);
      } catch (error) {
        console.error("Failed to delete product:", error);
        setError("Failed to delete product");
      }
    }
  };

  const handleProductUpdated = (updatedProducts) => {
    setProducts(updatedProducts);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">All Products</h3>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          <Plus className="w-5 h-5" /> Add New Product
        </button>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <p className="text-gray-500 text-center py-10">Loading products...</p>
      ) : error ? (
        <p className="text-red-500 text-center py-10">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <div
              key={p._id || i}
              className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all bg-gray-50"
            >
              <div onClick={() => handleProductClick(p)} className="cursor-pointer">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-48 object-contain"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-lg">{p.name}</h4>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {p.description}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <p className="font-semibold text-blue-600">#{p.price}</p>
                    <p className="text-sm text-gray-500">
                      Stock: <span className="font-medium">{p.stock}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 flex justify-end gap-2">
                <button onClick={() => handleEdit(p)} className="text-sm text-blue-600 hover:underline">Edit</button>
                <button onClick={() => handleDelete(p._id)} className="text-sm text-red-600 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold mb-4">Add New Product</h3>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Product Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  required
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-2 w-20 h-20 object-contain rounded-md border"
                  />
                )}
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="e.g. Bracelet"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Short product description..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 text-sm mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    placeholder="e.g. 50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-600 text-sm mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    placeholder="e.g. 20"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700 disabled:bg-blue-400"
                disabled={isUploading}
              >
                {isUploading ? "Uploading Image..." : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      )}

      <ProductModal product={selectedProduct} onClose={closeModal} />
      {isEditModalOpen && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setIsEditModalOpen(false)}
          onProductUpdated={handleProductUpdated}
        />
      )}
    </div>
  );
}

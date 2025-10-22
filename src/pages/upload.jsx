import { useState } from "react";
import { FaArrowLeft } from 'react-icons/fa';


const UploadProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: null,
  });

  // handle form inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProduct({
      ...product,
      [name]: files ? files[0] : value,
    });
  };

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // prepare form data for backend upload
    // const formData = new FormData();
    // Object.entries(product).forEach(([key, value]) => {
    //   formData.append(key, value);
    // });

    // Example: Send to your backend API endpoint
    // axios.post("/api/products", formData)
    ("Uploading product:", product);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">

      <a href="/" className="absolute top-6 left-6 flex items-center text-gray-700 hover:text-gray-900 transition">
        <FaArrowLeft className="mr-2" />
        Back
      </a>
      
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Upload Product
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded-lg"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded-lg"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded-lg"
          required
        />


        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded-lg focus:ring-2 focus:ring-gray-200"
        />

        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full mb-4 focus:ring-2 focus:ring-gray-500"
          accept="image/*"
        />

        <button
          type="submit"
          className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
        >
          Upload Product
        </button>
      </form>
    </div>
  );
};

export default UploadProduct;

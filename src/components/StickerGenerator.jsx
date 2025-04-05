import { useState } from "react";
import Sticker from "./Sticker";
import Cart from "./Cart";

function StickerGenerator() {
  // Form state for sticker inputs
  const [formData, setFormData] = useState({
    model: "",
    color: "",
    imei1: "",
    vc: "",
    size: "",
  });

  // Cart state to store multiple stickers
  const [cart, setCart] = useState([]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle adding the current sticker to the cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    // Basic validation: ensure all fields are filled
    if (
      !formData.model ||
      !formData.color ||
      !formData.imei1 ||
      !formData.vc ||
      !formData.size
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // Validate IMEI 1 (should be 15 digits)
    if (!/^\d{15}$/.test(formData.imei1)) {
      alert("IMEI 1 must be a 15-digit number.");
      return;
    }

    // Add the current sticker to the cart
    setCart((prev) => [...prev, { ...formData }]);
    // Reset the form
    setFormData({
      model: "",
      color: "",
      imei1: "",
      vc: "",
      size: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Sticker Generator</h1>

      {/* Form and Preview Section */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Create Sticker</h2>
          <form onSubmit={handleAddToCart}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="model">
                Model
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., A6671L"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="color">
                Color
              </label>
              <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Wave Blue"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="imei1">
                IMEI 1
              </label>
              <input
                type="text"
                id="imei1"
                name="imei1"
                value={formData.imei1}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 1351306145831166"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="vc">
                VC
              </label>
              <input
                type="text"
                id="vc"
                name="vc"
                value={formData.vc}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 816710"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="size">
                Size
              </label>
              <input
                type="text"
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 128+4"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
          </form>
        </div>

        {/* Live Preview */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
          <Sticker stickerData={formData} />
        </div>
      </div>

      {/* Cart Section */}
      <div className="max-w-4xl mx-auto mt-8">
        <Cart cart={cart} setCart={setCart} />
      </div>
    </div>
  );
}

export default StickerGenerator;

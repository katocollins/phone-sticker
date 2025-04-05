import Sticker from "./Sticker";
import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

function Cart({ cart, setCart }) {
  const stickerRefs = useRef([]);
  const [downloadUrl, setDownloadUrl] = useState(null); // State for download URL

  const handleRemove = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGeneratePDF = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Generate the PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const pageWidth = 595;
    const pageHeight = 842;
    const stickerWidth = 141;
    const stickerHeight = 85;
    const margin = 14;
    const stickersPerRow = 3;
    const stickersPerColumn = 8;
    const stickersPerPage = stickersPerRow * stickersPerColumn;

    let currentPage = 1;
    let x = margin;
    let y = margin;

    for (let i = 0; i < cart.length; i++) {
      if (i > 0 && i % stickersPerPage === 0) {
        pdf.addPage();
        currentPage++;
        x = margin;
        y = margin;
      }

      const stickerElement = stickerRefs.current[i];
      if (stickerElement) {
        const canvas = await html2canvas(stickerElement, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        pdf.addImage(imgData, "PNG", x, y, stickerWidth, stickerHeight);
      }

      x += stickerWidth + margin;
      if ((i + 1) % stickersPerRow === 0) {
        x = margin;
        y += stickerHeight + margin;
      }
    }

    // Convert PDF to blob
    const pdfBlob = pdf.output("blob");

    // Upload to Cloudinary
    const cloudName =
      import.meta.REACT_APP_CLOUDINARY_CLOUD_NAME || "dj3g3d4yp";
    const apiKey =
      import.meta.REACT_APP_CLOUDINARY_API_KEY || "742719283661245";
    const apiSecret =
      import.meta.REACT_APP_CLOUDINARY_API_SECRET ||
      "wvM3sTCy0bYTywnzi21EPbC2v70";
    const uploadPreset = "unsigned_upload"; // Create an unsigned upload preset in Cloudinary

    if (!cloudName || !apiKey || !apiSecret) {
      alert("Cloudinary credentials are missing. Please check your .env file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", pdfBlob, `stickers-${Date.now()}.pdf`);
    formData.append("upload_preset", uploadPreset);
    formData.append("api_key", apiKey);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const url = response.data.secure_url;
      setDownloadUrl(url);
      alert("PDF uploaded to Cloudinary successfully!");
    } catch (error) {
      console.error("Error uploading PDF to Cloudinary:", error);
      alert("Failed to upload PDF to Cloudinary.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">
        Cart ({cart.length} Stickers)
      </h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {cart.map((sticker, index) => (
              <div
                key={index}
                className="relative"
                ref={(el) => (stickerRefs.current[index] = el)}
              >
                <Sticker stickerData={sticker} />
                <button
                  onClick={() => handleRemove(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleGeneratePDF}
            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
          >
            Generate PDF
          </button>
          {downloadUrl && (
            <div className="mt-4 text-center">
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Download PDF
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;

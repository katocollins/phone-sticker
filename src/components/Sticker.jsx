import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";
import QRCode from "qrcode";

function Sticker({ stickerData }) {
  const { model, color, imei1, vc, size } = stickerData;

  // Refs for barcode and QR code canvases
  const barcodeRef = useRef(null);
  const qrCodeRef = useRef(null);

  // Generate barcode and QR code when the component mounts or stickerData changes
  useEffect(() => {
    // Generate Barcode (IMEI 1 only)
    if (imei1 && barcodeRef.current) {
      JsBarcode(barcodeRef.current, imei1, {
        format: "CODE128", // Common barcode format for IMEI
        width: 1,
        height: 40,
        displayValue: false,
      });
    }

    // Generate QR Code (all fields as JSON)
    if (qrCodeRef.current) {
      const qrData = JSON.stringify({
        model,
        color,
        imei1,
        vc,
        size,
      });
      QRCode.toCanvas(
        qrCodeRef.current,
        qrData,
        {
          width: 48, // Adjust size to fit the layout
          margin: 0,
        },
        (error) => {
          if (error) console.error("QR Code generation error:", error);
        }
      );
    }
  }, [model, color, imei1, vc, size]);

  return (
    <div className="w-48 h-28 border border-gray-300 p-2 flex flex-col">
      {/* Top Row: Model, Color, and "C" in a box */}
      <div className="flex justify-between items-center mb-1">
        <div className="text-sm font-semibold">
          Model: {model || "N/A"} {color || "N/A"}
        </div>
        <div className="w-5 h-5 border border-black flex items-center justify-center text-xs">
          C
        </div>
      </div>

      {/* Middle Row: Barcode and QR Code */}
      <div className="flex flex-1">
        {/* Barcode */}
        <div className="w-1/2 flex items-center justify-center">
          <canvas ref={barcodeRef} className="w-full" />
        </div>
        {/* QR Code and Details */}
        <div className="w-1/2 flex flex-col items-center">
          {/* QR Code */}
          <canvas ref={qrCodeRef} className="w-12 h-12" />
          {/* Details */}
          <div className="text-xs mt-1 text-center">
            <p>IMEI 1: {imei1 || "N/A"}</p>
            <p>VC: {vc || "N/A"}</p>
            <p>{size || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sticker;

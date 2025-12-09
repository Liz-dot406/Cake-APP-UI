// src/dashboard/customerDashboard/content/cakes/placeorders.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../../../features/orders/ordersAPI";
import type { CreateOrderPayload } from "../../../../features/orders/ordersAPI";
import type { TypeCake } from "../../../../features/cakes/cakesAPI";

interface PlaceOrderProps {
  cake: TypeCake;
  quantity: number;
  onClose: () => void;
  setCart: React.Dispatch<React.SetStateAction<TypeCake[]>>;
}

const normalizeSize = (s: string): "Small" | "Medium" | "Large" => {
  const formatted = s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  if (formatted === "Small" || formatted === "Medium" || formatted === "Large") return formatted;
  return "Medium";
};

const PlaceOrder: React.FC<PlaceOrderProps> = ({ cake, quantity, onClose, setCart }) => {
  const [selectedSize, setSelectedSize] = useState<"Small" | "Medium" | "Large">(normalizeSize(cake.size));
  const [customMessage, setCustomMessage] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!deliveryDate) {
      alert("Please select a delivery date.");
      return;
    }

    // Add to cart before checkout
    setCart((prev) => {
      if (prev.find((c) => c.cakeId === cake.cakeId)) return prev;
      return [...prev, cake];
    });

    const payload: CreateOrderPayload = {
      CakeID: cake.cakeId,
      Size: selectedSize,
      Flavor: String(cake.flavorsUsed || cake.size || "Unknown"),
      Message: customMessage,
      DeliveryDate: deliveryDate,
      Price: cake.price * quantity,
      userid: 1,
      Status: "Pending",
    };

    try {
      await createOrder(payload).unwrap();
      alert("Order placed successfully!");
      onClose();
      navigate("/customer/dashboard/orders");
    } catch (error) {
      console.error(error);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">

        {/* TITLE ONLY: Cake name */}
        <h2 className="text-xl font-bold mb-4 text-pink-700">
          Order: {cake.cakeName}
        </h2>

        {/* SIZE */}
        <label className="block mb-2 font-semibold">Select Size:</label>
        <select
          className="w-full border p-2 rounded mb-4"
          value={selectedSize}
          onChange={(e) => setSelectedSize(normalizeSize(e.target.value))}
        >
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>

        {/* CUSTOM MESSAGE */}
        <label className="block mb-2 font-semibold">Custom Message:</label>
        <input
          type="text"
          className="w-full border p-2 rounded mb-4"
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          placeholder="Optional"
        />

        {/* DELIVERY DATE */}
        <label className="block mb-2 font-semibold">Delivery Date:</label>
        <input
          type="date"
          className="w-full border p-2 rounded mb-4"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
        />

        {/* PRICE */}
        <p className="font-bold text-lg text-pink-600 mb-4">
          Total: Ksh {cake.price * quantity}
        </p>

        {/* BUTTONS */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded"
          >
            {isLoading ? "Placing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;

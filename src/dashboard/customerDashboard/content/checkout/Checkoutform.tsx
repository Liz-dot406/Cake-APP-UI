
import React, { useState } from "react";

type CheckoutFormProps = {
  totalPrice: number;
  onSubmit: (customerInfo: CustomerInfo) => void;
};

export type CustomerInfo = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

const CheckoutForm: React.FC<CheckoutFormProps> = ({ totalPrice, onSubmit }) => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(customerInfo); 
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Delivery Info</h2>

      <label className="block mb-2">
        Name:
        <input
          type="text"
          name="name"
          value={customerInfo.name}
          onChange={handleChange}
          required
          className="w-full border rounded px-2 py-1 mt-1"
        />
      </label>

      <label className="block mb-2">
        Email:
        <input
          type="email"
          name="email"
          value={customerInfo.email}
          onChange={handleChange}
          required
          className="w-full border rounded px-2 py-1 mt-1"
        />
      </label>

      <label className="block mb-2">
        Phone:
        <input
          type="tel"
          name="phone"
          value={customerInfo.phone}
          onChange={handleChange}
          required
          className="w-full border rounded px-2 py-1 mt-1"
        />
      </label>

      <label className="block mb-2">
        Delivery Address:
        <textarea
          name="address"
          value={customerInfo.address}
          onChange={handleChange}
          required
          className="w-full border rounded px-2 py-1 mt-1"
        />
      </label>

      <div className="flex justify-between mt-4 font-bold">
        <span>Total:</span>
        <span>KES {totalPrice}</span>
      </div>

      <button
        type="submit"
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded w-full"
      >
        Place Order
      </button>
    </form>
  );
};

export default CheckoutForm;

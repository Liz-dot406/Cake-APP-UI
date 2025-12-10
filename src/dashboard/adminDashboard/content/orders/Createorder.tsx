
import React, { useState } from "react";
import { useCreateOrderMutation } from "../../../../features/orders/ordersAPI";

type CreateOrderFormProps = {
  onSuccess?: () => void; 
};

const CreateOrderForm: React.FC<CreateOrderFormProps> = ({ onSuccess }) => {
  const [createOrder, { isLoading, isError }] = useCreateOrderMutation();

  const [formData, setFormData] = useState({
    userid: 0,
    DesignId: 0,
    CakeID: 0,
    Size: "Small" as "Small" | "Medium" | "Large",
    Flavor: "",
    Message: "",
    DeliveryDate: "",
    Notes: "",
    ExtendedDescription: "",
    SampleImages: "",
    ColorPreferences: "",
     Price: 0, 
     Status: "Pending"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "Size" ? (value as "Small" | "Medium" | "Large") : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createOrder(formData).unwrap();
      alert("Order created successfully!");
      setFormData({
        userid: 0,
        DesignId: 0,
        CakeID: 0,
        Size: "Small",
        Flavor: "",
        Message: "",
        DeliveryDate: "",
        Notes: "",
        ExtendedDescription: "",
        SampleImages: "",
        ColorPreferences: "",
         Price: 0, 
         Status: "Pending"
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      alert("Failed to create order.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 border rounded shadow">
      <div>
        <label>User ID:</label>
        <input
          type="number"
          name="userid"
          value={formData.userid}
          onChange={handleChange}
          required
          className="border p-1 w-full"
        />
      </div>

      <div>
        <label>Design ID (optional):</label>
        <input
          type="number"
          name="DesignId"
          value={formData.DesignId}
          onChange={handleChange}
          className="border p-1 w-full"
        />
      </div>

      <div>
        <label>Size:</label>
        <select
          name="Size"
          value={formData.Size}
          onChange={handleChange}
          className="border p-1 w-full"
        >
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>

      <div>
        <label>Flavor:</label>
        <input
          type="text"
          name="Flavor"
          value={formData.Flavor}
          onChange={handleChange}
          required
          className="border p-1 w-full"
        />
      </div>

      <div>
        <label>Message:</label>
        <input
          type="text"
          name="Message"
          value={formData.Message}
          onChange={handleChange}
          className="border p-1 w-full"
        />
      </div>

      <div>
        <label>Delivery Date:</label>
        <input
          type="date"
          name="DeliveryDate"
          value={formData.DeliveryDate}
          onChange={handleChange}
          required
          className="border p-1 w-full"
        />
      </div>

      <div>
        <label>Notes:</label>
        <input
          type="text"
          name="Notes"
          value={formData.Notes}
          onChange={handleChange}
          className="border p-1 w-full"
        />
      </div>

      <div>
        <label>Extended Description:</label>
        <input
          type="text"
          name="ExtendedDescription"
          value={formData.ExtendedDescription}
          onChange={handleChange}
          className="border p-1 w-full"
        />
      </div>

      <div>
        <label>Sample Images (comma separated):</label>
        <input
          type="text"
          name="SampleImages"
          value={formData.SampleImages}
          onChange={handleChange}
          className="border p-1 w-full"
        />
      </div>

      <div>
        <label>Color Preferences (comma separated):</label>
        <input
          type="text"
          name="ColorPreferences"
          value={formData.ColorPreferences}
          onChange={handleChange}
          className="border p-1 w-full"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isLoading ? "Creating..." : "Create Order"}
      </button>

      {isError && <p className="text-red-500">Error creating order.</p>}
    </form>
  );
};

export default CreateOrderForm;

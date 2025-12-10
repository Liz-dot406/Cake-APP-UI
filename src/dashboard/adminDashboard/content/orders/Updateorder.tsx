
import React, { useState } from "react";
import { useUpdateOrderDetailsMutation, type TypeOrder } from "../../../../features/orders/ordersAPI";

type UpdateOrderFormProps = {
  order: TypeOrder;
  onClose: () => void;
};

const UpdateOrderForm: React.FC<UpdateOrderFormProps> = ({ order, onClose }) => {
  const [status, setStatus] = useState(order.Status);
  const [deliveryDate, setDeliveryDate] = useState(order.DeliveryDate.split("T")[0]);
  const [updateOrder, { isLoading, isError }] = useUpdateOrderDetailsMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateOrder({ id: order.Id, Status: status, DeliveryDate: deliveryDate }).unwrap();
      alert("Order updated successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update order.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded bg-gray-50">
      <div>
        <label className="block font-semibold text-gray-700">Status:</label>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-700">Delivery Date:</label>
        <input
          type="date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          {isLoading ? "Updating..." : "Update"}
        </button>
      </div>

      {isError && <p className="text-red-500 font-semibold">Error updating order.</p>}
    </form>
  );
};

export default UpdateOrderForm;


import React from "react";
import { useDeleteOrderMutation } from "../../../../features/orders/ordersAPI";

type DeleteOrderButtonProps = {
  orderId: number;
  onDeleted?: () => void; 
};

const DeleteOrderButton: React.FC<DeleteOrderButtonProps> = ({ orderId, onDeleted }) => {
  const [deleteOrder, { isLoading }] = useDeleteOrderMutation();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await deleteOrder(orderId).unwrap();
      alert("Order deleted successfully!");
      onDeleted?.();
    } catch (err) {
      console.error(err);
      alert("Failed to delete order.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
      className="px-3 py-1 bg-red-500 text-white rounded"
    >
      {isLoading ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteOrderButton;

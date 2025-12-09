import React, { useState } from "react";
import { useGetOrdersQuery, useDeleteOrderMutation, type TypeOrder } from "../../../../features/orders/ordersAPI";
import UpdateOrderForm from "./Updateorder";
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle } from "react-icons/fa";

const OrdersPage: React.FC = () => {
  const { data: orders, isLoading, isError } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const [selectedOrder, setSelectedOrder] = useState<TypeOrder | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  if (isLoading)
    return <p className="text-pink-600 font-semibold text-center mt-10">Loading orders...</p>;
  if (isError)
    return <p className="text-red-500 font-semibold text-center mt-10">Error fetching orders.</p>;
  if (!orders || orders.length === 0)
    return <p className="text-gray-500 font-medium text-center mt-10">No orders found.</p>;

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrder(id).unwrap();
        alert("Order deleted successfully!");
      } catch (err) {
        console.error(err);
        alert("Failed to delete order.");
      }
    }
  };

  const handleUpdate = (order: TypeOrder) => {
    setSelectedOrder(order);
    setShowUpdateModal(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setShowUpdateModal(false);
  };

  const statusStyle = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 flex items-center gap-1 px-3 py-1 rounded-full font-semibold";
      case "completed":
        return "bg-green-100 text-green-800 flex items-center gap-1 px-3 py-1 rounded-full font-semibold";
      case "cancelled":
        return "bg-red-100 text-red-800 flex items-center gap-1 px-3 py-1 rounded-full font-semibold";
      default:
        return "bg-gray-100 text-gray-700 flex items-center gap-1 px-3 py-1 rounded-full font-semibold";
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <FaHourglassHalf />;
      case "completed":
        return <FaCheckCircle />;
      case "cancelled":
        return <FaTimesCircle />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-pink-700 text-center">Orders Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {orders.map((order) => (
          <div
            key={order.Id}
            className="bg-white shadow-lg hover:shadow-xl rounded-xl p-5 flex flex-col justify-between transition transform hover:-translate-y-1"
          >
            <div>
              <h3 className="text-xl font-bold text-pink-600 mb-2">Order #{order.Id}</h3>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">User ID:</span> {order.userid}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Flavor:</span> {order.Flavor}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Size:</span> {order.Size}
              </p>
              <p className={statusStyle(order.Status)}>
                {statusIcon(order.Status)}
                {order.Status.charAt(0).toUpperCase() + order.Status.slice(1)}
              </p>
              <p className="text-gray-500 mt-2">
                <span className="font-semibold">Delivery:</span> {order.DeliveryDate.split("T")[0]}
              </p>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleUpdate(order)}
                className="flex-1 mr-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg py-2 font-semibold transition flex justify-center items-center gap-2"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(order.Id)}
                className="flex-1 ml-2 bg-red-400 hover:bg-red-500 text-white rounded-lg py-2 font-semibold transition flex justify-center items-center gap-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      {showUpdateModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg border-2 border-pink-200">
            <h3 className="text-xl font-bold mb-3 text-pink-700">
              Update Order #{selectedOrder.Id}
            </h3>
            <UpdateOrderForm order={selectedOrder} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;

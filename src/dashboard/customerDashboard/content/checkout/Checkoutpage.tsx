import React from "react";
import type { TypeCake } from "../../../../features/cakes/cakesAPI";
import { useCreateOrderMutation } from "../../../../features/orders/ordersAPI";

interface CheckoutPageProps {
  cart: TypeCake[];
  clearCart: () => void;
  removeItem: (id: number) => void;
  currentUserId: number; 
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cart,
  clearCart,
  removeItem,
  currentUserId,
}) => {
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [deliveryDate, setDeliveryDate] = React.useState<string>(
    new Date().toISOString().split("T")[0] // default today
  );
  const [paymentMethod, setPaymentMethod] = React.useState<
    "Cash" | "Mobile" | "Card"
  >("Cash");

  // Ensure Size is valid
  const getValidSize = (size?: string): "Small" | "Medium" | "Large" => {
    const validSizes = ["Small", "Medium", "Large"] as const;
    return validSizes.includes(size as any) ? (size as "Small" | "Medium" | "Large") : "Medium";
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    
    if (paymentMethod === "Cash") {
      alert("You selected Cash on Delivery. Order will be processed.");
    } else if (paymentMethod === "Mobile") {
      alert("Simulating Mobile Payment... (Integrate M-Pesa API later)");
    } else if (paymentMethod === "Card") {
      alert("Simulating Card Payment... (Integrate Stripe later)");
    }

    try {
      
      for (const item of cart) {
        await createOrder({
          userid: currentUserId,
          CakeID: item.cakeId,
          Size: getValidSize(item.size),
          Flavor: item.flavorsUsed || "Default Flavor",
          Price: item.price,
          DeliveryDate: deliveryDate,
          Status: "Pending",
        }).unwrap();
      }

      alert("Order placed successfully!");
      clearCart();
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Please try again.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-pink-700 mb-4">Checkout</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-pink-700 mb-6">Checkout</h1>

      {/* Delivery Date Picker */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Select Delivery Date:</label>
        <input
          type="date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Payment Method Selection */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Select Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value as any)}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="Cash">Cash on Delivery</option>
          <option value="Mobile">Mobile Payment (e.g., M-Pesa)</option>
          <option value="Card">Card Payment</option>
        </select>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.cakeId}
            className="border p-4 rounded-lg shadow bg-white flex flex-col gap-2"
          >
            <h2 className="text-lg font-semibold text-gray-800">{item.cakeName}</h2>
            <div className="flex justify-between text-sm text-gray-600">
              <p>Size: {getValidSize(item.size)}</p>
              <p>Price: Ksh {item.price}</p>
            </div>

            <button
              onClick={() => removeItem(item.cakeId)}
              className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Total Amount */}
      <div className="mt-6 p-4 border rounded bg-gray-100">
        <p className="text-lg font-bold">
          Total Amount: Ksh {cart.reduce((sum, item) => sum + item.price, 0)}
        </p>
      </div>

      {/* Confirm Checkout */}
      <button
        className="mt-4 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded w-full"
        onClick={handleCheckout}
        disabled={isLoading}
      >
        {isLoading ? "Placing Order..." : "Confirm Checkout"}
      </button>

      {/* Clear Cart */}
      <button
        onClick={clearCart}
        className="mt-2 w-full bg-gray-500 text-white px-4 py-2 rounded"
      >
        Clear Cart
      </button>
    </div>
  );
};

export default CheckoutPage;

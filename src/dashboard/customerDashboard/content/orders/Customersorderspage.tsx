import React, { useState } from "react";
import { useGetCakesQuery } from "../../../../features/cakes/cakesAPI";
import CheckoutPage from "../checkout/Checkoutpage";
import type { TypeCake } from "../../../../features/cakes/cakesAPI";

const CustomersOrdersPage: React.FC = () => {
  const { data: cakes, isLoading, isError } = useGetCakesQuery();
  const [cart, setCart] = useState<TypeCake[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);

  const addToCart = (cake: TypeCake) => {
    setCart((prev) => [...prev, cake]);
  };

  const removeFromCart = (cakeId: number) => {
    setCart((prev) => prev.filter((c) => c.cakeId !== cakeId));
  };

  const clearCart = () => setCart([]);

  if (isLoading) return <p className="p-4">Loading cakes...</p>;
  if (isError) return <p className="p-4 text-red-600">Failed to load cakes.</p>;
  if (!cakes || cakes.length === 0) return <p className="p-4">No cakes found.</p>;


const currentUserId = 1;
 if (showCheckout) {
  return (
    <CheckoutPage
      cart={cart}
      clearCart={clearCart}
      removeItem={removeFromCart}
      currentUserId={currentUserId} 
    />
  );
}



  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-pink-700 mb-6">Browse Cakes</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {cakes.map((cake) => (
          <div
            key={cake.cakeId}
            className="border rounded shadow-md p-4 flex flex-col justify-between"
          >
            {/*  Removed ALL images */}
            
            <h2 className="text-lg font-bold">{cake.cakeName}</h2>
            <p className="text-sm">Flavor: {cake.flavorsUsed}</p>
            <p className="text-sm">Price: KES {cake.price}</p>

            <button
              onClick={() => addToCart(cake)}
              className="mt-3 bg-pink-500 text-white px-3 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Preview */}
      <div className="fixed bottom-4 right-4 bg-white p-4 rounded shadow-md w-72">
        <h2 className="text-lg font-bold mb-2">Cart ({cart.length})</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-2">
            {cart.map((c) => (
              <div key={c.cakeId} className="flex justify-between items-center">
                <span>{c.cakeName}</span>
                <button
                  onClick={() => removeFromCart(c.cakeId)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              onClick={() => setShowCheckout(true)}
              className="mt-3 bg-green-600 text-white px-4 py-2 rounded w-full"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomersOrdersPage;

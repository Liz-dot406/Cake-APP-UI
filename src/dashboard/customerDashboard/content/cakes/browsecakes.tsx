import React, { useState } from "react";
import { useGetCakesQuery } from "../../../../features/cakes/cakesAPI";
import { cakeImages } from "../../../../assets/CakeImages";
import type { TypeCake } from "../../../../features/cakes/cakesAPI";
import PlaceOrder from "./placeorders";

type BrowseCakesGalleryProps = {
  cart: TypeCake[];
  setCart: React.Dispatch<React.SetStateAction<TypeCake[]>>;
};

const BrowseCakesGallery: React.FC<BrowseCakesGalleryProps> = ({ cart, setCart }) => {
  const { data: cakes, isLoading, isError } = useGetCakesQuery();
  const [selectedCake, setSelectedCake] = useState<TypeCake | null>(null);

  if (isLoading) return <p className="p-4">Loading cakes...</p>;
  if (isError) return <p className="p-4 text-red-600">Failed to load cakes.</p>;

  const cakesToShow = cakes ?? [];

  const addToCart = (cake: TypeCake) => {
    if (!cart.find(c => c.cakeId === cake.cakeId)) {
      setCart(prev => [...prev, cake]);
    }
    setSelectedCake(cake); // open modal
  };

  // Keyword-based image mapping
  const getCakeImage = (apiName?: string) => {
    if (!apiName) return cakeImages.default;

    const name = apiName.toLowerCase();

    if (name.includes("vanilla swirl cupcake")) return cakeImages["choco lava cupcakes.png"];
    if (name.includes("chocolate")) return cakeImages["choco.jpg"];
    if (name.includes("vanilla")) return cakeImages["vanillabliss.jpg"];
    if (name.includes("redvelvet") || name.includes("red velvet")) return cakeImages["ck1.jpg"];
    if (name.includes("blackforest") || name.includes("black forest")) return cakeImages["ck2.jpg"];
    if (name.includes("strawberry")) return cakeImages["strawberry.jpg"];

    return cakeImages.default;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-pink-700 mb-6">Browse Cakes Gallery</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cakesToShow.map((cake) => {
          const imageSrc = getCakeImage(cake.imageURL);

          return (
            <div
              key={cake.cakeId}
              className="border rounded shadow hover:shadow-lg hover:scale-105 transition transform p-4 flex flex-col items-center bg-white"
            >
              <img
                src={imageSrc}
                alt={cake.cakeName ?? "Cake"}
                className="w-full h-40 object-cover rounded mb-2"
              />

              <h2 className="text-lg font-semibold text-center text-pink-700">{cake.cakeName}</h2>

              {cake.flavorsUsed ? (
                <p className="text-gray-600 text-sm text-center line-clamp-2">
                  Flavors: {cake.flavorsUsed}
                </p>
              ) : (
                <p className="text-gray-400 text-sm text-center italic">No flavor info</p>
              )}

              <p className="font-bold text-pink-700 mt-2 mb-2">Ksh {cake.price}</p>

              {cake.isactive ? (
                <span className="bg-green-500 text-white px-3 py-1 rounded text-sm">Available</span>
              ) : (
                <span className="bg-red-500 text-white px-3 py-1 rounded text-sm">Unavailable</span>
              )}

              {cake.isactive && (
                <button
                  onClick={() => addToCart(cake)}
                  className="mt-4 w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded transition"
                >
                  Select this Cake
                </button>
              )}
            </div>
          );
        })}
      </div>

      {selectedCake && (
        <PlaceOrder
          cake={selectedCake}
          quantity={1}
          onClose={() => setSelectedCake(null)}
          setCart={setCart}
        />
      )}
    </div>
  );
};

export default BrowseCakesGallery;

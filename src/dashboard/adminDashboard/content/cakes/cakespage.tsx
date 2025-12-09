import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { cakesAPI, type TypeCake } from "../../../../features/cakes/cakesAPI";
import { CreateCakeModal } from "./Createcake";
import { UpdateCakeModal } from "./Updatecake";
import { DeleteCakeModal } from "./Deletecake";
import { toast } from "sonner";
import { cakeImages } from "../../../../assets/CakeImages";

export default function CakesPage() {
  const [selectedCake, setSelectedCake] = useState<TypeCake | null>(null);
  const [cakeToDelete, setCakeToDelete] = useState<TypeCake | null>(null);

  const { data: cakesData, isLoading, error, refetch } = cakesAPI.useGetCakesQuery();

 
  const getCakeImage = (apiName?: string) => {
    if (!apiName) return cakeImages.default;

    const name = apiName.toLowerCase();

    if (name.includes("choco lava")) return cakeImages["choco lava cupcakes.png"];
    if (name.includes("chocolate")) return cakeImages["choco.jpg"];
    if (name.includes("vanilla")) return cakeImages["vanillabliss.jpg"];
    if (name.includes("redvelvet") || name.includes("red velvet")) return cakeImages["ck1.jpg"];
    if (name.includes("blackforest") || name.includes("black forest")) return cakeImages["ck2.jpg"];
    if (name.includes("strawberry")) return cakeImages["strawberry.jpg"];

    return cakeImages.default;
  };

  const handleDeleteClick = (cake: TypeCake) => {
    toast.promise(
      new Promise<void>((resolve, reject) => {
        const confirmed = window.confirm(`Are you sure you want to delete "${cake.cakeName}"?`);
        if (confirmed) {
          setCakeToDelete(cake);
          const modal = document.getElementById(`delete_cake_modal_${cake.cakeId}`) as HTMLDialogElement;
          modal?.showModal();
          resolve();
        } else {
          reject();
        }
      }),
      {
        loading: "Checking...",
        success: "Ready to delete!",
        error: "Delete cancelled",
      }
    );
  };

  return (
    <div className="p-4">
      {/* Add Cake Button */}
      <div className="flex justify-center mb-6 mt-3">
        <button
          className="btn bg-pink-600 text-white hover:bg-pink-700 border border-pink-500 rounded-lg px-4 py-2 text-lg font-semibold"
          onClick={() => (document.getElementById("create_cake_modal") as HTMLDialogElement)?.showModal()}
        >
          Add Cake
        </button>
      </div>

      {/* Modals */}
      <CreateCakeModal refetchCakes={refetch} />
      <UpdateCakeModal selectedCake={selectedCake} refetchCakes={refetch} />
      {cakeToDelete && (
        <DeleteCakeModal
          cake={{
            cake_Id: cakeToDelete.cakeId,
            name: cakeToDelete.cakeName,
          }}
          refetchCakes={refetch}
        />
      )}

      {/* Loading/Error */}
      {isLoading && <p className="text-center mt-4">Loading cakes...</p>}
      {error && (
        <p className="text-red-500 text-center mt-4">
          {(error as any)?.data?.message || "Failed to fetch cakes."}
        </p>
      )}

      {/* Cakes Grid */}
      {!isLoading && cakesData && cakesData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cakesData.map((cake) => {
            const imageSrc = getCakeImage(cake.imageURL);

            // Debug log
            console.log("Cake:", cake.cakeName, "imageURL:", cake.imageURL, "imageSrc:", imageSrc);

            return (
              <div
                key={cake.cakeId}
                className="border rounded-lg shadow hover:shadow-lg hover:scale-105 transition transform p-4 flex flex-col items-center bg-white"
              >
                {/* Cake Image */}
                <img src={imageSrc} alt={cake.cakeName} className="w-full h-40 object-cover rounded mb-2" />

                {/* Cake Info */}
                <h2 className="text-lg font-semibold text-center text-pink-700">{cake.cakeName}</h2>
                {cake.flavorsUsed ? (
                  <p className="text-gray-600 text-sm text-center line-clamp-2">Flavors: {cake.flavorsUsed}</p>
                ) : (
                  <p className="text-gray-400 text-sm text-center italic">No flavor info</p>
                )}

                <p className="font-bold text-pink-600 mt-2 mb-2">Ksh {cake.price}</p>
                <span
                  className={`px-3 py-1 rounded text-sm ${
                    cake.isactive ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  }`}
                >
                  {cake.isactive ? "Available" : "Unavailable"}
                </span>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <button
                    className="btn btn-sm bg-pink-600 hover:bg-pink-700 text-white flex items-center justify-center"
                    onClick={() => {
                      setSelectedCake(cake);
                      (document.getElementById("update_cake_modal") as HTMLDialogElement)?.showModal();
                    }}
                  >
                    <FaEdit size={18} />
                  </button>

                  <button
                    className="btn btn-sm bg-gray-200 hover:bg-gray-300 text-red-600 flex items-center justify-center"
                    onClick={() => handleDeleteClick(cake)}
                  >
                    <MdDeleteForever size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        !isLoading && (!cakesData || cakesData.length === 0) && (
          <p className="text-center mt-4 text-gray-700">No cakes found.</p>
        )
      )}
    </div>
  );
}

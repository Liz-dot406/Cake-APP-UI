import { cakesAPI } from "../../../../features/cakes/cakesAPI";
import { toast } from "sonner";

type DeleteCakeModalProps = {
  cake: { cake_Id: number; name: string };
  refetchCakes?: () => void;
};

export const DeleteCakeModal = ({ cake, refetchCakes }: DeleteCakeModalProps) => {
  const [deleteCake, { isLoading }] = cakesAPI.useDeleteCakeMutation();

  const handleDelete = async () => {
    try {
      
      await deleteCake(cake.cake_Id).unwrap();
      toast.success("Cake deleted successfully!");

     
      if (refetchCakes) refetchCakes();

      (document.getElementById(`delete_cake_modal_${cake.cake_Id}`) as HTMLDialogElement)?.close();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete cake.");
    }
  };

  return (
    <dialog id={`delete_cake_modal_${cake.cake_Id}`} className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-md mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Delete Cake</h3>
        <p>
          Are you sure you want to delete <strong>{cake.name}</strong>?
        </p>
        <div className="modal-action mt-4">
          <button className="btn btn-error" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Delete"}
          </button>
          <button
            className="btn"
            onClick={() =>
              (document.getElementById(`delete_cake_modal_${cake.cake_Id}`) as HTMLDialogElement)?.close()
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

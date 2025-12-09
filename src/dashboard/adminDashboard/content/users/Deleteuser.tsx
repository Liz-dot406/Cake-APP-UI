import { toast } from "sonner";
import { usersAPI, type Typeuser } from "../../../../features/users/usersAPI";

type DeleteUserModalProps = {
  userToDelete: Typeuser | null;
  refetchUsers: () => void;
};

export const DeleteUserModal = ({ userToDelete, refetchUsers }: DeleteUserModalProps) => {
  const [deleteUser, { isLoading }] = usersAPI.useDeleteUserMutation();

  const handleDelete = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete.user_Id).unwrap();
      toast.success(`User "${userToDelete.name}" deleted successfully`);
      (document.getElementById("delete_modal") as HTMLDialogElement)?.close();
      refetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user. Try again.");
    }
  };

  return (
    <dialog id="delete_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-md mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Delete User</h3>
        <p>
          Are you sure you want to delete{" "}
          <span className="font-semibold">{userToDelete?.name}</span>?
        </p>
        <div className="modal-action mt-4 flex gap-2">
          <button
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Yes, Delete"}
          </button>
          <button
            className="btn"
            onClick={() => (document.getElementById("delete_modal") as HTMLDialogElement)?.close()}
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { usersAPI, type Typeuser } from "../../../../features/users/usersAPI";

type UpdateUserModalProps = {
  selectedUser: Typeuser | null;
  refetchUsers: () => void;
};

type UpdateUserForm = {
  name: string;
  email: string;
  role: "admin" | "customer";
  is_verified: boolean;
};

const schema = yup.object({
  name: yup.string().required("Name is required").max(75),
  email: yup.string().email("Invalid email").required("Email is required"),
  role: yup.string().oneOf(["admin", "customer"]).required("Role is required"),
  is_verified: yup.boolean().required(),
});

export const UpdateUserModal = ({ selectedUser, refetchUsers }: UpdateUserModalProps) => {
  const [updateUser, { isLoading }] = usersAPI.useUpdateUserMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<UpdateUserForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      role: "customer",
      is_verified: false, 
    },
  });

  
  useEffect(() => {
    if (selectedUser) {
      reset({
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role,
        is_verified: selectedUser.is_verified ?? false, 
      });
    }
  }, [selectedUser, reset]);

  const onSubmit: SubmitHandler<UpdateUserForm> = async (data) => {
    if (!selectedUser) return;

    try {
      await updateUser({ user_Id: selectedUser.user_Id, ...data }).unwrap();
      toast.success("User updated successfully");
      (document.getElementById("update_modal") as HTMLDialogElement)?.close();
      refetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user. Try again.");
    }
  };

  return (
    <dialog id="update_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Update User</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input {...register("name")} placeholder="Name" className="input rounded w-full p-2 text-gray-800" />
          {errors.name && <span className="text-red-700">{errors.name.message}</span>}

          <input {...register("email")} placeholder="Email" className="input rounded w-full p-2 text-gray-800" />
          {errors.email && <span className="text-red-700">{errors.email.message}</span>}

          <select {...register("role")} className="input rounded w-full p-2 text-gray-800">
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>

          <div className="flex gap-4 items-center">
            <label className="text-white">Verified:</label>
            <input type="checkbox" {...register("is_verified")} className="checkbox checkbox-success" />
          </div>

          <div className="modal-action">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => (document.getElementById("update_modal") as HTMLDialogElement)?.close()}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

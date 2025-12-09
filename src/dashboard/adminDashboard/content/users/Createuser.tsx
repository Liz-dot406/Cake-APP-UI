import { usersAPI } from "../../../../features/users/usersAPI";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

export type CreateUserForm = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "customer";
  is_verified: boolean;
};


interface CreateUserModalProps {
  refetchUsers?: () => void; 
}

export const CreateUserModal = ({ refetchUsers }: CreateUserModalProps) => {
  const [createUser, { isLoading }] = usersAPI.useCreateUserMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<CreateUserForm>({
    resolver: yupResolver(
      yup.object({
        name: yup.string().required("Name is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup.string().min(6, "Password too short").required("Password is required"),
        role: yup.string().oneOf(["admin", "customer"]).required("Role is required"),
        is_verified: yup.boolean().required(),
      })
    ),
  });

  const onSubmit: SubmitHandler<CreateUserForm> = async (data) => {
    try {
      await createUser(data).unwrap();
      toast.success("User created successfully!");

      
      if (refetchUsers) refetchUsers();

     
      (document.getElementById("create_user_modal") as HTMLDialogElement)?.close();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create user.");
    }
  };

  return (
    <dialog id="create_user_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Create User</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input {...register("name")} placeholder="Name" className="input rounded w-full p-2 text-gray-800" />
          {errors.name && <span className="text-red-700">{errors.name.message}</span>}

          <input {...register("email")} placeholder="Email" className="input rounded w-full p-2 text-gray-800" />
          {errors.email && <span className="text-red-700">{errors.email.message}</span>}

          <input {...register("password")} type="password" placeholder="Password" className="input rounded w-full p-2 text-gray-800" />
          {errors.password && <span className="text-red-700">{errors.password.message}</span>}

          <div className="flex gap-6">
            <label>
              <input type="radio" value="admin" {...register("role")} className="radio radio-success" /> Admin
            </label>
            <label>
              <input type="radio" value="customer" {...register("role")} className="radio radio-warning" defaultChecked /> Customer
            </label>
          </div>

          <div className="modal-action">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create"}
            </button>
            <button type="button" className="btn" onClick={() => (document.getElementById("create_user_modal") as HTMLDialogElement)?.close()}>
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

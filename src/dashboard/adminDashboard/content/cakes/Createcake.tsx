import { cakesAPI, type TypeCake } from "../../../../features/cakes/cakesAPI";
import { useForm, type SubmitHandler, type Resolver } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";


export type CreateCakeForm = {
  name: string;
  description: string;
  price: number;
  available: boolean;
  image?: string | null; 
};


interface CreateCakeModalProps {
  refetchCakes?: () => void;
}


const createCakeSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  available: yup.boolean().required(),
  image: yup.string().nullable(), 
});

export const CreateCakeModal = ({ refetchCakes }: CreateCakeModalProps) => {
  const [createCake, { isLoading }] = cakesAPI.useCreateCakeMutation();

 
  const { register, handleSubmit, formState: { errors } } = useForm<CreateCakeForm>({
    resolver: yupResolver(createCakeSchema) as unknown as Resolver<CreateCakeForm>,
  });

  
  const onSubmit: SubmitHandler<CreateCakeForm> = async (data) => {
    try {
      const normalizedData: Partial<TypeCake> = {
  ...data,
  imageURL: data.image ?? undefined, 
};

      await createCake(normalizedData).unwrap();
      toast.success("Cake created successfully!");

      if (refetchCakes) refetchCakes();

      (document.getElementById("create_cake_modal") as HTMLDialogElement)?.close();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create cake.");
    }
  };

  return (
    <dialog id="create_cake_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Create Cake</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input {...register("name")} placeholder="Cake Name" className="input rounded w-full p-2 text-gray-800" />
          {errors.name && <span className="text-red-700">{errors.name.message}</span>}

          <textarea {...register("description")} placeholder="Description" className="textarea rounded w-full p-2 text-gray-800" />
          {errors.description && <span className="text-red-700">{errors.description.message}</span>}

          <input {...register("price")} type="number" placeholder="Price" className="input rounded w-full p-2 text-gray-800" />
          {errors.price && <span className="text-red-700">{errors.price.message}</span>}

          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("available")} className="checkbox" />
            Available
          </label>

          <input {...register("image")} placeholder="Image URL (optional)" className="input rounded w-full p-2 text-gray-800" />

          <div className="modal-action">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create"}
            </button>
            <button type="button" className="btn" onClick={() => (document.getElementById("create_cake_modal") as HTMLDialogElement)?.close()}>
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

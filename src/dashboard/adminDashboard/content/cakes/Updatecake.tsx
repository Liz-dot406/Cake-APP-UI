import { useEffect } from "react";
import { cakesAPI, type TypeCake } from "../../../../features/cakes/cakesAPI";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";


type UpdateCakeModalProps = {
  selectedCake: TypeCake | null;
  refetchCakes?: () => void;
};


export type UpdateCakeForm = {
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string | null; 
};

export const UpdateCakeModal = ({ selectedCake, refetchCakes }: UpdateCakeModalProps) => {
  const [updateCake, { isLoading }] = cakesAPI.useUpdateCakeMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<UpdateCakeForm>({
    resolver: yupResolver(
      yup.object({
        name: yup.string().required("Name is required"),
        description: yup.string().required("Description is required"),
        price: yup.number().required("Price is required").positive("Must be positive"),
        available: yup.boolean().required(),
        image: yup.string().nullable().required(), 
      })
    ) as any, 
    defaultValues: selectedCake
      ? {
          name: selectedCake.cakeName,
          description: selectedCake.description,
          price: selectedCake.price,
          available: selectedCake.available,
          image: selectedCake.imageURL?? null,
        }
      : undefined,
  });

  
  useEffect(() => {
    if (selectedCake) {
      reset({
        name: selectedCake.cakeName,
        description: selectedCake.description,
        price: selectedCake.price,
        available: selectedCake.available,
        image: selectedCake.imageURL?? null,
      });
    }
  }, [selectedCake, reset]);

  const onSubmit: SubmitHandler<UpdateCakeForm> = async (data) => {
    if (!selectedCake) return;

    try {
      
      const payload = {
        ...data,
        image: data.image ?? undefined,
        cake_Id: selectedCake.cakeId,
      };

      await updateCake(payload).unwrap();
      toast.success("Cake updated successfully!");
      if (refetchCakes) refetchCakes();
      (document.getElementById("update_cake_modal") as HTMLDialogElement)?.close();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update cake.");
    }
  };

  return (
    <dialog id="update_cake_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Update Cake</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input {...register("name")} placeholder="Name" className="input rounded w-full p-2 text-gray-800" />
          {errors.name && <span className="text-red-700">{errors.name.message}</span>}

          <input {...register("description")} placeholder="Description" className="input rounded w-full p-2 text-gray-800" />
          {errors.description && <span className="text-red-700">{errors.description.message}</span>}

          <input {...register("price")} type="number" placeholder="Price" className="input rounded w-full p-2 text-gray-800" />
          {errors.price && <span className="text-red-700">{errors.price.message}</span>}

          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("available")} className="checkbox checkbox-success" />
            Available
          </label>

          <input {...register("image")} placeholder="Image URL (optional)" className="input rounded w-full p-2 text-gray-800" />

          <div className="modal-action">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update"}
            </button>
            <button type="button" className="btn" onClick={() => (document.getElementById("update_cake_modal") as HTMLDialogElement)?.close()}>
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

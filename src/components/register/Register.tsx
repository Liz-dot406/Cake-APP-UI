import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { usersAPI } from "../../features/auth/userApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock, AiOutlineHome, AiOutlinePhone } from "react-icons/ai";

type RegisterInputs = {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
};

const schema: yup.ObjectSchema<RegisterInputs> = yup.object({
  name: yup.string().max(50).required("Name is required"),
  email: yup.string().email().max(100).required("Email is required"),
  phone: yup.string().matches(/^\+?\d{10,15}$/).max(20).required("Phone number is required"),
  address: yup.string().max(255).required("Address is required"),
  password: yup.string().min(6).max(255).required("Password is required"),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Confirm password is required"),
});

export const Register = () => {
  const navigate = useNavigate();
  const [createUser, { isLoading }] = usersAPI.useCreateUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterInputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    try {
      await createUser({ ...data, role: "customer" }).unwrap();
      toast.success("Registration successful!");
      reset();
      navigate("/verification", { state: { email: data.email } });
    } catch (error: any) {
      const message = error?.data?.message || error?.message || "An unknown error occurred";
      if (/unique/i.test(message)) toast.warning("Email or phone already exists. Please use another.");
      else toast.error(message);
    }
  };

  const inputWrapperClass = "relative w-full";
  const inputClass = (error?: string) =>
    `w-full p-3 pl-10 rounded-lg border ${error ? "border-rose-500" : "border-rose-200"} focus:outline-none focus:ring-2 focus:ring-rose-300 transition bg-pink-50 text-pink-900 placeholder-pink-400`;
  const iconClass = "absolute left-3 top-3 text-rose-400";

  return (
    <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 min-h-screen py-20 px-4">
    
      <div className="flex justify-center">
        <div className="w-full max-w-lg my-20">
          <div className="p-10 rounded-3xl shadow-2xl bg-white/90 backdrop-blur-md border border-rose-100 transform transition hover:scale-105">
            <h1 className="text-3xl font-extrabold mb-2 text-center text-rose-700 tracking-wide">Create Your Account</h1>
            <p className="text-center text-rose-400 mb-6 font-medium">Join Bakers House and start baking happiness!</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              
              <div className={inputWrapperClass}>
                <AiOutlineUser className={iconClass} />
                <input type="text" {...register("name")} placeholder="Name" className={inputClass(errors.name?.message)} />
                {errors.name && <span className="text-rose-600 text-sm">{errors.name.message}</span>}
              </div>

              
              <div className={inputWrapperClass}>
                <AiOutlineMail className={iconClass} />
                <input type="email" {...register("email")} placeholder="Email" className={inputClass(errors.email?.message)} />
                {errors.email && <span className="text-rose-600 text-sm">{errors.email.message}</span>}
              </div>

              
              <div className={inputWrapperClass}>
                <AiOutlinePhone className={iconClass} />
                <input type="text" {...register("phone")} placeholder="Phone Number" className={inputClass(errors.phone?.message)} />
                {errors.phone && <span className="text-rose-600 text-sm">{errors.phone.message}</span>}
              </div>

          
              <div className={inputWrapperClass}>
                <AiOutlineHome className={iconClass} />
                <input type="text" {...register("address")} placeholder="Address" className={inputClass(errors.address?.message)} />
                {errors.address && <span className="text-rose-600 text-sm">{errors.address.message}</span>}
              </div>

           
              <div className={inputWrapperClass}>
                <AiOutlineLock className={iconClass} />
                <input type={showPassword ? "text" : "password"} {...register("password")} placeholder="Password" className={inputClass(errors.password?.message)} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-sm text-rose-500 hover:text-rose-700">{showPassword ? "Hide" : "Show"}</button>
                {errors.password && <span className="text-rose-600 text-sm">{errors.password.message}</span>}
              </div>

              
              <div className={inputWrapperClass}>
                <AiOutlineLock className={iconClass} />
                <input type={showConfirm ? "text" : "password"} {...register("confirmPassword")} placeholder="Confirm Password" className={inputClass(errors.confirmPassword?.message)} />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-3 text-sm text-rose-500 hover:text-rose-700">{showConfirm ? "Hide" : "Show"}</button>
                {errors.confirmPassword && <span className="text-rose-600 text-sm">{errors.confirmPassword.message}</span>}
              </div>

              
              <button type="submit" disabled={isLoading} className="w-full mt-6 py-3 bg-rose-600 hover:bg-rose-700 text-white text-lg rounded-xl shadow-md transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? <> <span className="loading loading-spinner text-white mr-2" /> Please wait... </> : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

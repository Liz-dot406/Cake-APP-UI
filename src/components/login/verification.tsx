import { Navbar } from "../navabr/Navbar";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { usersAPI } from "../../features/auth/userApi";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";

type VerifyInputs = {
  email: string;
  verification_code: number;
};

const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email")
    .max(100, "Max 100 characters")
    .required("Email is required"),
    verification_code: yup
    .number().min(6,"Enter atleast 6 characters")
    .required("Code is required"),
});

export const Verification = () => {
  const [verifyUser, { isLoading }] = usersAPI.useVerifyUserMutation();
  const location = useLocation();
  const navigate = useNavigate();

  const emailState = location.state?.email || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyInputs>({
    resolver: yupResolver(schema),
    defaultValues: { email: emailState },
  });

  const onSubmit: SubmitHandler<VerifyInputs> = async (data) => {

     const payload = {
        email: data.email.trim().toLowerCase(),
        verification_code: data.verification_code,
      }; 
      
    try { 
     await verifyUser(payload)
      toast.success("Verification successful!");
      navigate("/login");
    } catch (error: any) {
        toast.error("Verification failed") 
        return;   
  };
}

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 px-4">
        <div className="w-full max-w-lg p-8 rounded-2xl shadow-xl bg-white/90 backdrop-blur-sm border border-rose-100">
          <h1 className="text-3xl font-extrabold mb-6 text-center text-rose-700">
            Verify Your Account
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="input border border-rose-200 rounded-md w-full p-3 text-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-300 bg-rose-50/50 placeholder:text-rose-300"
            />
            {errors.email && (
              <span className="text-rose-600 text-sm">{errors.email.message}</span>
            )}

            <input
              type="number"
              {...register("verification_code")}
              placeholder="Verification Code"
              className="input border border-rose-200 rounded-md w-full p-3 text-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-300 bg-rose-50/50 placeholder:text-rose-300"
            />
            {errors.verification_code && (
              <span className="text-rose-600 text-sm">{errors.verification_code.message}</span>
            )}

            <button
              type="submit"
              className="btn w-full mt-6 py-3 bg-rose-600 hover:bg-rose-700 text-white text-lg rounded-md shadow-md transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner text-white" /> Verifying...
                </>
              ) : (
                "Verify Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

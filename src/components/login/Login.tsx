import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginAPI } from "../../features/auth/loginapi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";
import { loginSuccess } from "../../features/auth/userslice";

type LoginInputs = {
  email: string;
  password: string;
};

type LoginUser = {
  user_id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  isVerified: boolean;
};

type LoginResponse = {
  user: LoginUser;
  message: string;
  token?: string;
};

const schema = yup.object({
  email: yup.string().email("Invalid email").max(100).required("Email is required"),
  password: yup.string().min(6).max(20).required("Password is required"),
});

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser, { isLoading }] = loginAPI.useLoginUserMutation();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginInputs>({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  
  useEffect(() => {
    reset({ email: "", password: "" });
  }, [reset]);

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const responseFromServer = await loginUser(data).unwrap();

      const response: LoginResponse = {
        ...responseFromServer,
        user: {
          ...responseFromServer.user,
          isVerified: true,
        },
      };

      if (!response.user.isVerified) {
        toast.error("Please verify your email before login");
        return;
      }

      toast.success(response.message);
      dispatch(loginSuccess(response));
      reset(); 

      if (response.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/customer/dashboard");
      }
    } catch (error: any) {
      const errMsg =
        error?.data?.error ||
        error?.data?.message ||
        error?.message ||
        "Something went wrong";
      toast.error(errMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-white px-6 py-12">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-pink-700 mb-2">Welcome Back</h1>
        <p className="text-center text-gray-500 mb-8">Log in to your Bakers House account</p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          autoComplete="off" 
        >
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              autoComplete="off"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              autoComplete="new-password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner text-white" /> Please wait...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-pink-600 hover:underline font-medium">
            Sign up
          </a>
        </p>

        <p className="text-center mt-2">
          <a href="/forgot-password" className="text-sm text-pink-500 hover:underline">
            Forgot your password?
          </a>
        </p>
      </div>
    </div>
  );
};

import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { AiOutlineUser, AiOutlineMail, AiOutlineMessage } from "react-icons/ai";

type ContactFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

const schema: yup.ObjectSchema<ContactFormInputs> = yup.object({
  firstName: yup.string().max(50).required("First Name is required"),
  lastName: yup.string().max(50).required("Last Name is required"),
  email: yup.string().email().max(100).required("Email is required"),
  subject: yup.string().max(100).required("Subject is required"),
  message: yup.string().max(1000).required("Message is required"),
});

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    try {
      console.log("Form Submitted:", data); 
      toast.success("Message sent successfully!");
      reset();
    } catch {
      toast.error("Failed to send message. Try again later.");
    }
  };

  const inputWrapperClass = "relative w-full";
  const inputClass = (error?: string) =>
    `w-full p-3 pl-10 rounded-lg border ${error ? "border-rose-500" : "border-pink-200"} bg-pink-50 text-pink-900 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 transition`;
  const iconClass = "absolute left-3 top-3 text-pink-400";

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50">
      
      <div className="w-full max-w-2xl my-20 p-10 rounded-3xl shadow-2xl bg-white/90 backdrop-blur-md border border-rose-100 transform transition hover:scale-105">
        <h2 className="text-3xl font-bold mb-6 text-center text-pink-700">Contact Us</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className={inputWrapperClass}>
              <AiOutlineUser className={iconClass} />
              <input type="text" placeholder="First Name" {...register("firstName")} className={inputClass(errors.firstName?.message)} />
              {errors.firstName && <span className="text-rose-600 text-sm">{errors.firstName.message}</span>}
            </div>

            <div className={inputWrapperClass}>
              <AiOutlineUser className={iconClass} />
              <input type="text" placeholder="Last Name" {...register("lastName")} className={inputClass(errors.lastName?.message)} />
              {errors.lastName && <span className="text-rose-600 text-sm">{errors.lastName.message}</span>}
            </div>
          </div>

          
          <div className={inputWrapperClass}>
            <AiOutlineMail className={iconClass} />
            <input type="email" placeholder="Email Address" {...register("email")} className={inputClass(errors.email?.message)} />
            {errors.email && <span className="text-rose-600 text-sm">{errors.email.message}</span>}
          </div>

          
          <div className={inputWrapperClass}>
            <AiOutlineMessage className={iconClass} />
            <input type="text" placeholder="Subject" {...register("subject")} className={inputClass(errors.subject?.message)} />
            {errors.subject && <span className="text-rose-600 text-sm">{errors.subject.message}</span>}
          </div>

          <div className={inputWrapperClass}>
            <textarea rows={5} placeholder="Your Message" {...register("message")} className={inputClass(errors.message?.message)} />
            {errors.message && <span className="text-rose-600 text-sm">{errors.message.message}</span>}
          </div>

         
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white text-lg rounded-xl shadow-md transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      
      <div className="mt-8 text-center">
        <h6 className="text-pink-700 font-semibold mb-1">Contacts</h6>
        <p className="text-pink-600">info@cakeapp.com</p>
        <p className="text-pink-600">+254 011 227 3817</p>
        <p className="text-pink-600">Nyeri, Kenya</p>
      </div>
    </div>
  );
};

export default Contact;


import cakeImage from "../assets/images/ck1.jpg"; 
import { useSelector } from "react-redux"
import type { RootState } from "../app/store"

export const Hero = () => {
   const user = useSelector((state: RootState) => state.user.user)
    const name = user?.name
    
  return (
    <>
   
    <div className="flex flex-col md:flex-row items-center justify-between min-h-screen px-8 py-12 bg-gradient-to-br from-pink-50 to-yellow-50">
      
      <div className="max-w-lg space-y-6">
        <h1 className="text-5xl font-bold text-pink-700"  data-test= "cake-welcome-header">
          Welcome to <span className="text-yellow-600">CakeApp</span>
        </h1>
         {
                            name ? (
                                <span>Welcome {name} </span>
                            ) : <span> Welcome !</span>
                        }
        <p className="text-lg text-gray-700 leading-relaxed">
          Discover, order, and enjoy your favorite cakes with just a few clicks.
          From birthdays to weddings — Baker's House makes every celebration sweeter!
        </p>
        <button className="bg-pink-600 text-white px-6 py-3 rounded-2xl text-lg font-medium hover:bg-pink-700 transition-all">
          Get Started
        </button>
      </div>

      
      <div className="mt-10 md:mt-0 md:ml-12">
        <img src={cakeImage} alt="Delicious cake"className="rounded-3xl shadow-lg w-[500px] object-cover"
        />
      </div>
    </div>
    </>
  );
};

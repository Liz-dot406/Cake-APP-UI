import { useNavigate } from "react-router-dom";
import cake1 from "../../assets/images/choco.jpg";
import cake2 from "../../assets/images/vanillabliss.jpg";
import cake3 from "../../assets/images/ck2.jpg";
import cake4 from "../../assets/images/strawberry.jpg";

export const Cakes = () => {
  const navigate = useNavigate();

  const cakes = [
    { id: 1, name: "Chocolate Dream", price: "KSh 2,000", image: cake1 },
    { id: 2, name: "Vanilla Bliss", price: "KSh 1,800", image: cake2 },
    { id: 3, name: "Red Velvet Love", price: "KSh 2,200", image: cake3 },
    { id: 4, name: "Strawberry Delight", price: "KSh 1,900", image: cake4 },
  ];

  
  const handleAddToCart = (cake: any) => {
    

    navigate("/customer/dashboard/orders"); 
  };

  return (
    <section id="cakes" className="min-h-screen bg-pink-50 py-20 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-pink-800 mb-3">Our Signature Cakes</h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Baked fresh daily with love, our cakes are crafted to perfection for every occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cakes.map((cake) => (
            <div
              key={cake.id}
              className="card bg-white shadow-lg rounded-2xl hover:shadow-xl transition duration-300"
            >
              <figure className="px-4 pt-4">
                <img
                  src={cake.image}
                  alt={cake.name}
                  className="rounded-xl h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-pink-800">{cake.name}</h2>
                <p className="text-gray-600">{cake.price}</p>
                <div className="card-actions mt-3">
                  <button
                    onClick={() => handleAddToCart(cake)}
                    className="btn bg-pink-700 hover:bg-pink-800 text-white border-none rounded-full"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

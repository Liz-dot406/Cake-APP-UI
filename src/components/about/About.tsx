import cakeimage from "../../assets/images/cak1.png";

export const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 to-white px-6 py-12">

  
      <div className="flex flex-col md:flex-row items-center justify-center mb-16">
        <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
          <img
            src={cakeimage}
            alt="Delicious cake"
            className="rounded-2xl shadow-lg w-full max-w-md object-cover"
          />
        </div>

        <div className="md:w-1/2 md:pl-12 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-pink-700 mb-4" data-test= "cake-about-header">
            About <span className="text-yellow-600">Bakers House</span>
          </h1>
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to <span className="font-semibold">Bakers House</span> — your
            go-to destination for all things sweet and delightful! Our mission is
            to simplify how bakeries and cake lovers manage their orders,
            deliveries, and customer experiences.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            We believe every cake should bring joy — and managing them should be
            just as sweet. Whether you’re a home baker or a large shop, our tools
            help you bake happiness, one order at a time.
          </p>
          <p className="text-gray-600 italic">
            “Empowering bakers with digital simplicity and spreading smiles with
            every slice.”
          </p>
        </div>
      </div>

      
      <section className="bg-pink-100 rounded-2xl p-10 shadow-md">
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-10">
          What Our Happy Customers Say 
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
            <p className="text-gray-700 italic mb-4">
              “Bakers House made my daughter’s birthday so special! The cake was
              not only gorgeous but also delicious.”
            </p>
            <h4 className="font-semibold text-pink-700">— Sarah M.</h4>
          </div>

          
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
            <p className="text-gray-700 italic mb-4">
              “I’ve been ordering from them for months — top-notch service and
              smooth delivery every time!”
            </p>
            <h4 className="font-semibold text-pink-700">— Kevin O.</h4>
          </div>

          
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
            <p className="text-gray-700 italic mb-4">
              “Their cakes taste like happiness. I love how easy it is to place
              an order online!”
            </p>
            <h4 className="font-semibold text-pink-700">— Anita K.</h4>
          </div>
        </div>
      </section>
    </div>
  );
};

import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-orange-500 text-white">
      {/* Hero Section */}
      <section className="relative w-full">
        <img
          src="background pic for home.jpg"
          alt="Restaurant"
          className="w-full h-[600px] object-cover object-center"
        />
        {/* Overlay Text */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black/50 px-4">
          <p className="text-lg mb-1">Greetings, Welcome to</p>
          <h1 className="text-5xl font-bold text-white mb-3">Spice Hut</h1>
          <p className="max-w-2xl mb-6 text-gray-200">
            Experience the finest culinary journey with our premium dishes crafted from authentic recipes.
          </p>
          <div className="flex space-x-4">
            <Link
              to="/menu"
              className="bg-[#4b011d] hover:bg-[#6a0d2f] px-6 py-3 rounded-lg shadow-md text-white font-medium"
            >
              Order Now
            </Link>
            <Link
              to="/support"
              className="bg-[#4b011d] hover:bg-[#6a0d2f] px-6 py-3 rounded-lg shadow-md text-white font-medium"
            >
              Reserve Table
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
<section className="bg-muted/40 py-14">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-6">
    
    {/* Feature 1 */}
    <div className="flex flex-col items-center">
      <div className="bg-[#ff7043] text-white p-4 rounded-full mb-4 shadow-md">
        <span className="text-3xl">👨‍🍳</span>
      </div>
      <h3 className="text-xl font-bold">Expert Chefs</h3>
      <p className="text-gray-200 mt-2">
        Authentic recipes prepared by master chefs
      </p>
    </div>

    {/* Feature 2 */}
    <div className="flex flex-col items-center">
      <div className="bg-[#ff7043] text-white p-4 rounded-full mb-4 shadow-md">
        <span className="text-3xl">⏱</span>
      </div>
      <h3 className="text-xl font-bold">Fast Delivery</h3>
      <p className="text-gray-200 mt-2">
        Hot and fresh meals delivered in 30 minutes
      </p>
    </div>

    {/* Feature 3 */}
    <div className="flex flex-col items-center">
      <div className="bg-[#ff7043] text-white p-4 rounded-full mb-4 shadow-md">
        <span className="text-3xl">⭐</span>
      </div>
      <h3 className="text-xl font-bold">Premium Quality</h3>
      <p className="text-gray-200 mt-2">
        Only the finest ingredients in every dish
      </p>
    </div>

  </div>
</section>


      {/* Menu Categories */}
      <section className="bg-orange-400 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Menu Categories</h2>
        <div className="max-w-7xl mx-auto grid gap-8 px-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Signature Curries",
              desc: "Authentic flavors from traditional recipes",
              img: "Signature Curries.jpg",
            },
            {
              title: "Karahi Specialties",
              desc: "Sizzling hot dishes cooked to perfection",
              img: "Karahi Specialties.jpg",
            },
            {
              title: "Premium Biryani",
              desc: "Aromatic rice dishes with tender meat",
              img: "premium biryani.jpg",
            },
            {
              title: "Appetizers",
              desc: "Perfect starters for your meal",
              img: "Appetizers.jpg",
            },
            {
              title: "Sweet Delights",
              desc: "Traditional desserts to end your meal",
              img: "Sweet delights.jpg",
            },
            {
              title: "Beverages",
              desc: "Refreshing drinks and traditional lassi",
              img: "Beverages.jpg",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-black rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img
                src={item.img}
                alt={item.title}
                className="h-52 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300 mb-4">{item.desc}</p>
                <Link
                  to="/menu"
                  className="bg-[#4b011d] hover:bg-[#6a0d2f] text-white px-4 py-2 rounded-lg"
                >
                  Explore Menu
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#4b011d] text-white py-14 text-center">
        <h2 className="text-3xl font-bold mb-3">Ready to Order?</h2>
        <p className="mb-6 text-gray-200">
          Join thousands of satisfied customers who trust Spice Hut for their dining experience.
        </p>
        <div className="space-x-4">
          <Link
            to="/menu"
            className="bg-white text-[#4b011d] hover:bg-gray-200 px-6 py-3 rounded-lg font-semibold"
          >
            Start Ordering
          </Link>
          <Link
            to="/menu"
            className="bg-white text-[#4b011d] hover:bg-gray-200 px-6 py-3 rounded-lg font-semibold"
          >
            View Full Menu
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;

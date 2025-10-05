import { useState } from "react";
//import { Search, Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
 // Optional — if not made yet, remove this line.

export default function Menu() {
  const [search, setSearch] = useState("");

  // Sample dishes
  const menuItems = [
    {
      name: "Signature Curry",
      desc: "Authentic blend of spices and herbs",
      price: "$14.99",
      rating: 4.8,
      category: "Curry",
      image:
        "Signature Curries.jpg",
    },
    {
      name: "Chicken Karahi",
      desc: "Cooked fresh in wok with rich masala",
      price: "$13.50",
      rating: 4.6,
      category: "Karahi",
      image:
        "Karahi Specialties.jpg",
    },
    {
      name: "Biryani Deluxe",
      desc: "Long-grain rice with aromatic spices",
      price: "$12.00",
      rating: 4.9,
      category: "Biryani",
      image:
        "premium biryani.jpg",
    },
    {
      name: "Seekh Kebabs",
      desc: "Juicy grilled kebabs with smoky flavor",
      price: "$10.50",
      rating: 4.7,
      category: "Seekh Kababs",
      image:
        "seekh kabab.png",
    },
    {
      name: "Channay",
      desc: "Soft bread brushed with butter",
      price: "$3.99",
      rating: 4.5,
      category: "channay",
      image:
        "Channay.jpg",
    },
    {
      name: "Beverages",
      desc: "Refreshing yogurt-based mango drink",
      price: "$4.50",
      rating: 4.9,
      category: "Beverage",
      image:
        "Beverages.jpg",
    },
  ];

  const filteredMenu = menuItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-orange-500 text-white px-6 py-10">
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Our Menu</h1>
        <p className="text-gray-300">
          Explore the authentic flavors of <span className="text-orange-400 font-semibold">Spice Hut</span>
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto flex items-center bg-white rounded-full px-4 py-2 mb-10">
        <Search className="text-gray-600" />
        <input
          type="text"
          placeholder="Search your favorite dish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 ml-2 outline-none text-black"
        />
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto grid gap-12 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {filteredMenu.map((item, index) => (
          <Card key={index} className="w-100 bg-white text-black hover:scale-105 transition-all duration-300">
            <CardContent>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-xl"
              />
              <div className="mt-4 space-y-2">
                <Badge>{item.category}</Badge>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>

                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold text-[#4b011d]">{item.price}</span>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    <span>{item.rating}</span>
                  </div>
                </div>
                <Button className="w-full mt-3 bg-[#4b011d] hover:bg-[#6a012a]">
                  Order Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

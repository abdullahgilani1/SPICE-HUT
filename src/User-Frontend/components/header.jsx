import { Link } from "react-router-dom";
//import { User, ShoppingCart } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-6 lg:px-8 py-3 md:py-6">
        
        {/* LEFT: Logo */}
        <div className="flex-1">
          <div className="text-xl font-bold tracking-wide">Spice Hut</div>
        </div>

        {/* CENTER: Navigation */}
        <nav className="flex-1 hidden md:flex justify-center space-x-6 lg:space-x-8 text-base lg:text-lg font-medium">
          <Link to="/intro" className="hover:text-orange-500 transition">Intro</Link>
          <Link to="/" className="hover:text-orange-500 transition">Home</Link>
          <Link to="/menu" className="hover:text-orange-500 transition">Menu</Link>
          <Link to="/support" className="hover:text-orange-500 transition">Support</Link>
        </nav>

        {/* RIGHT: Profile + Cart */}
        <div className="flex-1 flex justify-end items-center space-x-4 sm:space-x-6">
          <Link to="/profile" className="hover:text-orange-500 transition">
            <User size={20} className="sm:w-[22px] sm:h-[22px]" />
          </Link>
          <Link to="/cart" className="hover:text-orange-500 transition">
            <ShoppingCart size={20} className="sm:w-[22px} sm:h-[22px]" />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden bg-black px-4 py-2 flex flex-wrap justify-center gap-4 text-sm sm:text-base font-medium">
        <Link to="/intro" className="hover:text-orange-500 transition">Intro</Link>
        <Link to="/" className="hover:text-orange-500 transition">Home</Link>
        <Link to="/menu" className="hover:text-orange-500 transition">Menu</Link>
        <Link to="/support" className="hover:text-orange-500 transition">Support</Link>
      </div>
    </header>
  );
}

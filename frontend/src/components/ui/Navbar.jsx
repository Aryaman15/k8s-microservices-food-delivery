import { ShoppingCart } from "lucide-react";

const Navbar = () => (
  <header className="bg-blue-600 text-white">
    <nav className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
      <h1 className="text-lg font-semibold flex items-center gap-2">
        <span className="text-xl">🍴</span> Devops DINE
      </h1>

      <ul className="hidden md:flex gap-8 text-sm">
        <li className="hover:underline cursor-pointer">Home</li>
        <li className="hover:underline cursor-pointer">Menu</li>
        <li className="hover:underline cursor-pointer">Contact</li>
      </ul>

      <button
        type="button"
        className="relative flex items-center gap-1 text-sm font-medium"
      >
        <ShoppingCart size={18} />
        Cart
        <span className="absolute -top-2 -right-3 bg-white text-blue-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          2
        </span>
      </button>
    </nav>
  </header>
);

export default Navbar;

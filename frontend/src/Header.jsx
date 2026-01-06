import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full h-16 bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        
        {/* Logo */}
        <div className="text-xl font-semibold tracking-wide">
          Narmada Valley International School
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link to="/" className="hover:text-yellow-400 transition">
            Home
          </Link>

          <Link to="/about" className="hover:text-yellow-400 transition">
            About
          </Link>

          <Link to="/erp" className="hover:text-yellow-400 transition">
            ERP
          </Link>

          <Link to="/contact" className="hover:text-yellow-400 transition">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;


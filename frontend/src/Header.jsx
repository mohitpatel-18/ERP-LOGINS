import React from "react";

const Header = () => {
  return (
    <header className="w-full h-16 bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        
        {/* Logo */}
        <div className="text-xl font-semibold tracking-wide">
         Narmada Valley Internation School
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#home" className="hover:text-yellow-400 transition">
            Home
          </a>
          <a href="#about" className="hover:text-yellow-400 transition">
            About
          </a>
          <a href="#erp" className="hover:text-yellow-400 transition">
            ERP
          </a>
          <a href="#admissions" className="hover:text-yellow-400 transition">
            Admissions
          </a>
          <a href="#contact" className="hover:text-yellow-400 transition">
            Contact
          </a>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>

      </div>
    </header>
  );
};

export default Header;

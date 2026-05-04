import { useState } from "react";
import { Link } from "react-router-dom";

import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Templates", path: "/templates" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-3">
              <img src="/logo.jpg" alt="Kotas Digital Invites Logo" className="h-16 w-auto rounded-full shadow-md object-cover" onError={(e) => e.target.style.display='none'} />
              <div className="relative group">
                <span className="absolute -inset-1 bg-gold-400/30 blur rounded-lg transition duration-500 group-hover:bg-gold-400/50"></span>
                <span className="relative font-['Great_Vibes'] text-3xl md:text-4xl font-bold bg-gradient-to-r from-maroon-800 via-maroon-600 to-gold-600 text-transparent bg-clip-text tracking-wide drop-shadow-sm">Kotas Digital Invites</span>
              </div>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-maroon-800 hover:text-gold-500 font-medium transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
            <div className="relative">
              <button
                onClick={() => setContactOpen(!contactOpen)}
                className="text-maroon-800 hover:text-gold-500 font-medium transition-colors duration-300 flex items-center focus:outline-none"
              >
                Contact
              </button>
              {contactOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 border border-cream-200 z-50 animate-in fade-in zoom-in duration-200">
                  <a href="tel:+917396756920" className="block px-4 py-2 text-sm text-maroon-800 hover:bg-cream-100 hover:text-gold-600 transition-colors" onClick={() => setContactOpen(false)}>Call Us</a>
                  <a href="https://wa.me/917396756920" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-maroon-800 hover:bg-cream-100 hover:text-gold-600 transition-colors" onClick={() => setContactOpen(false)}>WhatsApp</a>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-maroon-800 hover:text-gold-500 focus:outline-none"
            >
              {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass absolute top-20 left-0 w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-maroon-800 hover:bg-cream-200 rounded-md"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 pb-1 border-t border-cream-200">
              <button
                onClick={() => setContactOpen(!contactOpen)}
                className="w-full text-left px-3 py-2 text-base font-medium text-maroon-800 hover:bg-cream-200 rounded-md focus:outline-none"
              >
                Contact
              </button>
              {contactOpen && (
                <div className="pl-6 pr-3 py-2 space-y-2">
                  <a href="tel:+917396756920" className="block text-sm font-medium text-maroon-600 hover:text-gold-500" onClick={() => setIsOpen(false)}>Call Us</a>
                  <a href="https://wa.me/917396756920" target="_blank" rel="noopener noreferrer" className="block text-sm font-medium text-maroon-600 hover:text-gold-500" onClick={() => setIsOpen(false)}>WhatsApp</a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

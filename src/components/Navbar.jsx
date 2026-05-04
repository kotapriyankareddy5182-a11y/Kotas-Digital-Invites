import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiPhoneCall, FiMessageCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setContactOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const links = [
    { name: "Home", path: "/" },
    { name: "Templates", path: "/templates" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'glass py-2 shadow-lg' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center relative z-[110]">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-3 group">
              <div className="relative">
                <img src="/logo.jpg" alt="Logo" className="h-12 w-12 rounded-full shadow-md object-cover border-2 border-gold-400/50 group-hover:border-gold-400 transition-colors duration-300" onError={(e) => e.target.style.display='none'} />
              </div>
              <div className="relative">
                <span className={`font-['Great_Vibes'] text-2xl md:text-3xl font-bold tracking-wide drop-shadow-sm transition-all duration-300 ${scrolled || isOpen ? "bg-gradient-to-r from-maroon-800 via-maroon-600 to-gold-600 text-transparent bg-clip-text group-hover:brightness-125" : "text-cream-50 group-hover:text-gold-300"}`}>
                  Kotas Digital Invites
                </span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative font-medium transition-colors duration-300 group ${scrolled ? "text-maroon-900 hover:text-gold-600" : "text-cream-50 hover:text-gold-300"}`}
              >
                {link.name}
                <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            
            <div className="relative">
              <button
                onClick={() => setContactOpen(!contactOpen)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 border flex items-center gap-2 ${scrolled ? "bg-maroon-800 text-cream-50 hover:bg-maroon-700 border-gold-500/30" : "bg-cream-50/20 text-cream-50 backdrop-blur-md border-cream-50/30 hover:bg-cream-50/30"}`}
              >
                Contact
              </button>
              
              <AnimatePresence>
                {contactOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl py-3 border border-cream-200 z-[120]"
                  >
                    <a href="tel:+917396756920" className="flex items-center gap-3 px-5 py-3 text-sm text-maroon-800 hover:bg-cream-100 transition-colors" onClick={() => setContactOpen(false)}>
                      <FiPhoneCall className="text-gold-500" /> Call Us
                    </a>
                    <a href="https://wa.me/917396756920" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-5 py-3 text-sm text-maroon-800 hover:bg-cream-100 transition-colors" onClick={() => setContactOpen(false)}>
                      <FiMessageCircle className="text-gold-500" /> WhatsApp
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="flex items-center md:hidden z-[110]">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-full focus:outline-none transition-colors ${isOpen ? 'text-maroon-900 bg-cream-100' : scrolled ? 'text-maroon-900 bg-cream-100' : 'text-cream-50 bg-maroon-900/50 backdrop-blur-sm'}`}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-0 left-0 w-full h-[100dvh] bg-cream-50/98 backdrop-blur-xl z-[105] md:hidden flex flex-col justify-center items-center"
          >
            <div className="flex flex-col items-center space-y-8 w-full px-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.1) }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-serif font-bold text-maroon-900 hover:text-gold-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="w-24 h-1 bg-gold-500/50 my-6 rounded-full"
              />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col gap-4 w-full max-w-xs mt-4"
              >
                <a href="tel:+917396756920" className="flex items-center justify-center gap-3 px-6 py-4 bg-cream-100 rounded-full text-maroon-900 font-semibold hover:bg-cream-200 transition-colors border border-cream-200 shadow-md" onClick={() => setIsOpen(false)}>
                  <FiPhoneCall className="text-gold-600" /> Call Support
                </a>
                <a href="https://wa.me/917396756920" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-maroon-900 to-maroon-700 rounded-full text-cream-50 font-semibold hover:shadow-lg transition-all shadow-md shadow-maroon-900/20" onClick={() => setIsOpen(false)}>
                  <FiMessageCircle className="text-gold-400" /> Chat on WhatsApp
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

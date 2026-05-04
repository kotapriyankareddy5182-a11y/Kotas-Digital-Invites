import { FiInstagram } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-maroon-900 text-cream-50 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img src="/logo.jpg" alt="Kotas Digital Invites Logo" className="h-16 w-auto rounded-full shadow-lg object-cover" onError={(e) => e.target.style.display='none'} />
              <div className="relative">
                <span className="absolute -inset-1 bg-gold-500/20 blur rounded-lg"></span>
                <span className="relative font-['Great_Vibes'] text-3xl font-bold bg-gradient-to-r from-gold-400 to-cream-100 text-transparent bg-clip-text drop-shadow-sm">Kotas Digital Invites</span>
              </div>
            </div>
            <p className="text-cream-200">
              Kota's Digital Invites.<br/>
              Crafting premium digital experiences for your most cherished moments.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl font-semibold mb-4 text-gold-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gold-400 transition-colors">Home</a></li>
              <li><a href="/templates" className="hover:text-gold-400 transition-colors">Templates</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-xl font-semibold mb-4 text-gold-400">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-maroon-800 flex items-center justify-center hover:bg-gold-500 transition-colors">
                <FiInstagram size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-maroon-700 text-center text-sm text-cream-300">
          <p>&copy; {new Date().getFullYear()} Kota's Digital Invites. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

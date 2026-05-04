import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TemplateCard = ({ template, isDark }) => {
  const { id, title, category, imageUrl, price } = template;

  const handleBuyNow = (e) => {
    e.preventDefault();
    const message = encodeURIComponent(`Hello I am interested in this invitation template: ${title}`);
    window.open(`https://wa.me/7396756920?text=${message}`, '_blank');
  };

  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`relative backdrop-blur-md rounded-3xl overflow-hidden shadow-lg border transition-all duration-500 hover:shadow-2xl group ${isDark ? 'bg-maroon-900 border-maroon-800' : 'bg-cream-50 border-maroon-800'}`}
    >
      {isDark && <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>}
      {!isDark && <div className="absolute inset-0 bg-gradient-to-br from-maroon-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>}
      
      <div className="relative h-64 overflow-hidden rounded-t-3xl">
        <motion.img 
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          src={imageUrl || "https://placehold.co/600x400/f8ebd5/4d0000?text=Preview"} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 z-10">
          <span className={`px-4 py-1.5 backdrop-blur-md text-xs font-bold rounded-full uppercase tracking-widest shadow-sm ${isDark ? 'bg-cream-50/90 text-maroon-900' : 'bg-maroon-900/90 text-cream-50'}`}>
            {category}
          </span>
        </div>
        <div className="absolute inset-0 bg-maroon-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20 backdrop-blur-[2px]">
          <Link 
            to={`/preview/${id}`}
            className="px-8 py-3 bg-white text-maroon-800 font-bold rounded-full transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-xl hover:bg-cream-100 hover:scale-105"
          >
            Preview Design
          </Link>
        </div>
      </div>
      
      <div className={`p-6 relative z-10 ${isDark ? 'bg-maroon-900' : 'bg-cream-50'}`}>
        <h3 className={`font-serif text-2xl font-bold mb-2 transition-colors duration-300 ${isDark ? 'text-cream-50' : 'text-maroon-900'}`}>{title}</h3>
        <div className="flex items-center justify-between mt-6">
          <span className={`text-xl font-bold px-4 py-1.5 rounded-lg border ${isDark ? 'text-maroon-900 bg-cream-50 border-cream-200' : 'text-cream-50 bg-maroon-900 border-maroon-800'}`}>{price ? `₹${price}` : 'Premium'}</span>
          <button 
            onClick={handleBuyNow}
            className={`px-6 py-2.5 font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 transform active:scale-95 flex items-center gap-2 border ${isDark ? 'bg-cream-50 text-maroon-900 border-cream-200 hover:bg-cream-100' : 'bg-maroon-900 text-cream-50 border-maroon-800 hover:bg-maroon-800'}`}
          >
            <span>Buy Now</span>
            <span className="text-lg">✨</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TemplateCard;

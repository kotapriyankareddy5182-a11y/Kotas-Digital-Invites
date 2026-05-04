import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { FiUserCheck, FiImage, FiClock, FiMusic, FiMapPin, FiVideo } from "react-icons/fi";
import { db } from "../firebase";
import TemplateCard from "../components/TemplateCard";

const Home = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const q = query(collection(db, "templates"), limit(3));
        const querySnapshot = await getDocs(q);
        const templatesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTemplates(templatesData);
      } catch (error) {
        console.error("Error fetching templates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-maroon-900">
        {/* Background Golden Temple Theme */}
        <div 
          className="absolute inset-0 z-0 bg-maroon-900 overflow-hidden"
          style={{
            backgroundImage: 'url("/majestic-temple.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        >
          {/* Smooth Gradient Overlay: Shows the complete image at the top and blends into maroon at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-maroon-900 via-maroon-900/40 to-black/20"></div>
          
          {/* Subtle Golden Texture Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0iI2Q0YWYzNyIgZmlsbC1vcGFjaXR5PSIwLjE1Ii8+PC9zdmc+')] opacity-20 mix-blend-overlay"></div>
          
          {/* Floating Gold Particles (UI/UX Pro Max) */}
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-gold-400 rounded-full pointer-events-none"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: 'blur(1px)',
              }}
              animate={{
                y: [0, -100, -200],
                x: [0, Math.random() * 50 - 25, Math.random() * 50 - 25],
                opacity: [0, Math.random() * 0.8 + 0.2, 0],
                scale: [0, Math.random() + 0.5, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 10
              }}
            />
          ))}

          {/* Bottom fade out overlay to blend with the rest of the page */}
          <div className="absolute inset-0 bg-gradient-to-b from-maroon-900/10 via-transparent to-cream-50 pointer-events-none"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif font-bold text-cream-50 mb-6 leading-tight drop-shadow-2xl"
          >
            Where Your Story Becomes a <br/>
            <span className="text-gradient-gold relative inline-block">
              Beautiful Invitation
              <motion.span 
                className="absolute inset-0 bg-gold-400/40 blur-[30px] z-[-1] pointer-events-none"
                animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              ></motion.span>
            </span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-cream-200 mb-10 max-w-3xl mx-auto space-y-4"
          >
            <p className="font-semibold text-gold-300 drop-shadow-md">Celebrate your special moments with elegant, digital invites designed to impress.</p>
            <p className="drop-shadow-md">From the first glance to the final celebration, create invitations that truly reflect your journey together.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/templates" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-maroon-900 font-bold text-lg rounded-full shadow-lg hover:bg-gold-400 hover:shadow-xl transition-all transform hover:-translate-y-1 gap-2">
              <span>✨</span> View Collections
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Templates */}
      <section className="py-20 relative bg-cream-50 overflow-hidden">
        {/* Abstract Royal Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gold-400/5 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-maroon-800/5 to-transparent pointer-events-none"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-maroon-800 mb-4">Featured Collections</h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full"></div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[1, 2, 3].map((skeleton, idx) => (
                <div key={skeleton} className={`rounded-3xl h-[420px] animate-pulse shadow-xl border ${idx % 2 === 1 ? 'bg-maroon-800 border-gold-500/20' : 'bg-cream-50 border-cream-200'}`}></div>
              ))}
            </div>
          ) : templates.length > 0 ? (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.2 } },
                hidden: {}
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {templates.map((template, idx) => (
                <motion.div 
                  key={template.id}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                  }}
                  className="h-full"
                >
                  <TemplateCard template={template} isDark={idx % 2 === 1} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-10 text-gray-500 font-medium">
              No templates available right now. Check back later!
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/templates" className="inline-block border-2 border-maroon-800 text-maroon-800 px-8 py-3 rounded-full font-semibold hover:bg-maroon-800 hover:text-white transition-colors">
              View All Designs
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative bg-cream-50 overflow-hidden border-t border-cream-200">
         <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif font-bold text-maroon-900 mb-16"
            >
              Features That Make Your Invitation <span className="text-maroon-700">Unforgettable</span>
            </motion.h2>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
            >
               {[
                  { icon: <FiUserCheck />, title: "RSVP Tracking", desc: "Real-time attendance updates. Know exactly who's coming." },
                  { icon: <FiImage />, title: "Photo Gallery", desc: "Showcase up to 10 photos in a beautiful lightbox." },
                  { icon: <FiClock />, title: "Live Countdown", desc: "Real-time timer ticking down to your big day." },
                  { icon: <FiMusic />, title: "Background Music", desc: "Custom music that plays when guests open your invite." },
                  { icon: <FiMapPin />, title: "Venue Maps", desc: "One-tap Google Maps navigation for your guests." },
                  { icon: <FiVideo />, title: "Video & Livestream", desc: "Embed videos and livestream links for remote guests." },
               ].map((feature, idx) => {
                 const isDark = idx % 2 === 1;
                 return (
                   <motion.div 
                     key={idx} 
                     variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring" } } }} 
                     className={`p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-3xl border relative overflow-hidden group ${isDark ? 'bg-maroon-900 border-maroon-800 shadow-xl' : 'bg-cream-50 border-maroon-800 shadow-xl'}`}
                   >
                      <div className={`absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                      
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm text-2xl relative z-10 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ${isDark ? 'bg-cream-50 border border-cream-200 text-maroon-900' : 'bg-maroon-900 text-cream-50 border border-maroon-800'}`}>
                        {feature.icon}
                      </div>
                      
                      <h3 className={`font-bold text-2xl mb-3 relative z-10 transition-colors ${isDark ? 'text-cream-50' : 'text-maroon-900'}`}>{feature.title}</h3>
                      <p className={`leading-relaxed relative z-10 ${isDark ? 'text-cream-50/80' : 'text-maroon-900/80'}`}>{feature.desc}</p>
                   </motion.div>
                 );
               })}
            </motion.div>
         </div>
      </section>
    </div>
  );
};

export default Home;

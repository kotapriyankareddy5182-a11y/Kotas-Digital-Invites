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
        const q = query(collection(db, "templates"), limit(6));
        const querySnapshot = await getDocs(q);
        const templatesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log("DEBUG_TEMPLATES:", JSON.stringify(templatesData.map(t => t.title)));

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
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#FAF6F0] pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="hidden lg:block h-[1px] w-12 bg-maroon-800/30"></div>
                <span className="text-xs md:text-sm tracking-[0.25em] text-maroon-800/70 uppercase font-semibold">Digital Wedding Invites</span>
                <div className="hidden lg:block h-[1px] w-12 bg-transparent"></div> {/* Spacer for balance if needed */}
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-serif text-[#3A2D28] leading-[1.1] mb-6"
              >
                Where Your <br className="hidden sm:block" />
                Story Becomes a <br className="hidden sm:block" />
                <span className="italic text-[#682E36] font-normal">Beautiful</span> <br className="hidden sm:block" />
                <span className="italic text-[#682E36] font-normal">Invitation</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-[#6C5D55] text-base md:text-lg mb-10 max-w-lg leading-relaxed font-light"
              >
                Celebrate your special moments with elegant, digital invites designed to impress. From the first glance to the final celebration, create invitations that truly reflect your journey together.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link to="/templates" className="inline-flex items-center justify-center px-8 py-4 bg-[#3E1624] text-[#FAF6F0] font-medium text-sm tracking-wider rounded-full shadow-xl hover:bg-[#2A0E18] transition-all transform hover:-translate-y-1 group">
                  <span className="mr-2 text-gold-400">✨</span> VIEW COLLECTIONS 
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </motion.div>
            </div>

            {/* Right Image Content */}
            <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end px-4 sm:px-0">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative w-full max-w-sm lg:max-w-md mx-auto"
              >
                {/* Soft backdrop shape */}
                <div className="absolute inset-0 bg-[#EFE3D5] rounded-[3rem] -rotate-2 scale-105 z-0 transition-transform duration-700 hover:rotate-0"></div>
                
                {/* Main Image */}
                <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-[#FAF6F0] bg-[#FAF6F0]">
                  <img src="/hero-gopuram.png" alt="Majestic Temple Background" className="w-full h-auto max-h-[600px] object-contain transition-transform duration-700 hover:scale-105" />
                </div>

                {/* Floating Badge 1 - Top Left */}
                <motion.div 
                  initial={{ opacity: 0, y: -20, x: -20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                  className="absolute -top-4 -left-4 lg:-top-8 lg:-left-12 bg-[#FAF6F0] px-5 py-3 rounded-2xl shadow-xl z-20 border border-[#EADAC5] flex flex-col items-center backdrop-blur-sm bg-white/90"
                >
                  <span className="text-[#682E36] font-serif italic text-lg md:text-xl flex items-center gap-1.5">
                    <span className="text-[10px]">✦</span> Premium
                  </span>
                  <span className="text-xs text-[#6C5D55] font-medium">Crafted with love</span>
                </motion.div>

                {/* Floating Badge 2 - Bottom Right */}
                <motion.div 
                  initial={{ opacity: 0, y: 20, x: 20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: 1, type: "spring", stiffness: 100 }}
                  className="absolute -bottom-6 -right-2 lg:-bottom-8 lg:-right-8 bg-[#111] w-20 h-20 md:w-24 md:h-24 rounded-2xl md:rounded-[1.5rem] shadow-2xl z-20 flex items-center justify-center p-3 md:p-4 border-[3px] border-[#FAF6F0]"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute w-8 h-12 md:w-10 md:h-14 bg-gradient-to-br from-[#A87B4C] to-[#E5C77A] rounded-sm transform -rotate-12 shadow-md"></div>
                    <div className="absolute w-8 h-12 md:w-10 md:h-14 bg-gradient-to-br from-[#E5C77A] to-[#F9EAB8] rounded-sm transform rotate-12 shadow-md"></div>
                    <div className="absolute w-8 h-12 md:w-10 md:h-14 bg-gradient-to-br from-[#5C1A24] to-[#8C2A3A] rounded-sm transform z-10 shadow-lg border border-gold-400/40 flex items-center justify-center bg-opacity-90">
                       <span className="text-gold-400 text-xs md:text-sm drop-shadow-md">✨</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

          </div>
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

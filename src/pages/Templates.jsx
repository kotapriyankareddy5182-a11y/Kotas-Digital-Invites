import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import TemplateCard from "../components/TemplateCard";
import { motion } from "framer-motion";

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Wedding", "Engagement", "Save the Date", "Birthday", "Any Function"];

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "templates"));
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

  const filteredTemplates = filter === "All" 
    ? templates 
    : templates.filter(t => t.category === filter);

  return (
    <div className="pt-8 pb-20 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-maroon-800 mb-4">Our Classic Collection</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the perfect design for your special day. Each template is crafted with love and elegance.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === cat 
                  ? "bg-maroon-800 text-white shadow-md" 
                  : "bg-white text-maroon-800 border border-maroon-200 hover:bg-cream-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map((skeleton) => (
              <div key={skeleton} className="bg-white rounded-2xl h-96 animate-pulse"></div>
            ))}
          </div>
        ) : filteredTemplates.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {filteredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-serif text-gray-500">No templates found in this category.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;

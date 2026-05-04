import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FiArrowLeft, FiCheck } from "react-icons/fi";

const getEmbedUrl = (url) => {
  if (!url) return null;
  if (url.includes('youtube.com/watch?v=')) {
    return url.replace('youtube.com/watch?v=', 'youtube.com/embed/').split('&')[0];
  }
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return url;
};

const Preview = () => {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const docRef = doc(db, "templates", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setTemplate({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching template:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-cream-50">Loading...</div>;
  }

  if (!template) {
    return <div className="min-h-screen flex items-center justify-center bg-cream-50">Template not found.</div>;
  }

  const handleBuyNow = () => {
    const message = encodeURIComponent(`Hello I am interested in this invitation template: ${template.title}`);
    window.open(`https://wa.me/7396756920?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-cream-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/templates" className="inline-flex items-center text-maroon-800 hover:text-gold-600 mb-6 font-medium">
          <FiArrowLeft className="mr-2" /> Back to Templates
        </Link>
        
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-cream-200">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Media Section */}
            <div className="bg-maroon-900 h-[600px] flex items-center justify-center overflow-hidden relative">
              {template.externalLink ? (
                <iframe 
                  src={template.externalLink} 
                  title={template.title}
                  className="w-full h-full border-0"
                  allowFullScreen
                />
              ) : template.videoLink ? (
                <iframe 
                  src={getEmbedUrl(template.videoLink)} 
                  title={template.title}
                  className="w-full h-full border-0"
                  allowFullScreen
                />
              ) : template.imageUrl ? (
                <img 
                  src={template.imageUrl} 
                  alt={template.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-white">No Preview Available</div>
              )}
            </div>
            
            {/* Details Section */}
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <span className="inline-block px-4 py-1 bg-cream-100 text-maroon-800 font-semibold rounded-full uppercase tracking-wider text-sm mb-4 w-fit">
                {template.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-maroon-800 mb-6">
                {template.title}
              </h1>
              
              <div className="text-2xl font-bold text-gold-600 mb-8">
                {template.price ? `₹${template.price}` : 'Premium'}
              </div>
              
              <div className="mb-8">
                <h3 className="font-serif font-bold text-xl text-maroon-800 mb-4">Features Included</h3>
                <ul className="space-y-3">
                  {(template.features && template.features.length > 0 
                    ? template.features 
                    : ['Fully customizable text & colors', 'High quality rendering', 'Mobile responsive design', 'Background music integration']
                  ).map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <FiCheck className="text-gold-500 mr-3" size={20} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <button 
                  onClick={handleBuyNow}
                  className="w-full py-4 bg-maroon-800 text-white text-lg font-bold rounded-xl hover:bg-gold-500 transition-colors shadow-lg transform hover:-translate-y-1"
                >
                  Buy Now via WhatsApp
                </button>
                <p className="text-center text-sm text-gray-500 mt-4">
                  You will be redirected to WhatsApp to complete your purchase and provide customization details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;

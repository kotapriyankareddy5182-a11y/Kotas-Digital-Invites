import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { FiLogOut, FiPlus, FiTrash2 } from "react-icons/fi";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Wedding");
  const [price, setPrice] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [features, setFeatures] = useState("");
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchTemplates();
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

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

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleAddTemplate = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload an image for the template.");
      return;
    }
    
    setIsUploading(true);

    try {
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `templates/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload error:", error);
          alert("Image upload failed");
          setIsUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          // Add details to Firestore
          await addDoc(collection(db, "templates"), {
            title,
            category,
            price,
            externalLink,
            videoLink,
            features: features.split(',').map(f => f.trim()).filter(Boolean),
            imageUrl: downloadURL,
            createdAt: new Date()
          });

          // Reset form
          setTitle("");
          setCategory("Wedding");
          setPrice("");
          setExternalLink("");
          setVideoLink("");
          setFeatures("");
          setFile(null);
          setUploadProgress(0);
          fetchTemplates();
          alert("Template added successfully!");
          setIsUploading(false);
        }
      );
    } catch (error) {
      console.error("Error adding template:", error);
      alert("Failed to add template");
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this template?")) {
      try {
        await deleteDoc(doc(db, "templates", id));
        fetchTemplates();
      } catch (error) {
        console.error("Error deleting template:", error);
      }
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-cream-50">Loading Admin Dashboard...</div>;

  return (
    <div className="min-h-screen bg-cream-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-maroon-800">Admin Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="flex items-center text-maroon-800 hover:text-red-600 transition-colors font-medium"
          >
            <FiLogOut className="mr-2" /> Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Template Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-cream-200">
              <h2 className="text-xl font-bold text-maroon-800 mb-6 flex items-center">
                <FiPlus className="mr-2" /> Add New Template
              </h2>
              <form onSubmit={handleAddTemplate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Template Title</label>
                  <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500">
                    <option value="Wedding">Wedding</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Save the Date">Save the Date</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Any Function">Any Function</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Website Link (Optional)</label>
                  <input type="url" placeholder="https://your-invitation-site.com" value={externalLink} onChange={(e) => setExternalLink(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Demo Video Link (Optional)</label>
                  <input type="url" placeholder="https://youtube.com/watch?v=..." value={videoLink} onChange={(e) => setVideoLink(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Features (Comma separated)</label>
                  <input type="text" placeholder="Background Music, RSVP Form, Maps..." value={features} onChange={(e) => setFeatures(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Preview Image</label>
                  <input type="file" required accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cream-100 file:text-maroon-800 hover:file:bg-cream-200" />
                </div>
                
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-gold-500 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                )}

                <button type="submit" disabled={isUploading} className={`w-full text-white py-2 px-4 rounded-md transition-colors font-medium mt-4 ${isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-maroon-800 hover:bg-gold-500'}`}>
                  {isUploading ? 'Uploading...' : 'Upload Template'}
                </button>
              </form>
            </div>
          </div>

          {/* Templates List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-cream-200">
              <h2 className="text-xl font-bold text-maroon-800 mb-6">Manage Templates</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-cream-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {templates.map((template) => (
                      <tr key={template.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img src={template.imageUrl} alt={template.title} className="h-12 w-12 object-cover rounded-md" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{template.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{template.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => handleDelete(template.id)} className="text-red-600 hover:text-red-900">
                            <FiTrash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {templates.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No templates available. Add one to get started.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

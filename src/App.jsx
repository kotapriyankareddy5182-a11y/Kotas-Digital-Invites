import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Templates from "./pages/Templates";
import Preview from "./pages/Preview";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/preview/:id" element={<Preview />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;

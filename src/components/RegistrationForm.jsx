import { useState } from "react";
import { db } from "../firebaseConfig"; // Import Firestore database
import { collection, addDoc } from "firebase/firestore";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X } from "lucide-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !school) {
      setMessage("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "eventRegistrations"), {
        email,
        school,
        timestamp: new Date(),
      });
      setMessage("Úspešne registrovaný");
      setEmail("");
      setSchool("");
    } catch (error) {
      console.error("Error adding document: ", error);
      setMessage("Error during registration!");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen  text-gray-900">
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center z-50">
        <img
          src="/erbbiely.jpg"
          alt="PSK Logo"
          className="h-16 cursor-pointer"
        />
        <button
          className="md:hidden text-gray-900"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent md:flex ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <ScrollLink
            onClick={() => setMenuOpen(false)}
            to="home-section"
            smooth={true}
            duration={800}
            className="block md:inline-block p-4 md:p-1 text-gray-900 font-bold cursor-pointer hover:text-blue-500"
          >
            Domov
          </ScrollLink>
          <ScrollLink
            onClick={() => setMenuOpen(false)}
            to="program-section"
            smooth={true}
            duration={800}
            className="block md:inline-block p-4 md:p-1 text-gray-900 font-bold cursor-pointer hover:text-blue-500"
          >
            Program
          </ScrollLink>
          <ScrollLink
            onClick={() => setMenuOpen(false)}
            to="qr-section"
            smooth={true}
            duration={800}
            className="block md:inline-block p-4 md:p-1 text-gray-900 font-bold cursor-pointer hover:text-blue-500"
          >
            QR
          </ScrollLink>
        </div>
      </nav>
      <section
        id="home-section"
        className="flex flex-col items-center justify-center min-h-screen p-6"
      >
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
            Deň PSK registrácia
          </h2>

          {message && (
            <p className="text-center text-red-500 mb-3">{message}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                className="w-full p-2 border rounded-md"
                placeholder="napíšte email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Názov školy:</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="napíšte názov školy"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Registrácia..." : "Registrujte sa"}
            </button>
          </form>
        </div>
      </section>
      {/* Program Section */}
      <section
        id="program-section"
        className="min-h-screen flex flex-col items-center justify-center p-6 bg-white"
      >
        <h2 className="text-3xl font-bold text-blue-600">Program</h2>
      </section>
      <section
        id="qr-section"
        className="min-h-screen flex flex-col items-center justify-center p-6 bg-white"
      >
        <h2 className="text-3xl font-bold text-blue-600">5.5.2025</h2>
        <p className="mt-4 text-center text-gray-700 max-w-2xl"></p>
      </section>
    </div>
  );
};

export default RegistrationForm;

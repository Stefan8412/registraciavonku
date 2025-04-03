import { useState } from "react";
import { db } from "../firebaseConfig"; // Import Firestore database
import { collection, addDoc } from "firebase/firestore";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X } from "lucide-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { QRCodeCanvas } from "qrcode.react";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [mobile, setMobile] = useState("");
  const [numberchild, setNumberchild] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [message, setMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
  ];

  const votingPageURL = "https://registraciavonku.psk.sk"; // Change to your actual voting page URL
  const [qrValue, setQrValue] = useState(votingPageURL);

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
        mobile,
        numberchild,
        selectedTime, // Store selected time in Firestore
        checked,
        timestamp: new Date(),
      });
      setMessage("Úspešne registrovaný");
      setEmail("");
      setSchool("");
      setNumberchild("");
      setSelectedTime(""); // Reset time selection
      setChecked(false);
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
        className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-blue-300 to-blue-500"
      >
        <div className="max-w-2xl w-full mx-auto p-8 rounded-lg shadow-md bg-white">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-2">
            Vonku - Deň PSK
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
              <label className="block text-gray-700">Mobil:</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="mobilné čislo"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
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

            <div>
              <label className="block text-gray-700">Počet detí:</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                placeholder="napíšte počet detí"
                value={numberchild}
                onChange={(e) => setNumberchild(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Čas príchodu:</label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
              >
                <option value="" disabled>
                  -- Vyberte čas --
                </option>
                {timeSlots.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700">
                Detské atrakcie 3eur/os:{" "}
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
                <div
                  className={`w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 transition duration-300 ease-in-out ${
                    checked ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ease-in-out ${
                      checked ? "translate-x-4" : "translate-x-0"
                    }`}
                  ></div>
                </div>
                <span className="text-gray-700 font-medium">
                  {checked ? "Áno" : "Nie"}
                </span>
              </label>
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
        {/* Event Cover Image */}
        <img
          src="/program.png" // Update with your actual image path
          alt="Event Cover"
          className="w-full max-w-4xl h-auto object-cover mt-10 rounded-lg shadow-lg
               sm:max-w-3xl md:max-w-2xl lg:max-w-full"
        />
      </section>
      <section
        id="qr-section"
        className="min-h-screen flex flex-col items-center justify-center p-6 bg-white"
      >
        <div className="flex flex-col items-center p-4">
          {/* <h2 className="text-xl font-bold">Deň PSK QR Code </h2> */}
          <QRCodeCanvas value={qrValue} size={200} />
          <p className="mt-2 text-sm text-gray-600">Skenuj mobilom</p>
        </div>
      </section>
    </div>
  );
};

export default RegistrationForm;

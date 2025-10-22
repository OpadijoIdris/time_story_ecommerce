import { useState } from 'react';
import { registerUser } from '../../api.js';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSortDown } from 'react-icons/fa';
// import bg from '../images/bg.jpg'

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const registered = await registerUser({name, email, password, phoneNumber});
      ("successfully registered", registered);
      navigate("/login")

    }catch(error){
      (error.message);
      setError("could not register, please try again")
    }
  }
  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <a href="/" className="absolute top-6 left-6 flex items-center text-gray-700 hover:text-gray-900 transition">
        <FaArrowLeft className="mr-2" />
        Back
      </a>

      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg flex overflow-hidden transition-all duration-500">
        
        {/* Sign In Section */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-black mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4"
          >

             <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />

             <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember Me
              </label>
              <a href="#" className="text-gray-600 hover:underline">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-500 transition duration-700"
            >
              Sign Up 
            </button>
            {error && <p className='text-red-600'>could not register you</p>}
          </form>
        </div>

        {/* Sign Up Section */}
        <div className="w-1/2 bg-gray-700 hover:bg-gray-800 transition duration-500 text-white p-10 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mb-4">Hello, Welcome To Timestory!</h2>
          <p className="mb-6 text-center">Join WasteWise and help build cleaner, smarter communities</p>
          <a href="/login">
            <button
            className="bg-white text-gray-700 px-6 py-2 rounded-md hover:bg-gray-500 hover:text-white transition duration-700 shadow-lg shadow-gray-400">
              SIGN IN
            </button>
          </a>
        </div>
      </div>
      {/* <Toaster position='top-center' /> */}
    </div>
  );
}

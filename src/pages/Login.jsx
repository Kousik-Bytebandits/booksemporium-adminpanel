import { useNavigate } from 'react-router-dom';
import { FaLock, FaUser } from 'react-icons/fa';
import { useState } from 'react';
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const validEmail = "emporium-admin";
    const validPassword = "Books@1234";

    if (email === validEmail && password === validPassword) {
      sessionStorage.setItem("isLoggedIn", "true");
      onLogin(); 

      toast.success("Login successful!");
      setTimeout(() => navigate('/'), 1000); 
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-desktopbg">
      <ToastContainer position="top-center" autoClose={1500} />

      {/* Desktop only UI */}
      <div className="hidden lg:flex w-[75%] h-[85%] p-6 bg-white rounded-2xl shadow-2xl font-archivo">
        {/* Left */}
        <div className="w-1/2 relative">
          <img
            src="images/signin-bg.png"
            alt="Side background"
            className="absolute rounded-xl inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right */}
        <div className="w-1/2 text-center flex flex-col justify-start">
          <div className="flex items-center justify-start mb-10 px-10">
            <img src="images/be-logo.png" className="w-[45px] mr-3" />
            <div className="flex flex-col text-left uppercase text-[#3A261A] font-opensans font-bold text-[20px] leading-[18px]">
              <p>books</p>
              <p>emporium</p>
            </div>
          </div>
          <h2 className="text-[36px] xxxl:mt-[18%] mt-15 text-[#2B452C] font-semibold">Welcome Back!</h2>
          <p className="text-[14px] mb-10 font-opensans">Login to your account</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="space-y-5 xxxl:px-36 px-24"
          >
            <div className="flex items-center bg-inputBox px-4 py-3 rounded-lg">
              <FaUser className="mr-3 text-[#624534]" />
              <input
                type="text"
                placeholder="Email Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-inputBox w-full outline-none placeholder-[#624534]"
                required
              />
            </div>

            <div className="relative">
              <div className="flex items-center bg-inputBox px-4 py-3 rounded-lg">
                <FaLock className="mr-3 text-[#624534]" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-inputBox w-full outline-none placeholder-[#624534] pr-10"
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-[#624534]"
              >
                {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <IoEyeSharp className="w-5 h-5" />}
              </button>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-loginBtn text-[18px] text-white rounded-full py-2"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

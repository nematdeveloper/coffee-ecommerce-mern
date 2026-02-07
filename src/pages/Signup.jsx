import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Logo from "../assets/features/mobile.png";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from 'react-i18next';
import { FaArrowLeft } from 'react-icons/fa';

const Signup = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(
        "https://rayanbackend-1.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data = await res.json();
      login(data.token, data.user);

      if (!res.ok) {
        swal(t("signup.error"), data.error || t("signup.somethingWentWrong"), "error");
      } else {
        swal(t("signup.success"), data.message || t("signup.accountCreatedSuccess"), "success").then(() => {
          navigate("/");
        });

        setUsername("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      swal(t("signup.error"), t("signup.networkError"), "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

            <button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 p-3 bg-white rounded-full shadow-lg hover:shadow-xl border border-gray-200 hover:border-gray-300 transition-all"
      >
        <FaArrowLeft size={20} />
      </button>
      {/* Left Section - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 xl:p-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row  sm:items-center gap-8 sm:gap-6 mb-4">
              <img 
                src={Logo} 
                alt={t("signup.rayanSaffronLogo")} 
                className=" h-30  w-30  w-auto  sm:mx-0"
              />
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl md:text-[33px] font-semibold">{t("signup.signUp")}</h1>
                <p className="text-sm text-text-second mt-1 max-w-md">
                  {t("signup.enterInfoToRegister")}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <FaUser className="text-gray-500" /> {t("signup.username")}
              </label>
              <input
                type="text"
                placeholder={t("signup.enterYourUsername")}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-11 sm:h-12 rounded-md bg-[#F7F7F7] px-4 outline-none focus:ring-2 focus:ring-black border border-transparent focus:border-black transition"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <FaEnvelope className="text-gray-500" /> {t("signup.email")}
              </label>
              <input
                type="email"
                placeholder={t("signup.enterYourEmail")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 sm:h-12 rounded-md bg-[#F7F7F7] px-4 outline-none focus:ring-2 focus:ring-black border border-transparent focus:border-black transition"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <FaLock className="text-gray-500" /> {t("signup.password")}
              </label>
              <input
                type="password"
                placeholder={t("signup.enterYourPassword")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 sm:h-12 rounded-md bg-[#F7F7F7] px-4 outline-none focus:ring-2 focus:ring-black border border-transparent focus:border-black transition"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <button
              type="submit"
              className="w-full h-11 sm:h-12 rounded-md bg-primary text-white font-medium hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              disabled={loading}
            >
              {loading ? t("signup.creatingAccount") : t("signup.createAccount")}
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-sm text-center text-gray-600 mt-6 sm:mt-8">
            {t("signup.alreadyHaveAccount")}{" "}
            <Link to="/login" className="text-black font-medium underline hover:text-primary transition">
              {t("signup.logIn")}
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section - Info */}
      <div className="bg-gradient-to-r from-[#4E2C6E] to-[#A37DA4] text-white p-6 sm:p-8 lg:p-12 flex items-center justify-center lg:w-96 xl:w-[30%]">
        <div className="max-w-sm w-full">
          <h2 className="text-3xl sm:text-4xl md:text-[48px] font-bold leading-tight mb-4 sm:mb-6">
            {t("signup.rayanSaffron")}
          </h2>

          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <p className="text-sm sm:text-base opacity-90">
              {t("signup.trustedLeader")}
            </p>
            <p className="text-sm sm:text-base opacity-90">
              {t("signup.bestPlatform")}
            </p>
          </div>

          <div className="bg-[#FFFFFF1A] rounded-2xl sm:rounded-[34px] p-6 sm:p-8 flex flex-col items-center justify-center text-center">
            <p className="text-2xl sm:text-3xl font-bold mb-2">{t("signup.oneHundredPlus")}</p>
            <p className="text-sm sm:text-base opacity-90">{t("signup.successfulCooperation")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
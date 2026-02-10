import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Logo from "../assets/features/mobile.png";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from 'react-i18next';
import { FaArrowLeft } from 'react-icons/fa';
const Login = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const { login } = useAuth();

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
        "https://rayanbackend-1.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        swal(t("login.error"), data.error || t("login.somethingWentWrong"), "error");
        setError(data.error || t("login.somethingWentWrong"));
      } else {
        login(data.token, data.user);
        swal(t("login.success"), data.message || t("login.accountCreatedSuccess"), "success").then(() => {
          navigate("/");
        });

        setEmail("");
        setPassword("");
        setSuccess(t("login.accountCreatedSuccess"));
      }
    } catch (err) {
      swal(t("login.error"), t("login.networkError"), "error");
      setError(t("login.networkError"));
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
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-4">
              <img
                src={Logo}
                alt={t("login.rayanSaffronLogo")}
                className=" h-30  w-30  w-auto  sm:mx-0"
              />
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl md:text-[33px] font-semibold">{t("login.signUp")}</h1>
                <p className="text-sm text-text-second mt-1 max-w-md">
                  {t("login.enterEmailPassword")}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <FaEnvelope className="text-gray-500" /> {t("login.email")}
              </label>
              <input
                type="email"
                placeholder={t("login.enterYourEmail")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 sm:h-12 rounded-md bg-[#F7F7F7] px-4 outline-none focus:ring-2 focus:ring-black border border-transparent focus:border-black transition"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <FaLock className="text-gray-500" /> {t("login.password")}
              </label>
              <input
                type="password"
                placeholder={t("login.enterYourPassword")}
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
              className="w-full h-11 sm:h-12 rounded-md bg-primary text-white font-medium hover:bg-primary/90 transition mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? t("login.creatingAccount") : t("login.createAccount")}
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-sm text-center text-gray-600 mt-6 sm:mt-8">
            {t("login.alreadyHaveAccount")}{" "}
            <Link
              to="/signup"
              className="text-black font-medium underline hover:text-primary transition"
            >
              {t("login.logIn")}
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section - Info */}
      <div className="bg-gradient-to-r from-[#4E2C6E] to-[#A37DA4] text-white p-6 sm:p-8 lg:p-12 flex items-center justify-center lg:w-96 xl:w-[30%]">
        <div className="max-w-sm w-full">
          <h2 className="text-3xl sm:text-4xl md:text-[48px] font-bold leading-tight mb-4 sm:mb-6">
            {t("login.rayanSaffron")}
          </h2>

          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <p className="text-sm sm:text-base opacity-90">
              {t("login.trustedLeader")}
            </p>
            <p className="text-sm sm:text-base opacity-90">
              {t("login.bestPlatform")}
            </p>
          </div>

          <div className="bg-[#FFFFFF1A] rounded-2xl sm:rounded-[34px] p-6 sm:p-8 flex flex-col items-center justify-center text-center">
            <p className="text-2xl sm:text-3xl font-bold mb-2">{t("login.oneHundredPlus")}</p>
            <p className="text-sm sm:text-base opacity-90">{t("login.successfulCooperation")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
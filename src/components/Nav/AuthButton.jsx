import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown, FiLogOut } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import LangSelector from "../../Home/LangSelector";
import Swal from "sweetalert2";

const AuthButtons = () => {
  const { t, i18n } = useTranslation("common"); // use "common" namespace for nav/auth
  const { isAuthenticated, user, logout, isAdmin } = useAuth();

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const isRTL = i18n.dir() === "rtl";
  const userInitial = user?.username?.charAt(0)?.toUpperCase();

  const handleLogout = () => {
    Swal.fire({
      title: t("auth.logoutConfirmTitle"),
      text: t("auth.logoutConfirmText"),
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("auth.yes"),
      cancelButtonText: t("auth.cancel"),
      reverseButtons: true,
      customClass: {
        popup: "rounded-xl shadow-xl",
        confirmButton: "px-6 py-2 rounded-lg",
        cancelButton: "px-6 py-2 rounded-lg",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          title: t("auth.logoutSuccessTitle"),
          text: t("auth.logoutSuccessText"),
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            popup: "rounded-xl shadow-xl",
          },
        });
      }
      setOpen(false);
    });
  };

  useEffect(() => {
    if (!open) return;

    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative flex items-center gap-4">
      <LangSelector />

      {isAuthenticated ? (
        <>
          <button
            onClick={() => setOpen((p) => !p)}
            className="flex items-center gap-2 focus:outline-none hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black font-bold text-lg shadow-md">
              {userInitial}
            </div>

            <FiChevronDown
              size={18}
              className={`transition-transform duration-300 text-white ${
                open ? "rotate-180" : ""
              } ${isRTL ? "scale-x-[-1]" : ""}`}
            />
          </button>

          {open && (
            <div
              className={`absolute top-full mt-2 w-56 rounded-xl bg-white shadow-xl border border-gray-100 z-50 overflow-hidden animate-fadeIn ${
                isRTL ? "left-0" : "right-0"
              }`}
            >
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <p className="font-semibold text-gray-800">{user?.username}</p>
              </div>

              <div className="py-1">
                {isAdmin() && (
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FiLogOut className="text-blue-500" size={18} />
                    <span className="font-medium text-blue-600">
                      {t("auth.admin")}
                    </span>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
                >
                  <FiLogOut className="text-red-500" size={18} />
                  <span className="font-medium">{t("auth.logout")}</span>
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <Link
          to="/signup"
          className="h-11 px-6 flex items-center justify-center bg-primary rounded-lg text-white font-medium shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
        >
          {t("auth.loginSignup")}
        </Link>
      )}
    </div>
  );
};

export default AuthButtons;

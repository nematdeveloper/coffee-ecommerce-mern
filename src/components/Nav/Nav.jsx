import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineShoppingBag } from "react-icons/md";
import Logo from "../../assets/features/Logo.png";
import AuthButtons from "./AuthButton";

const DesktopNav = ({ 
  textColor = "text-white",          // Default text color
  hoverColor = "hover:text-amber-300", // Default hover color
  activeColor = "text-amber-300",     // Default active color
  activeBg = "bg-amber-300",         // Default active underline
  bagIconColor = "text-white"        // Shopping bag color
}) => {
  const { t, i18n } = useTranslation("common");
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { to: "/", label: t("nav.home") },
    { to: "/products", label: t("nav.products") },
    { to: "/about", label: t("nav.about") },
    { 
      key: "certificates",
      label: t("nav.certificates"),
      subItems: [
        { to: "/certificates", label: t("nav.certificates") },
        { to: "/download-data", label: t("nav.downloadData") },
      ]
    },
    { to: "/blog", label: t("nav.blog") },
    { 
      key: "contact",
      label: t("nav.contact"),
      subItems: [
        { to: "/contact", label: t("nav.contact") },
        { to: "/faq", label: t("nav.faq") },
      ]
    },
  ];

  return (
  // Change this line in DesktopNav
<header className="hidden xl:flex w-[80vw] mx-auto mt-10 items-center justify-between" dir={i18n.dir()}>
      {/* Logo with optional filter */}
      <img src={Logo} alt="logo" className={`w-50 h-50`} />

      {/* Navigation Menu */}
      <ul className="flex items-center  gap-8">
        {menuItems.map((item) => {
          if (item.subItems) {
            const isDropdownActive = item.subItems.some(sub => isActive(sub.to));

            return (
              <li key={item.key} className="group relative">
                <span
                  className={`
                    relative cursor-pointer ${textColor} ${hoverColor} transition-colors
                    ${isDropdownActive ? `${activeColor} font-medium` : ""}
                  `}
                >
                  {item.label}
                  {isDropdownActive && (
                    <span className={`absolute -bottom-1 left-0 w-full h-0.5 ${activeBg}`}></span>
                  )}
                </span>

                {/* Dropdown menu */}
                <div className="absolute top-full mt-2 w-40 bg-white shadow-lg rounded-lg py-2 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.to}
                      to={subItem.to}
                      className={`
                        block px-4 py-2 hover:bg-gray-100 transition-colors
                        ${isActive(subItem.to) ? "text-amber-500 bg-gray-50" : "text-gray-800"}
                      `}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              </li>
            );
          }

          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`
                  relative ${textColor} ${hoverColor} transition-colors
                  ${isActive(item.to) ? `${activeColor} font-medium` : ""}
                `}
              >
                {item.label}
                {isActive(item.to) && (
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 ${activeBg}`}></span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Icons and Auth */}
      <div className="flex items-center gap-4">
        <Link to="/shopping">
          <MdOutlineShoppingBag
            className={`text-2xl ${bagIconColor} ${hoverColor.replace('hover:', 'hover:')} transition-colors ${isActive("/shopping") ? activeColor : ""}`}
          />
        </Link>
        {/* Pass colors to AuthButtons */}
        <AuthButtons textColor={textColor} hoverColor={hoverColor.replace('hover:', '')} />
      </div>
    </header>
  );
};

export default DesktopNav;
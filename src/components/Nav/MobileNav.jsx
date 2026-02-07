// MobileNav.jsx - Production ready (Fixed scroll issue)
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { MdOutlineShoppingBag } from "react-icons/md";
import Logo from "../../assets/features/mobile.png";
import AuthButtons from "./MobileAuthButtons";
import LangSelector from "../../Home/LangSelector";
const MobileNav = () => {
  const { t, i18n } = useTranslation("common");
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const scrollYRef = useRef(0);

  // Improved scroll lock without position: fixed
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      scrollYRef.current = window.scrollY;
      
      // Lock body scroll but maintain position
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll';
      document.body.style.paddingRight = '0px';
    } else {
      // Restore scroll position
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      
      // Restore scroll position
      window.scrollTo(0, scrollYRef.current);
    }
    
    return () => {
      // Cleanup on unmount
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  // Close sidebar on route change
  useEffect(() => {
    closeSidebar();
  }, [location]);

  const closeSidebar = () => {
    setIsOpen(false);
    setOpenDropdown(null);
  };

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
      ],
    },
    { to: "/blog", label: t("nav.blog") },
    {
      key: "contact",
      label: t("nav.contact"),
      subItems: [
        { to: "/contact", label: t("nav.contact") },
        { to: "/faq", label: t("nav.faq") },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="xl:hidden fixed top-0 left-0 right-0 bg-white shadow-lg z-[9999] px-4 py-3">
        <div className="flex items-center justify-between">
          <img src={Logo} alt="Company Logo" className="w-16 h-auto" />
          <div className="flex items-center gap-4">
            <Link to="/shopping" className="p-2">
              <MdOutlineShoppingBag className="text-xl text-gray-700" />
            </Link>
            <LangSelector/>
            <button 
              onClick={() => setIsOpen(true)} 
              className="p-2"
              aria-label="Open menu"
            >
              <FiMenu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`xl:hidden fixed inset-0 bg-black transition-all duration-300 z-[10000] ${
          isOpen ? 'opacity-60 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeSidebar}
        aria-hidden={!isOpen}
      />

      {/* Mobile Menu Sidebar */}
      <aside 
        className={`xl:hidden fixed top-0 right-0 h-full w-80 bg-white z-[10001] transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isOpen}
        aria-label="Mobile navigation menu"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <img src={Logo} alt="Logo" className="w-12 h-auto" />
              <button 
                onClick={closeSidebar} 
                className="p-2"
                aria-label="Close menu"
              >
                <FiX size={24} />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item) => (
              <div key={item.to || item.key} className="mb-1">
                {item.subItems ? (
                  <div className="mb-1">
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.key ? null : item.key)}
                      className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50"
                      aria-expanded={openDropdown === item.key}
                    >
                      <span className="font-medium">{item.label}</span>
                      {openDropdown === item.key ? <FiChevronDown /> : <FiChevronRight />}
                    </button>
                    
                    {openDropdown === item.key && (
                      <div className="bg-gray-50 ml-4 mt-1 mb-2 rounded-lg">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.to}
                            to={sub.to}
                            onClick={closeSidebar}
                            className="block p-4 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.to}
                    onClick={closeSidebar}
                    className="block p-4 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="p-4 border-t">
            <AuthButtons isMobile={true} />
          </div>
        </div>
      </aside>

      {/* Spacer for fixed header */}
      <div className="xl:hidden h-16" />
    </>
  );
};

export default MobileNav;
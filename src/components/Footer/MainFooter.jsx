import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const subscribeToNewsletter = async (email) => {
  try {
    const response = await fetch("https://rayanbackend-1.onrender.com/api/feature/sendemail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    if (response.ok) {
      return { success: true, message: "newsletter.success" };
    } else {
      return { success: false, message: "newsletter.tryLater" };
    }
  } catch (error) {
    return { success: false, message: "newsletter.error" };
  }
};

const MainFooter = () => {
  const { t, i18n } = useTranslation("common");
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ message: '', type: '' });

  const socialLinks = [
   { icon: <FaFacebook />, label: 'facebook', url: 'https://www.facebook.com/brevacoffee' },
{ icon: <FaInstagram />, label: 'instagram', url: 'https://www.instagram.com/brevacoffee' },
{ icon: <FaLinkedin />, label: 'linkedin', url: 'https://www.linkedin.com/company/brevacoffee' },
{ icon: <FaTwitter />, label: 'twitter', url: 'https://twitter.com/brevacoffee' },
{ icon: <FaWhatsapp />, label: 'whatsapp', url: 'https://wa.me/10000000000' }
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      setStatus({ message: t("newsletter.enterEmail"), type: 'error' });
      return;
    }

    const result = await subscribeToNewsletter(email);
    setStatus({ 
      message: t(result.message), 
      type: result.success ? 'success' : 'error' 
    });
    
    if (result.success) setEmail('');
  };

  return (
    <footer className="footer bg-gray-900 text-white py-12 px-4 md:px-8" dir={i18n.dir()}>
      <div className="flex flex-col lg:flex-row justify-between items-start max-w-7xl mx-auto gap-8 lg:gap-4">
        
        {/* Links Column */}
        <div className="w-full lg:w-auto">
          <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-white">{t("footer.links")}</h3>
          <ul className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4">
            <li className="footer-list-item text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer text-sm md:text-base">
              <a href="/">{t("nav.home")}</a>
            </li>
            <li className="footer-list-item text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer text-sm md:text-base">
              <a href="/products">{t("nav.products")}</a>
            </li>
            <li className="footer-list-item text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer text-sm md:text-base">
              <a href="/contact">{t("nav.contact")}</a>
            </li>
            <li className="footer-list-item text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer text-sm md:text-base">
              <a href="/certificates">{t("nav.certificates")}</a>
            </li>
            <li className="footer-list-item text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer text-sm md:text-base">
              <a href="/about">{t("nav.about")}</a>
            </li>
          </ul>
        </div>

        {/* Solutions Column */}
        <div className="w-full lg:w-auto">
          <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-white">{t("footer.solutions")}</h3>
          <ul className="space-y-3 md:space-y-4">
            <li className="footer-list-item text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer text-sm md:text-base">
              <a href="/download-data">{t("footer.team")}</a>
            </li>
            <li className="footer-list-item text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer text-sm md:text-base">
              <a href="/faq">{t("footer.faq")}</a>
            </li>
          
          </ul>
        </div>

        {/* Social Media Column */}
        <div className="w-full lg:w-auto">
          <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">{t("footer.socialMedia")}</h3>
          <ul className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4">
            {socialLinks.map((social, index) => (
              <li key={index} className="social-list-item flex items-center gap-3">
                <a 
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(`footer.social.${social.label}`)}
                  className="text-xl md:text-2xl text-gray-400 hover:text-blue-400 transition-colors duration-200"
                >
                  {social.icon}
                </a>
                <span className="text-gray-300 text-sm md:text-base">{t(`footer.social.${social.label}`)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="w-full lg:max-w-md">
          <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-white">{t("footer.subscribe")}</h3>
          <p className="footer-text text-gray-300 mb-4 md:mb-6 text-sm md:text-base">
            {t("newsletter.description")}
          </p>
          
          <form onSubmit={handleSubscribe} className="space-y-3 md:space-y-4">
            <div className="newsletter-form flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder={t("newsletter.placeholder")} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-input flex-grow px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm md:text-base"
                aria-label={t("newsletter.placeholder")}
              />
              <button 
                type="submit"
                className="newsletter-button bg-white text-black font-semibold px-6 py-3 rounded-lg transition-colors duration-200 hover:bg-gray-100 text-sm md:text-base"
              >
                {t("newsletter.button")}
              </button>
            </div>
            
            {status.message && (
              <p className={`text-xs md:text-sm ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {status.message}
              </p>
            )}
          </form>
          
          <p className="footer-disclaimer text-gray-400 text-xs md:text-sm mb-4 mt-6">
            {t("newsletter.disclaimer")}
          </p>
          <p className="footer-copyright text-gray-500 text-xs md:text-sm">
            © 2026 Relum. {t("footer.rights")}
          </p>
        </div>

      </div>
    </footer>
  );
};

export default MainFooter;
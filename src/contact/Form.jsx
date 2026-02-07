import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaUser, FaComment } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import swal from 'sweetalert';

const Form = () => {
  const { t } = useTranslation("contact");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Contact info with translation keys
  const contactInfo = [
    {
      icon: <FaPhone />,
      titleKey: "contactInfo.phone.title",
      detailsKey: "contactInfo.phone.details",
      descriptionKey: "contactInfo.phone.description"
    },
    {
      icon: <FaEnvelope />,
      titleKey: "contactInfo.email.title",
      detailsKey: "contactInfo.email.details",
      descriptionKey: "contactInfo.email.description"
    },
    {
      icon: <FaMapMarkerAlt />,
      titleKey: "contactInfo.office.title",
      detailsKey: "contactInfo.office.details",
      descriptionKey: "contactInfo.office.description"
    }
  ];

  const businessHours = [
    {
      daysKey: "businessHours.weekdays.days",
      hoursKey: "businessHours.weekdays.hours"
    },
    {
      daysKey: "businessHours.saturday.days",
      hoursKey: "businessHours.saturday.hours"
    },
    {
      daysKey: "businessHours.sunday.days",
      hoursKey: "businessHours.sunday.hours"
    }
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t("validation.nameRequired");
    if (!formData.email.trim()) {
      newErrors.email = t("validation.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("validation.emailInvalid");
    }
    if (!formData.message.trim()) newErrors.message = t("validation.messageRequired");
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      swal(t("alerts.validation.title"), t("alerts.validation.message"), "warning");
      return;
    }

    setLoading(true);
    setErrors({});

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    try {
      await emailjs.send(
        'service_yklda1q',
        'template_k30o553',
        templateParams,
        'j-oEj1R0EXdpTkJy_'
      );

      swal(t("alerts.success.title"), t("alerts.success.message"), "success");

      // Clear form
      setFormData({
        name: '',
        email: '',
        message: ''
      });

    } catch (error) {
      console.error("Email send error:", error);
      swal(t("alerts.error.title"), t("alerts.error.message"), "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-3">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t("header.title")}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t("header.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t("contactInfo.title")}
            </h2>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/50 transition-colors duration-300"
                >
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <div className="text-primary text-xl">
                      {info.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {t(info.titleKey)}
                    </h3>
                    <p className="text-gray-900 font-medium">
                      {t(info.detailsKey)}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      {t(info.descriptionKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">
                {t("businessHours.title")}
              </h3>
              <div className="space-y-2">
                {businessHours.map((hours, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-600">{t(hours.daysKey)}</span>
                    <span className="text-gray-900 font-medium">{t(hours.hoursKey)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t("form.title")}
            </h2>
            <p className="text-gray-600">
              {t("form.subtitle")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-700 font-medium">
                <FaUser className="text-primary" />
                <span>{t("form.fields.name.label")}</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder={t("form.fields.name.placeholder")}
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-300 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                required
                aria-label={t("form.fields.name.ariaLabel")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-700 font-medium">
                <FaEnvelope className="text-primary" />
                <span>{t("form.fields.email.label")}</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder={t("form.fields.email.placeholder")}
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-300 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                required
                aria-label={t("form.fields.email.ariaLabel")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-700 font-medium">
                <FaComment className="text-primary" />
                <span>{t("form.fields.message.label")}</span>
              </label>
              <textarea
                name="message"
                placeholder={t("form.fields.message.placeholder")}
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none resize-none transition-all duration-300 ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                }`}
                required
                aria-label={t("form.fields.message.ariaLabel")}
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              aria-label={loading ? t("form.submit.loading") : t("form.submit.ariaLabel")}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>{t("form.submit.sending")}</span>
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  <span>{t("form.submit.text")}</span>
                </>
              )}
            </button>

            {/* Privacy Note */}
            <p className="text-center text-gray-500 text-sm">
              {t("form.privacyNote")}
            </p>
          </form>
        </div>
      </div>

      {/* Success Message (Optional) */}
      <div className="mt-12 text-center">
        <p className="text-gray-600">
          {t("footer.prefix")}{" "}
          <a href="tel:+12345678901" className="text-primary font-semibold hover:underline">
            {t("contactInfo.phone.details")}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Form;
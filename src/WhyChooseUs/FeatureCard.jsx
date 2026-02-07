// FeatureCard.jsx - Updated with 4 soft colors
import React from "react";

const FeatureCard = ({ icon, title, description, delay = 0, boxType = "green" }) => {
  // Define soft color palettes
  const colorSchemes = {
    green: {
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      icon: "text-emerald-600",
      hover: "hover:border-emerald-300",
      gradient: "from-emerald-500 to-teal-500"
    },
    blue: {
      bg: "bg-sky-50",
      border: "border-sky-100",
      icon: "text-sky-600",
      hover: "hover:border-sky-300",
      gradient: "from-sky-500 to-cyan-500"
    },
    purple: {
      bg: "bg-violet-50",
      border: "border-violet-100",
      icon: "text-violet-600",
      hover: "hover:border-violet-300",
      gradient: "from-violet-500 to-purple-500"
    },
    amber: {
      bg: "bg-amber-50",
      border: "border-amber-100",
      icon: "text-amber-600",
      hover: "hover:border-amber-300",
      gradient: "from-amber-500 to-yellow-500"
    }
  };

  const colors = colorSchemes[boxType] || colorSchemes.green;

  return (
    <div 
      className={`group relative p-8 rounded-2xl border ${colors.border} ${colors.hover} transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${colors.bg}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Animated gradient background */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${colors.gradient}`}></div>
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className={`absolute -inset-1 bg-gradient-to-r ${colors.gradient} rounded-2xl blur-xl opacity-20 group-hover:opacity-30`}></div>
      </div>
      
      {/* Icon Container */}
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
          <div className={`text-2xl group-hover:scale-125 transition-transform duration-300 ${colors.icon}`}>
            {icon}
          </div>
        </div>
        {/* Animated dot */}
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white/50 animate-ping opacity-0 group-hover:opacity-100 border-2 border-white"></div>
      </div>
      
      {/* Content */}
      <div className="relative space-y-3">
        <h3 className={`text-xl font-bold text-gray-800 group-hover:${colors.icon} transition-colors duration-300`}>
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed text-sm">
          {description}
        </p>
      </div>
      
      {/* Animated underline */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent group-hover:w-24 transition-all duration-500 opacity-0 group-hover:opacity-100">
        <div className={`h-full bg-gradient-to-r ${colors.gradient}`}></div>
      </div>
    </div>
  );
};

export default FeatureCard;
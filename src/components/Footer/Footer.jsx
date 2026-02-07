import React from "react";
import Logo from "../../assets/features/Logo.png";

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-[#1A0F25] justify-around items-start md:items-center py-16 px-6 gap-10 md:gap-0">
      
      {/* Logo & Description - comes first on mobile */}
      <div className="order-1 md:order-4 flex flex-col gap-6 max-w-md w-full">
        <div className="flex items-center gap-4 md:gap-6">
          <img src={Logo} alt="Logo" className="w-12 h-12 md:w-16 md:h-16" />
          <p className="text-primary text-2xl md:text-3xl font-bold">Rayan Saffron</p>
        </div>
        <p className="text-white text-sm md:text-base">
          A trusted leader in premium saffron with over a decade of expertise. A trusted leader in premium saffron with over a decade of expertise.
        </p>
      </div>

      {/* Links Column 1 */}
      <div className="order-2 md:order-1 flex flex-col gap-6 w-full md:w-auto">
        <p className="text-primary text-lg font-semibold">Links</p>
        <ul className="flex flex-col gap-4">
          <li className="text-white">Home</li>
          <li className="text-white">Products</li>
          <li className="text-white">About</li>
          <li className="text-white">Certifications</li>
          <li className="text-white">Blogs</li>
        </ul>
      </div>

      {/* Links Column 2 */}
      <div className="order-3 md:order-2 flex flex-col gap-6 w-full md:w-auto">
        <p className="text-primary text-lg font-semibold">Links</p>
        <ul className="flex flex-col gap-4">
          <li className="text-white">Home</li>
          <li className="text-white">Products</li>
          <li className="text-white">About</li>
          <li className="text-white">Certifications</li>
          <li className="text-white">Blogs</li>
        </ul>
      </div>

      {/* Links Column 3 */}
      <div className="order-4 md:order-3 flex flex-col gap-6 w-full md:w-auto">
        <p className="text-primary text-lg font-semibold">Links</p>
        <ul className="flex flex-col gap-4">
          <li className="text-white">Home</li>
          <li className="text-white">Products</li>
          <li className="text-white">About</li>
          <li className="text-white">Certifications</li>
          <li className="text-white">Blogs</li>
        </ul>
      </div>

    </div>
  );
};

export default Footer;

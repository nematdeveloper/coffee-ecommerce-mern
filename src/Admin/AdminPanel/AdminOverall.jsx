import React, { useState, useEffect } from 'react';

const AdminOverall = () => {
  const baseUrl = "https://rayanbackend-1.onrender.com";
  const [counts, setCounts] = useState(null);

  const fetchCounts = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/getall`);
      const data = await response.json();
      setCounts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  if (!counts) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6">
      {/* Products */}
      <div className="flex flex-col items-center justify-center bg-blue-50 rounded-2xl shadow-md w-full h-40 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-gray-700 text-lg font-semibold mb-2">تعداد محصولات</h2>
        <p className="text-3xl font-bold text-blue-600">{counts.products}</p>
      </div>

      {/* Users */}
      <div className="flex flex-col items-center justify-center bg-green-50 rounded-2xl shadow-md w-full h-40 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-gray-700 text-lg font-semibold mb-2">تعداد کاربران</h2>
        <p className="text-3xl font-bold text-green-600">{counts.users}</p>
      </div>

      {/* Orders */}
      <div className="flex flex-col items-center justify-center bg-yellow-50 rounded-2xl shadow-md w-full h-40 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-gray-700 text-lg font-semibold mb-2">تعداد سفارشات</h2>
        <p className="text-3xl font-bold text-yellow-600">{counts.orders}</p>
      </div>

      {/* Blogs */}
      <div className="flex flex-col items-center justify-center bg-yellow-50 rounded-2xl shadow-md w-full h-40 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-gray-700 text-lg font-semibold mb-2">تعداد وبلاگ ها</h2>
        <p className="text-3xl font-bold text-yellow-600">{counts.blog}</p>
      </div>
    </div>
  );
};

export default AdminOverall;

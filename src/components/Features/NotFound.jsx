import React from 'react';
import { useNavigate } from 'react-router-dom';
import notfound from "../../assets/features/NotFound.webp";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 p-4'>
      <div className='max-w-2xl text-center'>
        {/* Image with subtle animation */}
        <div className='mb-8 animate-pulse'>
          <img 
            src={notfound} 
            alt="Page not found" 
            className='w-full max-w-md mx-auto rounded-lg shadow-xl'
          />
        </div>
        
        {/* Content */}
        <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>
          Oops! Page Not Found
        </h1>
        
        <p className='text-lg text-gray-600 mb-8 max-w-lg mx-auto'>
          The page you're looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        
        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <button
            onClick={() => navigate(-1)}
            className='px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200 shadow-md'
          >
            ← Go Back
          </button>
          
          <button
            onClick={() => navigate('/')}
            className='px-6 py-3 bg-primary text-white rounded-lg font-medium transition-colors duration-200 shadow-md'
          >
            Go to Homepage
          </button>
        </div>
        
        {/* Additional Help */}
        <p className='mt-8 text-gray-500 text-sm'>
          Error code: 404 | If you believe this is an error, please contact support.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
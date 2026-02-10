import React, { useState } from 'react';
import Chatbot from '../Chatbot/index';
import { FaWhatsapp, FaFacebookMessenger, FaRobot, FaPlus, FaTimes } from 'react-icons/fa';

const Social = () => {
  const [showChatBot, setShowChatBot] = useState(false);
  const [showIcons, setShowIcons] = useState(false);

  return (
    <>
      {/* Main Toggle Button */}
      <button
        onClick={() => setShowIcons(!showIcons)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-primary text-white shadow-xl  transition-all flex items-center justify-center"
      >
        {showIcons ? <FaTimes size={24} /> : <FaRobot size={24} />}
      </button>

      {/* Social Icons */}
      {showIcons && (
        <div className="fixed bottom-24 right-8 z-50 flex flex-col gap-3">
          <button
            onClick={() => window.open('https://wa.me/93784061919', '_blank')}
            className="w-12 h-12 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center"
            title="WhatsApp"
          >
            <FaWhatsapp size={22} />
          </button>

          <button
            onClick={() => window.open('https://m.me/rayansaffron.af', '_blank')}
            className="w-12 h-12 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
            title="Messenger"
          >
            <FaFacebookMessenger size={22} />
          </button>

          <button
            onClick={() => {
              setShowChatBot(true);
              setShowIcons(false);
            }}
            className="w-12 h-12 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
            title="ChatBot"
          >
            <FaRobot size={22} />
          </button>
        </div>
      )}

      {/* Chatbot */}
      {showChatBot && (
        <div className="fixed bottom-28 right-8 z-40">
          <Chatbot onClose={() => setShowChatBot(false)} />
        </div>
      )}
    </>
  );
};

export default Social;
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaRobot, FaUser, FaPaperPlane, FaTimes, FaTrash } from 'react-icons/fa';

const Chatbot = ({ onClose }) => {
  const { t } = useTranslation("common");
  const { i18n } = useTranslation();
  const [messages, setMessages] = useState([
    { text: t('chatbot.initialMessage'), sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const baseUrl = "https://rayanbackend-1.onrender.com";

  // Update initial message when language changes
  useEffect(() => {
    if (messages.length === 1 && messages[0].sender === 'bot') {
      setMessages([{ text: t('chatbot.initialMessage'), sender: 'bot' }]);
    }
  }, [i18n.language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Detect language from text
  const detectLanguage = (text) => {
    const arabicScriptRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
    const persianRegex = /[\u067E\u0686\u0698\u06AF]/;
    
    if (arabicScriptRegex.test(text)) {
      if (persianRegex.test(text) || text.includes('می') || text.includes('ای')) {
        return 'persian';
      }
      return 'arabic';
    }
    return 'english';
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setIsLoading(true);
    
    try {
      const detectedLang = detectLanguage(userMessage);
      
      const response = await fetch(`${baseUrl}/api/chat`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept-Language': i18n.language
        },
        body: JSON.stringify({ 
          message: userMessage,
          language: detectedLang
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessages(prev => [...prev, { 
          text: data.reply, 
          sender: 'bot' 
        }]);
      } else {
        setMessages(prev => [...prev, { 
          text: t('chatbot.error'), 
          sender: 'bot' 
        }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        text: t('chatbot.connectionError'), 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{ text: t('chatbot.initialMessage'), sender: 'bot' }]);
  };

  return (
    <div className="w-80 h-[600px] bg-white rounded-xl shadow-2xl flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 text-white p-4 rounded-t-xl flex justify-between items-center">
        <div className="flex items-center gap-3">
          <FaRobot className="text-2xl text-purple-400" />
          <div>
            <h3 className="font-bold">{t('chatbot.title')}</h3>
            <p className="text-xs text-gray-300">{t('chatbot.status')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearChat}
            className="text-xs text-gray-300 hover:text-white px-2 py-1 border border-gray-300 rounded"
            title={t('chatbot.clearChat')}
          >
            <FaTrash />
          </button>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white"
            aria-label={t('chatbot.closeButton')}
          >
            <FaTimes className="text-lg" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div className={`inline-flex items-start max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`p-2 rounded-full ${msg.sender === 'user' ? 'ml-2 bg-blue-100' : 'mr-2 bg-gray-200'}`}>
                {msg.sender === 'user' ? (
                  <FaUser className="text-blue-600" />
                ) : (
                  <FaRobot className="text-gray-600" />
                )}
              </div>
              <div 
                className={`px-3 py-2 rounded-xl whitespace-pre-wrap break-words ${msg.sender === 'user' ? 
                  'bg-blue-500 text-white' : 
                  'bg-white border border-gray-200 text-gray-800'
                }`}
                dir={detectLanguage(msg.text) === 'english' ? 'ltr' : 'rtl'}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="text-left mb-3">
            <div className="inline-flex items-start max-w-[80%] flex-row">
              <div className="p-2 rounded-full bg-gray-200 mr-2">
                <FaRobot className="text-gray-600" />
              </div>
              <div className="px-3 py-2 rounded-xl bg-white border border-gray-200">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
    <div className="p-3 sm:p-4 border-t border-gray-200">
  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyPress={handleKeyPress}
      placeholder={t('chatbot.placeholder')}
      className="flex-1 px-3 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      disabled={isLoading}
      dir={detectLanguage(input) === 'english' ? 'ltr' : 'rtl'}
    />
    <button
      onClick={sendMessage}
      disabled={isLoading || !input.trim()}
      className={`px-4 py-2 sm:py-2.5 rounded-lg flex-shrink-0 ${isLoading || !input.trim() ?
        'bg-gray-300 text-gray-500 cursor-not-allowed' :
        'bg-blue-500 hover:bg-blue-600 text-white'
      }`}
    >
      <FaPaperPlane className="w-4 h-4 sm:w-5 sm:h-5" />
    </button>
  </div>
</div>
    </div>
  );
};

export default Chatbot;
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaRobot, FaUser, FaPaperPlane, FaTimes, FaCommentDots } from 'react-icons/fa';

const Chatbot = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: t('chatbot.initialMessage'), sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const baseUrl = "http://localhost:5000";

  // Update initial message when language changes
  useEffect(() => {
    if (messages.length === 1 && messages[0].sender === 'bot') {
      setMessages([{ text: t('chatbot.initialMessage'), sender: 'bot' }]);
    }
  }, [i18n.language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Format message text with proper line breaks
  const formatMessage = (text) => {
    return text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

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
    
    // Add user message
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setIsLoading(true);
    
    try {
      // Detect language from user message
      const detectedLang = detectLanguage(userMessage);
      
      const response = await fetch(`${baseUrl}/api/chat`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept-Language': i18n.language
        },
        body: JSON.stringify({ 
          message: userMessage,
          language: detectedLang // Send detected language
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Add bot response with formatted text
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
    <>
      {/* Chatbot Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed z-50 transition-all duration-300 hover:scale-110 active:scale-95"
          style={{
            bottom: 'clamp(1rem, 3vw, 1.5rem)',
            right: 'clamp(1rem, 3vw, 1.5rem)',
            width: 'clamp(3.5rem, 8vw, 4rem)',
            height: 'clamp(3.5rem, 8vw, 4rem)',
          }}
          aria-label={t('chatbot.openButton')}
        >
          <div className="bg-primary text-white rounded-full w-full h-full flex items-center justify-center shadow-2xl">
            <FaCommentDots className="text-clamp(1.5rem, 3vw, 2rem)" />
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed z-50 bg-white flex flex-col border border-gray-200 shadow-2xl"
          style={{
            bottom: 'clamp(0.5rem, 2vw, 1.5rem)',
            right: 'clamp(0.5rem, 2vw, 1.5rem)',
            width: 'clamp(min(calc(100vw - 2rem), 320px), 90vw, 384px)',
            height: 'clamp(400px, 70vh, 600px)',
            maxHeight: 'calc(100vh - 3rem)',
            borderRadius: '1rem',
          }}
        >
          {/* Header */}
          <div className="bg-gray-900 text-white p-3 sm:p-4 rounded-t-xl flex justify-between items-center">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <FaRobot className="text-xl sm:text-2xl text-primary flex-shrink-0" />
              <div className="min-w-0">
                <h3 className="font-bold text-sm sm:text-base truncate">{t('chatbot.title')}</h3>
                <p className="text-xs text-gray-300 truncate">{t('chatbot.status')}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <button
                onClick={clearChat}
                className="text-xs text-gray-300 hover:text-white px-1.5 sm:px-2 py-0.5 sm:py-1 border border-gray-300 rounded text-nowrap"
                title={t('chatbot.clearChat')}
              >
                {t('chatbot.clear')}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white ml-1"
                aria-label={t('chatbot.closeButton')}
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div className={`inline-flex items-start max-w-[90%] sm:max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`p-1.5 sm:p-2 rounded-full flex-shrink-0 ${msg.sender === 'user' ? 'bg-blue-100 ml-1 sm:ml-2' : 'bg-gray-200 mr-1 sm:mr-2'}`}>
                    {msg.sender === 'user' ? (
                      <FaUser className="text-blue-600 text-sm sm:text-base" />
                    ) : (
                      <FaRobot className="text-gray-600 text-sm sm:text-base" />
                    )}
                  </div>
                  <div 
                    className={`px-3 py-2 sm:px-4 sm:py-3 rounded-2xl text-sm sm:text-base whitespace-pre-wrap break-words ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'}`}
                    dir={detectLanguage(msg.text) === 'english' ? 'ltr' : 'rtl'}
                    style={{ textAlign: 'start' }}
                  >
                    {formatMessage(msg.text)}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-left mb-3">
                <div className="inline-flex items-start max-w-[90%] sm:max-w-[80%] flex-row">
                  <div className="p-1.5 sm:p-2 rounded-full bg-gray-200 mr-1 sm:mr-2 flex-shrink-0">
                    <FaRobot className="text-gray-600 text-sm sm:text-base" />
                  </div>
                  <div className="px-3 py-2 sm:px-4 sm:py-3 rounded-2xl bg-white border border-gray-200 text-gray-800 rounded-bl-none">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 sm:p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('chatbot.placeholder')}
                className="flex-1 px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                disabled={isLoading}
                dir={detectLanguage(input) === 'english' ? 'ltr' : 'rtl'}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className={`px-3 sm:px-4 py-2 sm:py-3 rounded-xl font-semibold transition-all flex-shrink-0 ${isLoading || !input.trim() ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary hover:bg-primary-600 text-white hover:shadow-lg'}`}
                aria-label={t('chatbot.sendButton')}
              >
                <FaPaperPlane className="text-sm sm:text-base" />
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              {t('chatbot.footer')}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
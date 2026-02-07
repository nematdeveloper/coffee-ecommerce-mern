import React from 'react'
import Index from "../Chatbot/index"

const ChatBotContainer = () => {
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px', 
      zIndex: 1000,
      maxHeight: '80vh', 
      overflow: 'hidden'
    }}>
      <Index/>
    </div>
  )
}

export default ChatBotContainer
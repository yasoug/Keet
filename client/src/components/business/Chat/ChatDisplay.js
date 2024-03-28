import { useState } from 'react';
import ChatInput from './ChatInput';
import { Avatar } from '@mui/material';

const ChatDisplay = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
  };


  return (
    <div className="chat-display">
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className="text-message" >
          {message}
        </div>
        ))}
      </div>


      <ChatInput addMessage={addMessage} />
    </div>
  );
};



export default ChatDisplay

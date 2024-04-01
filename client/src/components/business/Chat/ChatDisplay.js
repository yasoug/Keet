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
      <Avatar>G</Avatar>
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

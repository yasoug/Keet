import { useState, useEffect, useRef } from 'react';
import { Avatar } from '@mui/material';


const ChatDisplay = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
  
    const handleMessageSend = () => {
      if (inputValue.trim() !== '') {
        setMessages([...messages, inputValue]);
        setInputValue('');
      }
    };
  
    return (
      <div className="chat-display">
        <div className='chatter'>
            <div className='Avat'>
                <Avatar src="https://i.imgur.com/aMPNEAw.jpg" sx={{ width: 60 , height: 60 }} />
            </div>
            <div className='glen'>
                Glen
            </div>
        </div>
        <div className="messages" >
          {messages.map((message, index) => (
            <div key={index} className="message" >
              {message}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message here..."
          />
          <button onClick={handleMessageSend}  >Send</button>
        </div>
      </div>
    );
  }
  
  



export default ChatDisplay

import { useState } from 'react'
import { TextField } from '@mui/material';
const ChatInput = ({ addMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      addMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input">
      <TextField
          id="text"
          label=""
          multiline
          maxRows={4}
          variant="filled"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type a message..."
        className="input-field"
      />
      <button type="submit" className="send-button">
        Send
      </button>
    </form>
  );
}

export default ChatInput

import { useState } from 'react'
import { TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

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
      <Button type='submit' variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
      <Button onClick={() => {
          alert('clicked');
        }}
      > 
      </Button>
    </form>
  );
}

export default ChatInput

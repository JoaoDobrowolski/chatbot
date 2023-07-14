'use client'; // turn the server component into a client component
import interpreter from '@/app/helpers/interpreter';
import React, { useEffect, useState } from 'react';

export default function ChatContainer() {
  const [inputValue, setInputValue] = useState('');
  const [lastInput, setLastInput] = useState('');
  const [chatLog, setChatLog] = useState([]);
  // const [answer, setAnswer] = useState('');
  const [submit, setSubmit] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    developAnswer();
  }, [submit]);

  const developAnswer = () => {
    if (typeof interpreter(lastInput) === 'string') {
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { type: 'bot', message: interpreter(lastInput) }
      ]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: 'user', message: inputValue }
    ]);
    setLastInput(inputValue);
    setInputValue('');
    setSubmit(!submit);
  };

  return (
    <div>
      {
        chatLog.map((msg, i) => (
          <div key={i}>
            {msg.message}
          </div>
        ))
      }
      <form onSubmit={handleSubmit}>
        <input
          id="input"
          type="text"
          placeholder="Write something..."
          autoComplete="off"
          autoFocus="true"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" >
          Send
        </button>
      </form>
    </div>
  );
}
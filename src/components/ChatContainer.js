'use client'; // turn the server component into a client component
import interpreter from '@/app/helpers/interpreter';
import React, { useEffect, useState } from 'react';

export default function ChatContainer() {
  const [inputValue, setInputValue] = useState('');
  const [lastInput, setLastInput] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [showOpt, setShowOpt] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [wichLink, setWichLink] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    developAnswer('bot', interpreter(lastInput));
  }, [submit]);

  const developAnswer = (type, message) => {
    if (typeof message === 'string') {
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { type, message }
      ]);
      setShowOpt(false);
      setShowLink(false);
      if (message.startsWith('Please')) {
        setShowOpt(true);
      }
    }

    if (typeof message === 'object') {
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { type, message: message.text }
      ]);
      setShowLink(true);
      setWichLink(message.reference);
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

  const handleOptions = (event) => {
    event.preventDefault();

    const msg = (event.target.innerText.startsWith('Do')
      ? 'I want to apply for a loan'
      : event.target.innerText);

    setShowOpt(false);
    developAnswer('user', msg);
    developAnswer('bot', interpreter(msg));
  };

  return (
    <div>
      {
        chatLog.map((msg, i) => (
          <div key={i}>
            <p>{msg.message}</p>
          </div>
        ))
      }
      {showOpt && (
        <div>
          <p onClick={(e) => handleOptions(e)}>Do you want to apply for a loan?</p >
          <p onClick={(e) => handleOptions(e)}>Loan conditions</p>
          <p onClick={(e) => handleOptions(e)}>Help</p>
        </div>
      )}
      {showLink && (
        <a href={wichLink} target="_blank" rel="noreferrer">Reference</a>
      )}
      <form onSubmit={handleSubmit}>
        <input
          id="input"
          type="text"
          placeholder="Write something..."
          autoComplete="off"
          autoFocus="true"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={false}
        />
        <button type="submit" >
          Send
        </button>
      </form>
    </div>
  );
}
'use client'; // turn the server component into a client component
import interpreter from '@/helpers/interpreter';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Login from './Login';
import ChatBotContext from '@/context/ChatBotContext';
import Register from './Register';

export default function ChatContainer() {
  const { formData, logged, showLogin, showRegister } = useContext(ChatBotContext);
  const [inputValue, setInputValue] = useState('');
  const [lastInput, setLastInput] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [showOpt, setShowOpt] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [wichLink, setWichLink] = useState(false);
  const [geStarted, setGetStarted] = useState(true);
  // const [showLogin, setShowLogin] = useState(false);
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
    scrollToBottom();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: 'user', message: inputValue }
    ]);
    setGetStarted(false);
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


  // reference: https://pt.stackoverflow.com/questions/272228/react-como-modificar-um-estado-do-componente-pai-a-partir-do-filho
  const onChildChanged = () => {
    developAnswer('bot', `Welcome ${formData.username}!`);
  };

  const inputRef = useRef(null); // to focus on input
  const chatContainerRef = useRef(null); // to scroll down

  useEffect(() => {
    inputRef.current.focus();
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [logged, showOpt]);


  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  return (
    <div className="bg-gradient-to-r from-violet-600 from-30% via-violet-800 via-50% to-violet-600 to 70%">
      <div className="container mx-auto max-w-[700px]">
        <div className="flex flex-col h-screen overflow-y-auto" ref={chatContainerRef}>
          <div className="flex-grow p-6">
            <div className="flex flex-col space-y-4 mt-28">
              {geStarted && (
                <div className="flex justify-center">
                  <p className="bg-gradient-to-r from-blue-500 to-purple-500 py-3 font-bold rounded-lg p-4 text-white max-w-sm flex justify-center">New here? Say hi to us!</p>
                </div>
              )}
              {
                chatLog.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`${msg.type === 'user' ? 'bg-purple-500' : 'bg-gray-800'} rounded-lg p-4 text-white max-w-sm`}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))
              }


            </div>
          </div>

          <div className="mb-28 p-6 flex justify-center">
            <div className="flex flex-col space-y-4">
              {showOpt && (
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 py-3 font-bold rounded-lg p-4 text-white max-w-sm flex justify-center flex-col">
                  <p className="cursor-pointer" onClick={(e) => handleOptions(e)}>Do you want to apply for a loan?</p >
                  <p className="cursor-pointer" onClick={(e) => handleOptions(e)}>Loan conditions</p>
                  <p className="cursor-pointer" onClick={(e) => handleOptions(e)}>Help</p>
                </div>
              )}
              {showLink && (
                <a className="bg-gradient-to-r from-blue-500 to-purple-500 py-3 font-bold rounded-lg p-4 text-white max-w-sm flex justify-center"
                  href={wichLink} target="_blank" rel="noreferrer">Reference</a>
              )}
              {chatLog.length !== 0 && !logged && showLogin && (
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 font-bold rounded-lg p-4 max-w-sm flex justify-center flex-col">
                  <p className="p-3 pl-4">Sign in to continue this conversation</p>
                  <Login callbackParent={() => onChildChanged()} />
                </div>
              )}
              {chatLog.length !== 0 && !logged && showRegister && (
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 font-bold rounded-lg p-4 max-w-sm flex justify-center flex-col">
                  <p className="p-3 pl-5">Join us now!</p>
                  <Register />
                </div>
              )

              }
            </div>
          </div>
          <form onSubmit={handleSubmit} className="fixed bottom-0 p-6">
            <div className="flex rounded-lg border border-gray-700 bg-gray-800">
              <input
                className="px-4 pr-60 py-2 w-auto bg-transparent text-white focus:outline-none"
                id="input"
                type="text"
                placeholder="Write something..."
                autoComplete="off"
                autoFocus="true"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={chatLog.length !== 0 && !logged}
                ref={inputRef}
              />
              <button
                className="bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-600 transition-colors duration-300"
                type="submit"
                disabled={inputValue === ''}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}
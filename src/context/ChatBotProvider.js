'use client';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ChatBotContext from './ChatBotContext';

function ChatBotProvider({ children }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [logged, setLogged] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);


  const contextValue = {
    formData,
    setFormData,
    logged,
    setLogged,
    showRegister,
    setShowRegister,
    showLogin,
    setShowLogin,
  };

  return (
    <ChatBotContext.Provider value={contextValue}>
      {children}
    </ChatBotContext.Provider>
  );
}

ChatBotProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ChatBotProvider;

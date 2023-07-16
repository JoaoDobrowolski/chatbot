import ChatBotContext from '@/context/ChatBotContext';
import React, { useContext } from 'react';

export default function Header() {
  const { formData, logged } = useContext(ChatBotContext);

  return (
    <p>{logged && formData.username}</p>
  );
}
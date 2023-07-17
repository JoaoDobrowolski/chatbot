'use client';
import React from 'react';
import ChatContainer from '@/components/ChatContainer';
import Header from '@/components/Header';
import ChatBotProvider from '@/context/ChatBotProvider';

export default function Home() {
  return (
    <div>
      <ChatBotProvider>
        <Header />
        <ChatContainer />
      </ChatBotProvider>
    </div>
  );
}

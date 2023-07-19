'use client';
import ChatBotContext from '@/context/ChatBotContext';
import Link from 'next/link';
import React, { useContext } from 'react';
import RobotFace from './RobotFace';

export default function Header() {
  const { formData, logged } = useContext(ChatBotContext);

  return (
    <div className="fixed w-screen">
      <div className="h-26 flex items-center justify-between bg-gradient-to-r from-blue-300 to-purple-400 font-bold">
        <Link
          href="/"
          className="pl-5 left-0 bg-gradient-to-r from-blue-600 to-violet-700 text-transparent bg-clip-text text-center py-3 font-bold text-6xl hover:from-pink-500 hover:to-yellow-500"
        >
          ChatTT
        </Link>
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
          <RobotFace />
        </div>
        <Link
          href="/history"
          className="pr-5 bg-gradient-to-r from-blue-600 to-violet-700 text-transparent bg-clip-text text-center py-3 font-bold text-4xl hover:from-pink-500 hover:to-yellow-500"
        >
          {logged && formData.username}
        </Link>
      </div>
    </div>
  );
}
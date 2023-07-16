import React from 'react';
import styles from './page.module.css';
import ChatContainer from '@/components/ChatContainer';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div>
      <Header />
      <ChatContainer className={styles.main} />
    </div>
  );
}

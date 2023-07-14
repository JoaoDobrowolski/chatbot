import React from 'react';
import styles from './page.module.css';
import ChatContainer from '@/components/ChatContainer';

export default function Home() {
  return (
    <div className={styles.main}>
      <ChatContainer />
    </div>
  );
}

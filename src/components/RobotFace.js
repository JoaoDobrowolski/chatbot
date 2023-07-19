import React, { useContext } from 'react';
import styles from '../styles/robot.module.css';
import ChatBotContext from '@/context/ChatBotContext';

export default function RobotFace() {
  const { isFiltered, blink } = useContext(ChatBotContext);

  return (
    <div>
      <div className="flex justify-center items-center">
        <a href="https://github.com/JoaoDobrowolski/chatbot" rel="noreferrer" target="_blank" className={styles.robotface}>
          <div className={!isFiltered || blink ? styles.leftblink : styles.lefteye}></div>
          <div className={blink ? styles.rightblink : styles.righteye}></div>
          <div className={styles.mouth}></div>
        </a>
      </div>
    </div>
  );
}

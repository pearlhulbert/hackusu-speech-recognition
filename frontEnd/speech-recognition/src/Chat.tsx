import React from 'react';
import { Responses } from './components/Responses';
import { ChatBubble } from './components/ChatBubble';
import styles from './styles/Header.module.css';

interface ChatProps {
  selectedVoice: string;
}
  

export const Chat: React.FC<ChatProps> = ({ selectedVoice }) => {

  const responses: string[] = ["Heyyyy", "What's up?", "How are you doing?"];

  return (
    
    <div>
        <header className={styles.mainView}>
            
        <h4 className={styles.title}>Voice Source:{selectedVoice}</h4>
        </header>     
      <ChatBubble side = 'right' content='Heyyy' />
      <Responses responses={responses} />
    </div>
  );
};
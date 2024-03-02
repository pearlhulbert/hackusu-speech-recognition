import React, { useEffect, useState } from 'react';
import { Responses } from './components/Responses';
import { ChatBubble } from './components/ChatBubble';
import styles from './styles/Header.module.css';


interface ChatProps {
  selectedVoice: string;
}
  

export const Chat: React.FC<ChatProps> = ({ selectedVoice }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log(selectedVoice);

    let voice: string  = '';
    if (selectedVoice === 'Speaker 1') {
      voice = 'voice1';
    } else if (selectedVoice === 'Speaker 2') {
      voice = 'voice2';
    } 


    // Initialize the WebSocket connection
    const ws = new WebSocket(`ws://0.0.0.0:8000/wst/${voice}`);
    console.log(ws);

    ws.onmessage = (event) => {
      // Concatenate the new message with the existing messages
      setMessage(prevMessage => prevMessage + ' ' + event.data);
    };

    ws.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');

    };

    // Clean up function
    return () => {
      ws.close();
    };
  }, [selectedVoice]); // Depend on selectedVoice so this runs when it changes

  

  return (
    
    <div>
        <header className={styles.mainView}>
            
        <h4 className={styles.title}>{selectedVoice}</h4>
        </header>     
      <ChatBubble side = 'right' content={message} />
      <Responses message={message} />
    </div>
  );
};

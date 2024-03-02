import React from 'react';
import { Responses } from './components/Responses';
import { ChatBubble } from './components/ChatBubble';

interface ChatProps {
  selectedVoice: string;
}

export const Chat: React.FC<ChatProps> = ({ selectedVoice }) => {

  const responses: string[] = ["Heyyyy", "What's up?", "How are you doing?"];

  return (
    <div>
      <h2>Chat Page</h2>
      <p>You have selected: {selectedVoice}</p>
      <ChatBubble side = 'right' content='Heyyyy' />
      <Responses responses={responses} />
    </div>
  );
};
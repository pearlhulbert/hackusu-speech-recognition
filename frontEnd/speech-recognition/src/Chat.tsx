import React from 'react';

interface ChatProps {
  selectedVoice: string;
}

export const Chat: React.FC<ChatProps> = ({ selectedVoice }) => {
  return (
    <div>
      <h2>Chat Page</h2>
      <p>You have selected: {selectedVoice}</p>
      {/* Add your chat interface here */}
    </div>
  );
};
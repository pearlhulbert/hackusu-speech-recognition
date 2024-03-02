import React, { useState } from 'react';
import VoiceButtons from './VoiceButtons';
import { Chat } from './Chat';

const App: React.FC = () => {
  const [selectedVoice, setSelectedVoice] = useState('');

  return (
    <div>
      {!selectedVoice 
        ? <VoiceButtons setSelectedVoice={setSelectedVoice} />
        : <Chat selectedVoice={selectedVoice} />}
    </div>
  );
};

export default App;

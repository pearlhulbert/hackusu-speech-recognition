import React, { useState } from 'react';
import VoiceButtons from './VoiceButtons';
import { Chat } from './Chat';

const App: React.FC = () => {
  const [selectedVoice, setSelectedVoice] = useState('');

  return (
    <div>
      {!selectedVoice // if selectedVoice is falsy, then render this
        ? <VoiceButtons setSelectedVoice={setSelectedVoice} />
        : <Chat selectedVoice={selectedVoice} /> // if selectedVoice is true, then render this
        }  
    </div>
  );
};

export default App;

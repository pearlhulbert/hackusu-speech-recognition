import React, { useState } from 'react';
import VoiceButtons from './VoiceButtons';
import { Chat } from './Chat';


const App: React.FC = () => {
  const [selectedVoice, setSelectedVoice] = useState('');

  return (
    <div>
      {!selectedVoice // if selectedVoice is falsy, then render these
        ? <VoiceButtons setSelectedVoice={setSelectedVoice} />
        : <Chat selectedVoice={selectedVoice} /> // if selectedVoice is true, then render
        }  
    </div>
  );
};

export default App;

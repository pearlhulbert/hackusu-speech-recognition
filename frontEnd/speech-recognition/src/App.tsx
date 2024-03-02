import React, { useState } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Chat} from './Chat';

export function App() {

  const [selectedVoice, setSelectedVoice] = useState('');
  
  const handleVoiceSelection = (voice: string) => {
    setSelectedVoice(voice);
  };


  return (
    <BrowserRouter>
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p>Select a voice to start</p>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button style={{ fontSize: '24px', padding: '10px 20px' }} onClick={() => handleVoiceSelection('Voice 1')}>Voice 1</button>
        <button style={{ fontSize: '24px', padding: '10px 20px' }} onClick={() => handleVoiceSelection('Voice 2')}>Voice 2</button>
        <button style={{ fontSize: '24px', padding: '10px 20px' }} onClick={() => handleVoiceSelection('Voice 3')}>Voice 3</button>
      </div>
    </div>

      <Routes>
        {selectedVoice && (
          <Route path="/chat" element={<Chat selectedVoice={selectedVoice} />} />
        )}
      </Routes>

    </BrowserRouter>
  );
};

export default App;
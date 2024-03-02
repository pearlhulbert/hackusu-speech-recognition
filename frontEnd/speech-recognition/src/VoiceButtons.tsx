import React from 'react';

interface VoiceButtonsProps {
  setSelectedVoice: (voice: string) => void;
}

const VoiceButtons: React.FC<VoiceButtonsProps> = ({ setSelectedVoice }) => {
  const handleVoiceSelection = (voice: string) => {
    setSelectedVoice(voice);
  };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <p>Select a voice to start</p>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button style={{ fontSize: '24px', padding: '10px 20px' }} onClick={() => handleVoiceSelection('Voice 1')}>Voice 1</button>
                <button style={{ fontSize: '24px', padding: '10px 20px' }} onClick={() => handleVoiceSelection('Voice 2')}>Voice 2</button>
            </div>
        </div>
    );
};

export default VoiceButtons;

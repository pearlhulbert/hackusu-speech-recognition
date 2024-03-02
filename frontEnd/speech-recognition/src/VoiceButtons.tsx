import React from 'react';
import styles from './styles/Responses.module.css';
import styles1 from './styles/Header.module.css';

interface VoiceButtonsProps {
  setSelectedVoice: (voice: string) => void;
}

const VoiceButtons: React.FC<VoiceButtonsProps> = ({ setSelectedVoice }) => {
  const handleVoiceSelection = (voice: string) => {
    setSelectedVoice(voice);
  };

    return (
        <div style={{ padding: '20px' }}>
            <div className={styles1.mainView}>
                <div>
                  <h4>Select a voice to start</h4>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , height: '35vh'}}>
              <div style={ {display: 'flex', justifyContent: 'center', alignItems: 'center'} }>
              <button className = {styles.response} onClick={() => handleVoiceSelection('Voice 1')}>Voice 1</button>
                <button className = {styles.response} onClick={() => handleVoiceSelection('Voice 2')}>Voice 2</button>
              </div>
              </div>             
        </div>
    );
};

export default VoiceButtons;

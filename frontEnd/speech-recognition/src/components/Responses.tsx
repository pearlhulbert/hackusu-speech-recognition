import React, { useState } from 'react';
import styles from '../styles/Responses.module.css';

interface Props {
    message: string;
}

export function Responses({ message }: Props) {
    const [responses, setResponses] = useState<string[]>(["", "", ""]);

    const fetchResponses = async () => {
        if (message) {
            try {
                const response = await fetch('http://localhost:8000/generate-chat-response', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json() as string[];
                console.log(data)
                setResponses(data);
            } catch (error) {
                console.error('Error fetching responses:', error);
                setResponses(["Error fetching responses", "", ""]);
            }
        }
    };

    return (
        <div className={styles.responses}>
            <button onClick={fetchResponses} className={styles.fetchButton}>Get Responses</button>
            {responses.length > 0 && (
                <div className={styles.responsesList}>
                    {responses.map((response, index) => (
                        <button
                            className={styles.response}
                            key={index}
                            onClick={() => {
                                console.log("Response selected:", response);
                            }}
                            style={{
                                visibility: response === '' ? 'hidden' : 'visible',
                                pointerEvents: response === '' ? 'none' : 'auto',
                            }}>
                            {response}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

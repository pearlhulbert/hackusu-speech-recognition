from fastapi import FastAPI, WebSocket
from fastapi import FastAPI, HTTPException, Request
import requests
from SpeakerDiarizer import SpeakerDiarizer
from fastapi.middleware.cors import CORSMiddleware
from Transcriber import Transcriber
from pydub import AudioSegment
import whisper
import os
import dotenv

import re

dotenv.load_dotenv()

def parse_numbered_list(input_string):
    if not has_numerical_character(input_string):
        return [input_string]

    lines = input_string.strip().split('\n')
    items = []

    for line in lines:
        parts = line.split('. ', 1)
        if len(parts) == 2 and parts[0].isdigit():
            item_content = parts[1].strip()
            items.append(item_content)

    return items

def has_numerical_character(input_string):
    return bool(re.search(r'\d', input_string))


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("models loading")
diarizer = SpeakerDiarizer()
transcriber = Transcriber()
print("models loaded")

print("audio file loading")
audio_file = "Demo2.mp3"
audio = AudioSegment.from_mp3(audio_file)
print("audio file loaded")

diarization_result = diarizer.diarize_audio(audio_file)
print(diarization_result)

@app.post("/generate-chat-response")
async def generate_chat_response(request: Request):
    body = await request.json()
    user_message = body.get("message")
    print(user_message)

    prompt = f"Respond to the following message:\nmessage: {user_message} as if you were Taylor Swift having a conversation. Give 3 possible responses as a numbered list like so: 1. \n 2. \n 3. \n"

    try:
        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {os.getenv('OPENAI_API_KEY')}",
                "Content-Type": "application/json"
            },
            json={
                "model": "gpt-4-0125-preview",
                "messages": [{"role": "system", "content": prompt}],
            }
        )
        response.raise_for_status()
        response_json = response.json()
        generated_text = response_json['choices'][0]['message']['content']
        responses = parse_numbered_list(generated_text)
        print(responses)
        return responses
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))
    

# WebSocket endpoint
@app.websocket("/wst/{selected_voice}")
async def websocket_endpoint(websocket: WebSocket, selected_voice: str):
    await websocket.accept()

    speaker_voice = ""

    if selected_voice == "voice1":
        speaker_voice = "SPEAKER_00"
    elif selected_voice == "voice2":
        speaker_voice = "SPEAKER_01"

    print(speaker_voice)

    # Run diarization
    
    # Process each speaker segment
    for turn, _, speaker in diarization_result.itertracks(yield_label=True):
        if speaker == speaker_voice:
            start_time_ms = int(turn.start * 1000)
            end_time_ms = int(turn.end * 1000)

            # Extract the segment for the current speaker
            speaker_audio = audio[start_time_ms:end_time_ms]
            print("speaker audio ", speaker_audio)

            # Export the segment to a temporary file
            temp_audio_path = f"temp_speaker_{speaker}_{start_time_ms}_{end_time_ms}.wav"
            speaker_audio.export(temp_audio_path, format="wav")

            # Transcribe the audio segment
            transcript = transcriber.transcribe_audio(temp_audio_path)

            # Send the transcript back to the client
            await websocket.send_text(transcript)

            # Remove the temporary file
            os.remove(temp_audio_path)

    await websocket.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
  

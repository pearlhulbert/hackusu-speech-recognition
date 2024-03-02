from fastapi import FastAPI, WebSocket
from SpeakerDiarizer import SpeakerDiarizer
from Transcriber import Transcriber
from pydub import AudioSegment
import whisper
import os

app = FastAPI()

# Define your existing Transcriber and Diarizer classes here
# ...

# WebSocket endpoint
@app.websocket("/ws/{speaker_number}")
async def websocket_endpoint(websocket: WebSocket, speaker_number: int):
    await websocket.accept()

    audio_file = "Test2.mp3"
    diarizer = SpeakerDiarizer()
    transcriber = Transcriber()

    # Run diarization
    diarization_result = diarizer.diarize_audio(audio_file)

    # Load the audio file
    audio = AudioSegment.from_mp3(audio_file)

    # Process each speaker segment
    for turn, _, speaker in diarization_result.itertracks(yield_label=True):
        if speaker == speaker_number:
            start_time_ms = int(turn.start * 1000)
            end_time_ms = int(turn.end * 1000)

            # Extract the segment for the current speaker
            speaker_audio = audio[start_time_ms:end_time_ms]

            # Export the segment to a temporary file
            temp_audio_path = f"temp_speaker_{speaker}_{start_time_ms}_{end_time_ms}.wav"
            speaker_audio.export(temp_audio_path, format="wav")

            # Transcribe the audio segment
            transcript = transcriber.transcribe_audio(temp_audio_path)

            # Send the transcript back to the client
            await websocket.send_text(f"Speaker {speaker} ({turn.start:.2f} - {turn.end:.2f}): {transcript}")

            # Remove the temporary file
            os.remove(temp_audio_path)

    await websocket.close()

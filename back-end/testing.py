from pydub import AudioSegment
from SpeakerDiarizer import SpeakerDiarizer
from Transcriber import Transcriber
import os



# Create speaker diarizer and transcriber instances
diarizer = SpeakerDiarizer()
transcriber = Transcriber()

audio_file = "Demo2.mp3"
diarization_result = diarizer.diarize_audio(audio_file)

# Load the audio file
audio = AudioSegment.from_mp3(audio_file)
print(type(audio))

# Process speaker segments and transcribe using itertracks
# Process each speaker segment
for turn, _, speaker in diarization_result.itertracks(yield_label=True):
    start_time_ms = int(turn.start * 1000)
    end_time_ms = int(turn.end * 1000)

    # Extract the segment for the current speaker
    speaker_audio = audio[start_time_ms:end_time_ms]

    # Export the segment to a temporary file
    temp_audio_path = f"temp_speaker_{speaker}_{start_time_ms}_{end_time_ms}.wav"
    speaker_audio.export(temp_audio_path, format="wav")

    # Transcribe the audio segment
    transcript = transcriber.transcribe_audio(temp_audio_path)
    print(f"Speaker {speaker} ({turn.start:.2f} - {turn.end:.2f}): {transcript}")
    print("Transcript: ", transcript)

    # Remove the temporary file
    os.remove(temp_audio_path)


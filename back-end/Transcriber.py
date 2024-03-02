import whisper
from transformers import pipeline

class Transcriber:
    def __init__(self, model_name="base"):
        """
        Initializes the transcriber.

        Args:
            model_name (str, optional): Name of the Whisper model size. Can be "tiny", "base", "small", "medium", or "large". Defaults to "base".
        """
        self.model = whisper.load_model(model_name)

    def transcribe_audio(self, audio_path):
        """
        Transcribes a given audio file.

        Args:
            audio_path (str): Path to the audio file.

        Returns:
            str: The transcribed text.
        """
        result = self.model.transcribe(audio_path)
        return result["text"]
import pyannote.audio as pa

class SpeakerDiarizer:
    def __init__(self):
        """
        Initializes the speaker diarizer.

        Args:
            model_name (str, optional): Name of the speaker diarization model. Defaults to "pyannote/speaker-diarization".
            api_token (str, optional): Hugging Face API token if using a gated model. Defaults to None.
        """
       
        self.model = pa.Pipeline.from_pretrained(
        "pyannote/speaker-diarization-3.1",
        use_auth_token="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")

    def diarize_audio(self, audio_file):
        """
        Performs speaker diarization on an audio file.

        Args:
            audio_file (str): Path to the audio file.

        Returns:
            dict: Diarization output containing speaker segments and timestamps.
        """
        if self.model:
            return self.model(audio_file)
        else:
            raise ValueError("Speaker diarization model not initialized") 
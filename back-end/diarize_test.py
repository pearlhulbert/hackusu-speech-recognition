from pyannote.audio import Pipeline

# Initialize the pipeline
pipeline = Pipeline.from_pretrained(
  "pyannote/speaker-diarization-3.1",
  use_auth_token="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")

# Run the pipeline on an audio file
diarization = pipeline("Test2.mp3")

# Dump the diarization output to disk using RTTM format
with open("audio.rttm", "w") as rttm:
    diarization.write_rttm(rttm)

# Read and print the contents of the RTTM file
with open("audio.rttm", "r") as rttm_file:
    for line in rttm_file:
        print(line.strip())
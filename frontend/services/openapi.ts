import axios from "axios";

export const transcribeAudio = async (blob: Blob) => {
  const bodyform = new FormData();

  bodyform.append("model", "whisper-1");
  bodyform.append("file", blob, "input.webm");

  const { data } = await axios.post(
    "https://api.openai.com/v1/audio/transcriptions",
    bodyform,
    {
      headers: {
        Authorization:
          "Bearer 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",
      },
    }
  );

  return data.text;
};

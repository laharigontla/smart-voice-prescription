import { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function AssistantVoice({
  listening,
  setListening,
  onCommand,
}) {
  const {
    finalTranscript,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();

  useEffect(() => {
    if (finalTranscript) {
      onCommand(finalTranscript);

      resetTranscript();

      setListening(false);
    }
  }, [
    finalTranscript,
    onCommand,
    resetTranscript,
    setListening,
  ]);

  if (!browserSupportsSpeechRecognition) return null;

  const startListening = () => {
    console.log("🎤 Start listening");
    resetTranscript();

    setListening(true);

    SpeechRecognition.startListening({
      continuous: false,
      language: "en-IN",
    });
  };

  const stopListening = () => {
  SpeechRecognition.stopListening();
  setListening(false);
  resetTranscript();
};

  return (
    <button
      className="mic-btn"
      onClick={() => {
        if (listening) {
          stopListening();
        } else {
          startListening();
        }
      }}
    >
      {listening ? "🔴" : "🎤"}
    </button>
  );
}

export default AssistantVoice;
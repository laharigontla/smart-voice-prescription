import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect } from "react";

function FieldVoiceButton({
  field,
  activeField,
  setActiveField,
  onResult,
}) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (
      activeField === field &&
      !listening &&
      transcript.trim()
    ) {
      onResult(transcript.trim());
      resetTranscript();
      setActiveField(null);
    }
  }, [
    listening,
    transcript,
    activeField,
    field,
    onResult,
    resetTranscript,
    setActiveField,
  ]);

  if (!browserSupportsSpeechRecognition) return null;

  const startListening = () => {
    setActiveField(field);
    resetTranscript();

    SpeechRecognition.startListening({
      continuous: false,
      language: "en-IN",
    });
  };

  return (
    <button
      className="field-mic"
      onClick={startListening}
      type="button"
    >
      {activeField === field && listening ? "🔴" : "🎤"}
    </button>
  );
}

export default FieldVoiceButton;
import { useEffect, useState } from "react";
import { parseVoiceCommand } from "../utils/parser";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { parseMedicineCommand } from "../utils/medicineParser";
import "../styles/patient.css";

function VoiceButton({ prescription, setPrescription }) {
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();

  const [finalTranscript, setFinalTranscript] = useState("");

  // When recognition automatically stops, save transcript
  useEffect(() => {
    if (!listening && transcript.trim()) {
      setFinalTranscript(transcript);

      setTimeout(() => {
        resetTranscript();
      }, 300);
    }
  }, [listening, transcript, resetTranscript]);

  // Parse voice command
  useEffect(() => {
    if (!finalTranscript) return;

    const result = parseVoiceCommand(finalTranscript);

    if (result) {
      setPrescription((prev) => ({
        ...prev,
        [result.field]: result.value,
      }));
      return;
    }

    const medicine = parseMedicineCommand(finalTranscript);

    if (medicine) {
      setPrescription((prev) => ({
        ...prev,
        medicines: [...prev.medicines, medicine],
      }));
    }
  }, [finalTranscript, setPrescription]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const startRecording = () => {
    resetTranscript();
    setFinalTranscript("");

    SpeechRecognition.startListening({
      continuous: false,      // <-- Changed
      interimResults: true,
      language: "en-IN",
    });
  };

  return (
    <div>
      <h2 className="section-title">🎤 AI Voice Assistant</h2>

      <div className="voice-controls">
        <button
          className="voice-btn"
          onClick={startRecording}
          disabled={listening}
        >
          {listening ? "🎤 Listening..." : "🎤 Start Recording"}
        </button>
      </div>

      <h4>Recognized Speech</h4>

      <div className="speech-box">
        {transcript || finalTranscript || "Speak something..."}
      </div>
    </div>
  );
}

export default VoiceButton;
import { useState } from "react";
import SpeechRecognition from "react-speech-recognition";
import "./SmartAssistant.css";
import AssistantVoice from "./AssistantVoice";

function SmartAssistant({
  handleSave,
  handlePrint,
  clearPrescription,
  setShowHistory,
  prescription,
  setPrescription,
}) {
  const [open, setOpen] = useState(false);
  const [command, setCommand] = useState("");
  const [messages, setMessages] = useState([
  {
    sender: "assistant",
    text: "👋 Hello Doctor! How can I help you today?",
  },
]);
const [listening, setListening] = useState(false);

const executeCommand = (inputCommand = command) => {
  if (!inputCommand.trim()) return;

  const text = inputCommand.toLowerCase().trim();

  let reply = "❓ Sorry, I don't understand that command yet.";

  // Save
  if (text.includes("save")) {
    handleSave();
    reply = "✅ Prescription saved successfully.";
  }

  // Print
  else if (text.includes("print")) {
    handlePrint();
    reply = "🖨 Printing prescription...";
  }

  // History
  else if (text.includes("history")) {
    setShowHistory(true);
    reply = "📜 Opening history...";
  }

  else if (text.startsWith("add ")) {

  const medicineName = inputCommand.substring(4).trim();

  // Check for duplicate
  const exists = prescription.medicines.some(
    (m) =>
      m.medicine.toLowerCase() ===
      medicineName.toLowerCase()
  );

  if (exists) {

    reply = `💊 ${medicineName} is already in the prescription.`;

  } else {

    setPrescription((prev) => ({
      ...prev,
      medicines: [
        ...prev.medicines,
        {
          medicine: medicineName,
          foodTiming: "After Lunch",
          morning: "",
          afternoon: "",
          evening: "",
          night: "",
          morningChecked: false,
          afternoonChecked: false,
          eveningChecked: false,
          nightChecked: false,
          days: "",
        },
      ],
    }));

    reply = `💊 ${medicineName} added successfully.`;
  }
}

  // New
  else if (
    text.includes("new") ||
    text.includes("clear")
  ) {
    clearPrescription();
    reply = "🆕 Ready for a new prescription.";
  }

  setMessages((prev) => [
    ...prev,
    {
      sender: "user",
      text: inputCommand,
    },
    {
      sender: "assistant",
      text: reply,
    },
  ]);

  setCommand("");
};

  return (
    <>
      {/* Floating Button */}
      <button
  className="assistant-fab"
  onClick={() => {
  if (open) {
    setListening(false);

    setMessages([
      {
        sender: "assistant",
        text: "👋 Hello Doctor! How can I help you today?",
      },
    ]);

    setCommand("");
  }

  setOpen(!open);
}}
>
        🤖
      </button>

      {/* Assistant Window */}
      {open && (
        <div className="assistant-window">

          {/* Header */}
          <div className="assistant-header">

            <div>

              <h2>🤖 Assistant</h2>

              <p>Your AI Clinical Assistant</p>

            </div>

            <button
  className="assistant-close"
  onClick={() => {
    setListening(false);
    setOpen(false);

    setMessages([
      {
        sender: "assistant",
        text: "👋 Hello Doctor! How can I help you today?",
      },
    ]);

    setCommand("");
  }}
>
  ✕
</button>

          </div>

          {/* Conversation */}

          <div className="assistant-chat">

  {listening && (
    <div className="assistant-message">
      🎤 Listening...
    </div>
  )}

  {messages.map((msg, index) => (

    <div
      key={index}
      className={
        msg.sender === "assistant"
          ? "assistant-message"
          : "user-message"
      }
    >
      {msg.text}
    </div>

  ))}

</div>

          {/* Input */}

          <div className="assistant-input-area">

            <input
  type="text"
  placeholder="Type a command..."
  value={command}
  onChange={(e) => setCommand(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      executeCommand();
    }
  }}
/>

            <AssistantVoice
  listening={listening}
  setListening={setListening}
  onCommand={executeCommand}
/>

          </div>

          {/* Quick Actions */}

          <h4 className="quick-title">
            ⚡ Quick Actions
          </h4>

          <div className="quick-grid">

            <button onClick={() => executeCommand("save")}>
  💾 Save
</button>

<button onClick={() => executeCommand("print")}>
  🖨 Print
</button>

<button onClick={() => executeCommand("history")}>
  📜 History
</button>

<button onClick={() => executeCommand("new")}>
  🆕 New
</button>

          </div>

          {/* Suggestions */}

          <div className="assistant-footer">

            <p>Suggestions</p>

            <div className="suggestion-list">

              <span>Add Crocin</span>

              <span>Print Prescription</span>

              <span>Open History</span>

              <span>Save Prescription</span>

            </div>

          </div>

        </div>
      )}
    </>
  );
}

export default SmartAssistant;
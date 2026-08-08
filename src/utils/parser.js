export function parseVoiceCommand(transcript) {
  const text = transcript.toLowerCase().trim();

  const commands = [
  { prefix: "patient name", field: "patientName" },
  { prefix: "name", field: "patientName" },

  { prefix: "age", field: "age" },

  { prefix: "gender", field: "gender" },

  { prefix: "blood group", field: "bloodGroup" },
  { prefix: "blood", field: "bloodGroup" },

  { prefix: "weight", field: "weight" },
  { prefix: "wait", field: "weight" },

  { prefix: "bp", field: "bp" },
  { prefix: "blood pressure", field: "bp" },

  { prefix: "pfr a", field: "pfrA" },
  { prefix: "pfr b", field: "pfrB" },

  { prefix: "diagnosis", field: "diagnosis" },
  { prefix: "advice", field: "advice" },

  { prefix: "height", field: "height" },
  { prefix: "pulse", field: "pulse" },
  { prefix: "spo2", field: "spo2" },
  { prefix: "spo two", field: "spo2" },
  { prefix: "oxygen saturation", field: "spo2" },
];

  for (const command of commands) {
    if (text.startsWith(command.prefix)) {
      let value = transcript
        .substring(command.prefix.length)
        .trim()
        .toLowerCase();

    if (command.field === "bloodGroup") {
      const bloodGroups = {
        "o positive": "o+",
        "o negative": "o-",
        "a positive": "a+",
        "a negative": "a-",
        "b positive": "b+",
        "b negative": "b-",
        "ab positive": "ab+",
        "ab negative": "ab-",
    };

    value = bloodGroups[value] || value;
  }

  return {
    field: command.field,
    value,
  };
    }
  }

  return null;
}
"use client";

import { useState } from "react";
import ChatSubmit from "./ChatSubmit";
import ModelSelector from "./ModelSelector";

export default function NewChat() {
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState("llama3.2");

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setInput(e.target.value);
  }

  return (
    <main className="h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <ModelSelector
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />
        <ChatSubmit
          input={input}
          isNewChat
          handleInputChange={handleInputChange}
          selectedModel={selectedModel}
        />
      </div>
    </main>
  );
}

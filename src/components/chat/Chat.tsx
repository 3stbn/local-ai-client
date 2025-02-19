"use client";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { Message as MessageType } from "ai";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import ChatSubmit from "./ChatSubmit";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Message from "./Message";
import ModelSelector from "./ModelSelector";

interface ChatProps {
  initialMessages?: MessageType[];
  conversationId: string;
}

export default function Chat({
  initialMessages = [],
  conversationId,
}: ChatProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [selectedModel, setSelectedModel] = useState(() => {
    return searchParams.get("model") || "llama3.2";
  });

  const {
    messages,
    handleSubmit,
    input,
    handleInputChange,
    append,
    isLoading,
  } = useChat({
    body: {
      model: selectedModel,
      conversationId: conversationId,
    },
    initialMessages: initialMessages,
  });

  const { messagesEndRef, handleScroll } = useAutoScroll({
    dependencies: messages,
  });

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      append({
        content: q,
        role: "user",
      });

      // Remove the q parameter from URL
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("q");
      router.replace(
        `${pathname}${newParams.toString() ? `?${newParams.toString()}` : ""}`
      );
    }
  }, [searchParams, append, router, pathname]);

  return (
    <main className="bg-muted w-full h-screen">
      <div className="container h-full w-full flex flex-col p-8">
        <ModelSelector
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />
        <div className="flex-1 overflow-y-auto" onScroll={handleScroll}>
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <ChatSubmit
          handleInputChange={handleInputChange}
          isStreaming={isLoading}
          input={input}
          handleSubmit={handleSubmit}
          selectedModel={selectedModel}
        />
      </div>
    </main>
  );
}

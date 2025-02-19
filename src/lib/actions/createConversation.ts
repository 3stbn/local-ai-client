"use server";

import { insertConversation } from "@/lib/db/conversations";
import { generateText } from "ai";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { ollama } from "../ollama/client";

async function generateConversationName(userMessage: string) {
  // we need a fast model for this
  const model = "llama3.2";
  const nameResult = await generateText({
    model: ollama(model),
    prompt: `You are an assistant that interacts with a ai chat applications, your job is to assign a short title/name to conversations, based on the user question
     The title should be in from perspective of the user asking the question, return only the title, in plain text without ""
     User Question : ${userMessage}
    `,
  });
  return nameResult.text;
}

export async function createConversation(message: string, model: string) {
  const conversationId = randomUUID();
  const conversationName = await generateConversationName(message);

  insertConversation({
    id: conversationId,
    name: conversationName,
  });

  redirect(`/conversations/${conversationId}?q=${message}&model=${model}`);
}

export interface InsertConversationData {
  id: string;
  name?: string;
}
export interface Message {
  id: string;
  content: string;
  createdAt: string;
  conversationId: string;
  role: "assistant" | "user";
}
export interface MessageData {
  id: string;
  content: string;
  conversationId: string;
  role: string;
}

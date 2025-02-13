import { db } from "./init";
import { InsertConversationData } from "./types";

export function insertConversation(conversationData: InsertConversationData) {
  const stmt = db.prepare("INSERT INTO conversations (id, name) VALUES (?, ?)");
  return stmt.run(conversationData.id, conversationData.name ?? "");
}

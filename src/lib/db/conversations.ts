import { db } from "./init";
import { Conversation, InsertConversationData, Message } from "./types";

export function insertConversation(conversationData: InsertConversationData) {
  const stmt = db.prepare("INSERT INTO conversations (id, name) VALUES (?, ?)");
  return stmt.run(conversationData.id, conversationData.name ?? "");
}

export function getConversationMessages(conversationId: string) {
  const stmt = db.prepare(
    `SELECT 
      m.*
    FROM conversations as c
    JOIN messages as m on m.conversationId = c.id
    WHERE c.id = ? 
    ORDER BY m.createdAt ASC`
  );
  return stmt.all(conversationId) as Message[];
}

export function getAllConversations() {
  const stmt = db.prepare(
    "SELECT * FROM conversations ORDER BY createdAt DESC"
  );
  return stmt.all() as Conversation[];
}

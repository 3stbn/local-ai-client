import { db } from "./init";

const createTables = `
      CREATE TABLE IF NOT EXISTS conversations (
        id TEXT NOT NULL PRIMARY KEY,
        name TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT NOT NULL PRIMARY KEY,
        conversationId TEXT NOT NULL,
        content TEXT NOT NULL,
        role TEXT DEFAULT 'assistant',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (conversationId) REFERENCES conversations(id) ON DELETE CASCADE
      );
    `;

async function up() {
  try {
    db.exec(createTables);
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

up();

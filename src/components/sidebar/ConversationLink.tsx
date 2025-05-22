"use client";
import type { Conversation } from "@/lib/db/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Pencil, Trash } from "lucide-react";
import { deleteConversation } from "@/lib/actions/deleteConversation";
import { renameConversation } from "@/lib/actions/renameConversation";
import { useState, useRef, useEffect } from "react";

interface ConversationLinkProps {
  conversation: Conversation;
}

export default function ConversationLink({
  conversation,
}: ConversationLinkProps) {
  const { conversationId } = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(conversation.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await deleteConversation(conversation.id);
    if (conversationId === conversation.id) {
      router.push("/");
    }
    router.refresh();
  };

  const handleRename = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() !== "" && name !== conversation.name) {
      await renameConversation(conversation.id, name);
      router.refresh();
    }
    setIsEditing(false);
  };

  const startEditing = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
  };

  return (
    <div className="group relative flex items-center">
      {isEditing ? (
        <form onSubmit={handleRename} className="flex-1">
          <input
            ref={inputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleRename}
            className="w-full text-sm p-2 rounded-sm bg-slate-100 border border-slate-300"
            autoFocus
          />
        </form>
      ) : (
        <Link
          key={conversation.id}
          className={cn(
            "truncate text-sm text-slate-500 p-2 rounded-sm flex-1",
            conversationId === conversation.id && "bg-slate-200"
          )}
          href={`/conversations/${conversation.id}`}
        >
          {conversation.name}
        </Link>
      )}
      <div className="flex">
        <button
          onClick={startEditing}
          className="invisible group-hover:visible p-2 text-slate-400 hover:text-blue-600"
          aria-label="Rename conversation"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={handleDelete}
          className="invisible group-hover:visible p-2 text-slate-400 hover:text-red-600"
          aria-label="Delete conversation"
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
}

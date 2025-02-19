"use client";
import type { Conversation } from "@/lib/db/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ConversationLinkProps {
  conversation: Conversation;
}

export default function ConversationLink({
  conversation,
}: ConversationLinkProps) {
  const { conversationId } = useParams();

  return (
    <Link
      key={conversation.id}
      className={cn(
        "truncate text-sm text-slate-500 p-2 rounded-sm",
        conversationId === conversation.id && "bg-slate-200"
      )}
      href={`/conversations/${conversation.id}`}
    >
      {conversation.name}
    </Link>
  );
}

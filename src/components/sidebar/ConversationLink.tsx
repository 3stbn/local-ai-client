"use client";
import type { Conversation } from "@/lib/db/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import { deleteConversation } from "@/lib/actions/deleteConversation";

interface ConversationLinkProps {
  conversation: Conversation;
}

export default function ConversationLink({
  conversation,
}: ConversationLinkProps) {
  const { conversationId } = useParams();
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await deleteConversation(conversation.id);
    if (conversationId === conversation.id) {
      router.push("/");
    }
    router.refresh();
  };

  return (
    <div className="group relative flex items-center">
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
      <button
        onClick={handleDelete}
        className="invisible group-hover:visible p-2 text-slate-400 hover:text-red-600"
        aria-label="Delete conversation"
      >
        <Trash size={16} />
      </button>
    </div>
  );
}

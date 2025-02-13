import NewChatButton from "./NewChatButton";

export default function Sidebar() {
  return (
    <aside className="w-[300px] p-4 flex flex-col gap-2 border-r">
      <div className="flex-shrink-0 mb-4">
        <NewChatButton />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-2">
          {/* Conversation links will go here */}
        </div>
      </div>
    </aside>
  );
}

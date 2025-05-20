import { Suspense } from "react";
import NewChat from "@/components/chat/NewChat";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <NewChat />
    </Suspense>
  );
}

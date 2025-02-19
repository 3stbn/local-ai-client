import { useRef, useState, useEffect } from "react";

interface UseAutoScrollProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependencies?: any[];
}

export function useAutoScroll({ dependencies = [] }: UseAutoScrollProps = {}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const scrollToBottom = () => {
    if (autoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isScrolledToBottom =
      Math.abs(scrollHeight - clientHeight - scrollTop) < 30;
    setAutoScroll(isScrolledToBottom);
  };

  useEffect(() => {
    scrollToBottom();
  }, [dependencies]);

  return {
    messagesEndRef,
    handleScroll,
    scrollToBottom,
  };
}

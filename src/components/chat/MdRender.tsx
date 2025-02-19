import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose max-w-full">
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;

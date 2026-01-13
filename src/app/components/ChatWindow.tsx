import { useEffect, useRef } from "react";
import { ChatMessage, ChatMessageData } from "./ChatMessage";
import { LoadingMessage } from "./LoadingMessage";

interface ChatWindowProps {
  messages: ChatMessageData[];
  onRegenerate?: (messageId: string) => void;
  isLoading?: boolean;
  onOpenTerms?: () => void;
  onShare?: () => void;
  isGuestUser?: boolean;
  onUpgradeClick?: () => void;
}

export function ChatWindow({ messages, onRegenerate, isLoading, onOpenTerms, onShare, isGuestUser = false, onUpgradeClick }: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevMessageCountRef = useRef(messages.length);

  useEffect(() => {
    // Only scroll when a new message is added
    if (messages.length > prevMessageCountRef.current && containerRef.current) {
      // Scroll to show the user's question (second-to-last message if last is AI response)
      setTimeout(() => {
        const messageElements = containerRef.current?.querySelectorAll('[data-message]');
        if (messageElements && messageElements.length > 0) {
          // If there are at least 2 messages and the last one is from assistant,
          // scroll to the second-to-last (the user's question)
          const lastMessage = messages[messages.length - 1];
          if (messages.length >= 2 && lastMessage.role === 'assistant') {
            const userQuestionElement = messageElements[messageElements.length - 2];
            if (userQuestionElement) {
              userQuestionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          } else {
            // Otherwise just scroll to the last message
            const lastElement = messageElements[messageElements.length - 1];
            lastElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 100);
    }
    prevMessageCountRef.current = messages.length;
  }, [messages]);

  return (
    <div className="flex-1 overflow-hidden">
      <div ref={containerRef} className="h-full overflow-y-auto scroll-smooth">
        <div className="max-w-3xl mx-auto px-6 py-8 pb-32">
          {messages.map((message, index) => {
            // Check if this is the first assistant message in the conversation
            const assistantMessages = messages.filter(m => m.role === "assistant");
            const isFirstAssistantMessage = message.role === "assistant" && 
              assistantMessages.length > 0 && 
              assistantMessages[0].id === message.id;
            
            return (
              <ChatMessage
                key={message.id}
                message={message}
                onRegenerate={
                  onRegenerate
                    ? () => onRegenerate(message.id)
                    : undefined
                }
                isFirstMessage={isFirstAssistantMessage}
                onOpenTerms={onOpenTerms}
                onShare={onShare}
                isGuestUser={isGuestUser}
                onUpgradeClick={onUpgradeClick}
              />
            );
          })}
          {isLoading && <LoadingMessage />}
        </div>
      </div>
    </div>
  );
}
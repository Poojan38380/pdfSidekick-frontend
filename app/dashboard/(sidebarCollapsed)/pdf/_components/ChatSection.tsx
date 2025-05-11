import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useChatSocket, Message } from "@/app/hooks/use-chat-socket";
import { useSession } from "next-auth/react";
import { CustomUser } from "@/lib/auth";
import { Panel, PanelResizeHandle } from "react-resizable-panels";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
const ChatSection = ({
  pdfId,
  isMobile,
}: {
  pdfId: string;
  isMobile: boolean;
}) => {
  const [message, setMessage] = useState("");
  const { messages, status, error, connect, sendMessage } = useChatSocket({
    pdfId,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const user = session?.user as CustomUser | undefined;
  const inputRef = useRef<HTMLInputElement>(null);

  // Connect to WebSocket when component mounts
  useEffect(() => {
    connect();
  }, [connect]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input after sending message
  useEffect(() => {
    if (status === "connected") {
      inputRef.current?.focus();
    }
  }, [status, messages.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const success = sendMessage(message);
      if (success) {
        setMessage("");
      }
    }
  };

  return (
    <>
      {/* Resize Handle */}
      <PanelResizeHandle
        className={`${
          isMobile
            ? "h-max rounded-t-2xl "
            : "h-full w-3 rounded-l-2xl ml-[-15px]"
        } bg-border hover:bg-primary/20 hover:opacity-100 transition-colors  `}
      >
        {isMobile && (
          <ChatHeader status={status} error={error} isMobile={isMobile} />
        )}
      </PanelResizeHandle>
      <Panel defaultSize={70} minSize={40} maxSize={100}>
        <Card className="h-[100%] py-0 rounded-none border-0 gap-0 flex flex-col bg-background/80 backdrop-blur-sm">
          {/* Header */}

          {!isMobile && <ChatHeader status={status} error={error} />}

          {/* Chat Messages Area */}
          <ScrollArea className="flex-1 p-4 py-2 flex flex-col ">
            <div className="space-y-0 flex flex-col justify-end min-h-full">
              <MessageBubble
                msg={{
                  id: "1",
                  content: "Welcome! Ask me questions about your PDF document.",
                  sender: "assistant",
                  timestamp: new Date().toISOString(),
                }}
                user={user}
              />
              {messages.map((msg: Message) => (
                <MessageBubble key={msg.id} msg={msg} user={user} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Chat Input */}
          <div className="p-3 border-t bg-background">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                ref={inputRef}
                placeholder="Ask about your PDF..."
                className="flex-1 border-muted-foreground/20 focus-visible:ring-primary/50"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={status !== "connected"}
              />
              <Button
                type="submit"
                size="icon"
                disabled={status !== "connected" || !message.trim()}
                className="transition-all duration-200 hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </Panel>
    </>
  );
};

export default ChatSection;

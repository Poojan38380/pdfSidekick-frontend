import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useChatSocket, Message } from "@/app/hooks/use-chat-socket";
import { format } from "date-fns";

const ChatSection = ({ pdfId }: { pdfId: string }) => {
  const [message, setMessage] = useState("");
  const { messages, status, error, connect, sendMessage } = useChatSocket({
    pdfId,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Connect to WebSocket when component mounts
  useEffect(() => {
    connect();
  }, [connect]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const success = sendMessage(message);
      if (success) {
        setMessage("");
      }
    }
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      return format(new Date(timestamp), "HH:mm");
    } catch {
      return "";
    }
  };

  return (
    <Card className="h-[100%] rounded-none border-0">
      <div className="flex flex-col h-full">
        {/* Connection Status */}
        {status !== "connected" && (
          <div className="px-4 py-2 bg-muted text-center text-sm">
            {status === "connecting"
              ? "Connecting to chat..."
              : "Disconnected from chat"}
            {error && <p className="text-destructive text-xs mt-1">{error}</p>}
          </div>
        )}

        {/* Chat Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm">
                Welcome! Ask questions about the PDF document.
              </p>
            </div>

            {/* Render Messages */}
            {messages.map((msg: Message) => (
              <div
                key={msg.id}
                className={`p-3 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground ml-auto"
                    : "bg-muted"
                } max-w-[80%] ${msg.sender === "user" ? "ml-auto" : "mr-auto"}`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className="text-xs mt-1 opacity-70 text-right">
                  {formatTimestamp(msg.timestamp)}
                </p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Chat Input */}
        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              placeholder="Ask a question about the PDF..."
              className="flex-1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={status !== "connected"}
            />
            <Button
              type="submit"
              size="icon"
              disabled={status !== "connected" || !message.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </Card>
  );
};

export default ChatSection;

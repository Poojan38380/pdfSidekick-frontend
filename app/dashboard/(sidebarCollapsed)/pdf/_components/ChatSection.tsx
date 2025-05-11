import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useChatSocket, Message } from "@/app/hooks/use-chat-socket";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { CustomUser } from "@/lib/auth";
import { Panel, PanelResizeHandle } from "react-resizable-panels";
import ChatHeader from "./ChatHeader";
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

  const formatTimestamp = (timestamp: string) => {
    try {
      return format(new Date(timestamp), "HH:mm");
    } catch {
      return "";
    }
  };

  return (
    <>
      {/* Resize Handle */}
      <PanelResizeHandle
        className={`${
          isMobile
            ? "h-max rounded-t-2xl mt-[-10px]"
            : "h-full w-3 rounded-l-2xl ml-[-17px]"
        } bg-border hover:bg-primary/20 hover:opacity-100 transition-colors  `}
      >
        {isMobile && <ChatHeader status={status} error={error} />}
      </PanelResizeHandle>
      <Panel defaultSize={60} minSize={40} maxSize={100}>
        <Card className="h-[100%] py-0 rounded-none border-0 gap-0 flex flex-col bg-background/80 backdrop-blur-sm">
          {/* Header */}

          {!isMobile && <ChatHeader status={status} error={error} />}

          {/* Chat Messages Area */}
          <ScrollArea className="flex-1 p-4 py-0 flex flex-col">
            <div className="space-y-0 flex flex-col justify-end min-h-full">
              <div className="bg-muted/60 p-3 py-1 rounded-lg max-w-[75%]">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="relative h-5 w-5">
                    <Image
                      src="/logo-1000x1000.png"
                      alt="PDF Sidekick"
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <p className="text-xs font-medium">PDF Sidekick</p>
                </div>
                <p className="text-sm">
                  Welcome! Ask me questions about your PDF document.
                </p>
              </div>

              {/* Render Messages */}
              {messages.map((msg: Message) => (
                <div
                  key={msg.id}
                  className={`${
                    msg.sender === "user" ? "ml-auto" : "mr-auto"
                  } max-w-[75%]`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    {msg.sender === "user" ? (
                      <Avatar className="h-5 w-5 rounded-md">
                        <AvatarImage src={user?.profilePic} alt="You" />
                        <AvatarFallback className="rounded-md bg-primary/10 text-xs">
                          {user?.username?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="relative h-5 w-5">
                        <Image
                          src="/logo-1000x1000.png"
                          alt="PDF Sidekick"
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    )}
                    {msg.sender !== "user" && (
                      <p className="text-xs font-medium">PDF Sidekick</p>
                    )}
                  </div>

                  <div
                    className={`p-2.5 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/60"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    <p className="text-xs mt-0.5 opacity-70 text-right">
                      {formatTimestamp(msg.timestamp)}
                    </p>
                  </div>
                </div>
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

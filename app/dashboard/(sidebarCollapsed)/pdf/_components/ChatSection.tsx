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

  const handleRefreshConnection = () => {
    connect();
  };

  return (
    <>
      {/* Resize Handle */}
      <PanelResizeHandle
        className={`${
          isMobile
            ? "h-max rounded-t-2xl mt-[-10px]"
            : "h-full w-3 rounded-l-2xl ml-[-15px]"
        } bg-border hover:bg-primary/20  transition-colors  `}
      >
        {isMobile && (
          <ChatHeader
            status={status}
            error={error}
            isMobile={isMobile}
            onRefresh={handleRefreshConnection}
          />
        )}
      </PanelResizeHandle>
      <Panel defaultSize={70} minSize={40} maxSize={100}>
        <Card className="h-[100%] py-0 rounded-none border-0 gap-0 flex flex-col bg-background/80 backdrop-blur-sm">
          {/* Header */}

          {!isMobile && (
            <ChatHeader
              status={status}
              error={error}
              onRefresh={handleRefreshConnection}
            />
          )}

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
              {/* Example message with thinking section */}
              <MessageBubble
                msg={{
                  id: "example",
                  content:
                    "<think>Okay, let me check the user's question first. They asked for information about \"React\" based on the provided PDF context.\n\nLooking at the context, there's a section under Poojan's technical skills where React.js is listed. The context mentions \"React.js\" and \"Next.js 15, React 19\" in the tech stack for the Inventory Management System project.\n\nWait, React 19? That might be a typo since React's current version is much lower, maybe it's a placeholder or a mistake. But the user's question is about React, so the key points here are that Poojan has experience with React.js, and in the project, he used React 19. Also, under his skills, he lists React.js along with other frontend frameworks like Next.js.\n\nI should make sure to mention his expertise with React.js and note the React 19 in the project. Since the answer needs to be based solely on the context, I shouldn't add any external knowledge. Also, the user wants direct and concise answers, so just present the info without fluff.\n\nSo the answer should state that Poojan has expertise with React.js and is using React 19 in his current project. Make sure to mention it's part of his technical skills and the project's tech stack.</think>\n\nPoojan has expertise in **React.js** as part of his frontend development skills. In his current project (***Inventory Management System***), he is using **React 19** as part of the tech stack.",
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

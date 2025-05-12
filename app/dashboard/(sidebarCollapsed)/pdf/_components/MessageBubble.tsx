import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from "@/app/hooks/use-chat-socket";
import { CustomUser } from "@/lib/auth";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { BrainCircuit } from "lucide-react";

interface MessageBubbleProps {
  msg: Message & { thinking?: string };
  user?: CustomUser;
}

const MessageBubble = ({ msg, user }: MessageBubbleProps) => {
  const isUserMessage = msg.sender === "user";
  const [open, setOpen] = useState(false);

  // Function to extract thinking and content sections
  const parseContent = () => {
    if (!msg.content || !msg.content.includes("<think>")) {
      return { thinking: null, content: msg.content };
    }

    const thinkMatch = msg.content.match(/<think>([\s\S]*?)<\/think>/);
    const thinking = thinkMatch ? thinkMatch[1].trim() : null;
    const content = msg.content.replace(/<think>[\s\S]*?<\/think>/, "").trim();

    return { thinking, content };
  };

  const { thinking, content } = parseContent();

  return (
    <div
      key={msg.id}
      className={`flex items-start gap-2 mb-2 ${
        isUserMessage ? "justify-end" : "justify-start"
      }`}
    >
      {!isUserMessage && (
        <div className="relative h-6 w-6 flex-shrink-0 mt-1">
          <Image
            src="/logo-1000x1000.png"
            alt="PDF Sidekick"
            fill
            className="object-cover rounded-md"
          />
        </div>
      )}

      <div className="flex flex-col max-w-[75%]">
        <div
          className={`p-2 rounded-lg ${
            isUserMessage ? "bg-primary text-primary-foreground" : "bg-muted"
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{content}</p>

          {thinking && !isUserMessage && (
            <Collapsible open={open} onOpenChange={setOpen} className="mt-2">
              <div className="flex items-center gap-2">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs px-2 gap-1"
                  >
                    <BrainCircuit className="h-3 w-3" />
                    {open ? "Hide thinking" : "Show thinking"}
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="mt-2 px-2 py-1 border-l-2 border-primary/20 text-xs whitespace-pre-wrap bg-background/80 rounded text-muted-foreground">
                {thinking}
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      </div>

      {isUserMessage && (
        <Avatar className="h-7 w-7 flex-shrink-0 mt-1">
          <AvatarImage src={user?.profilePic} alt="You" />
          <AvatarFallback className="rounded-md bg-primary/10 text-xs">
            {user?.username?.[0]?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default MessageBubble;

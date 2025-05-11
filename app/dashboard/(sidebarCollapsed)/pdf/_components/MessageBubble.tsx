import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from "@/app/hooks/use-chat-socket";
import { CustomUser } from "@/lib/auth";
import Image from "next/image";

const MessageBubble = ({ msg, user }: { msg: Message; user?: CustomUser }) => {
  const isUserMessage = msg.sender === "user";

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
          <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
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

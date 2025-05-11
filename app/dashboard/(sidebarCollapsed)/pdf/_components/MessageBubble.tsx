import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from "@/app/hooks/use-chat-socket";
import { CustomUser } from "@/lib/auth";
import { format } from "date-fns";
import Image from "next/image";

const MessageBubble = ({ msg, user }: { msg: Message; user?: CustomUser }) => {
  const formatTimestamp = (timestamp: string) => {
    try {
      return format(new Date(timestamp), "HH:mm");
    } catch {
      return "";
    }
  };
  return (
    <div
      key={msg.id}
      className={`${msg.sender === "user" ? "ml-auto" : "mr-auto"} max-w-[75%]`}
    >
      <div className={`${msg.sender === "user"}flex items-center gap-1.5 mb-1`}>
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
        className={`p-2.5 min-w-50 rounded-lg ${
          msg.sender === "user"
            ? "bg-primary text-primary-foreground text-right"
            : "bg-muted/60"
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
        <p className="text-xs mt-0.5 opacity-70 text-right">
          {formatTimestamp(msg.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;

import React from "react";
import Image from "next/image";
import { Loader2, MoveVertical, XCircle } from "lucide-react";

interface ChatHeaderProps {
  status: "connected" | "connecting" | "disconnected";
  error: string | null;
  isMobile?: boolean;
}
const ChatHeader = ({ status, error, isMobile }: ChatHeaderProps) => {
  return (
    <div className="border-b p-3 rounded-2xl flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="relative h-8 w-8">
          <Image
            src="/logo-1000x1000.png"
            alt="PDF Sidekick"
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div>
          <h3 className="font-semibold text-sm">PDF Sidekick</h3>
          <div className="flex items-center text-xs text-muted-foreground gap-1.5">
            {status === "connected" ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                Connected
              </>
            ) : status === "connecting" ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <XCircle className="h-3 w-3 text-destructive" />
                Disconnected
                {error && (
                  <p className="text-destructive text-xs ml-1">({error})</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {isMobile && (
        <MoveVertical className="text-xs stroke-[1.5] text-muted-foreground" />
      )}
    </div>
  );
};

export default ChatHeader;

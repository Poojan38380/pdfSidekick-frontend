import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const ChatSection = ({ pdfId }: { pdfId: string }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle message submission
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <Card className="h-[100%]  rounded-none border-0">
      <div className="flex flex-col h-full">
        {/* Chat Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm">
                Welcome! Ask questions about the PDF document.
              </p>
            </div>
            {/* Chat messages will be rendered here */}
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
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </Card>
  );
};

export default ChatSection;

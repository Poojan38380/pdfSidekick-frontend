"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { PdfViewer } from "./PdfViewer";

interface PdfChatLayoutProps {
  pdf: {
    id: string;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    document_link: string;
    user_id: string;
  };
}

export function PdfChatLayout({ pdf }: PdfChatLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [message, setMessage] = useState("");

  // Fix: Proper URL construction for PDF document
  // Ensure NEXT_PUBLIC_UPLOAD_FOLDER_ROOT ends with a slash if needed
  const baseUrl = process.env.NEXT_PUBLIC_UPLOAD_FOLDER_ROOT || "";
  const pdfDocumentLink =
    baseUrl + (baseUrl.endsWith("/") ? "" : "/") + pdf.document_link;

  // Use a proper URL or relative path instead of file:/// protocol
  // Example: "/api/pdf/view/" + pdf.document_link or proper URL
  console.log("PDF Document Link:", pdfDocumentLink);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle message submission
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)]">
      <PanelGroup
        direction={isMobile ? "vertical" : "horizontal"}
        className="h-full"
        autoSaveId="pdf-chat-layout"
      >
        {/* PDF Viewer Section */}
        <Panel defaultSize={50} minSize={20} maxSize={80} className="p-0">
          <Card className="h-full rounded-none border-0 p-0">
            <div className="h-full bg-gray-100 rounded-none flex items-center justify-center">
              <PdfViewer documentLink={pdfDocumentLink} />
            </div>
          </Card>
        </Panel>

        {/* Resize Handle */}
        <PanelResizeHandle
          className={`${
            isMobile ? "h-2" : "h-full w-2"
          } bg-border hover:bg-primary/20 transition-colors`}
        />

        {/* Chat Section */}
        <Panel defaultSize={50} minSize={20} maxSize={80}>
          <Card className="h-full rounded-none border-0">
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
        </Panel>
      </PanelGroup>
    </div>
  );
}

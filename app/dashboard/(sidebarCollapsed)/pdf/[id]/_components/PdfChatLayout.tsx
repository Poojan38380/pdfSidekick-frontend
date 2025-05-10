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
  const pdfDocumentLink =
    process.env.NEXT_PUBLIC_UPLOAD_FOLDER_ROOT + pdf.document_link;
  //file:///D:/DEV/PDFSideKick/pdfsidekick-backend/uploads/6ef257b8-2ae6-4105-b3be-45ecb8b4f49d.pdf
  console.log(pdfDocumentLink);

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

  return (
    <div className="h-[calc(100vh-4rem)]">
      <PanelGroup
        direction={isMobile ? "vertical" : "horizontal"}
        className="h-full"
        autoSaveId="pdf-chat-layout"
      >
        {/* PDF Viewer Section */}
        <Panel defaultSize={25} minSize={20} maxSize={80} className="p-0">
          <Card className="h-full rounded-none border-0 p-0 gap-0">
            <div className="h-full">
              <div className="h-full bg-gray-100 rounded-none flex items-center justify-center">
                <PdfViewer documentLink={pdfDocumentLink} />
              </div>
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
        <Panel defaultSize={75} minSize={20} maxSize={80}>
          <Card className="h-full rounded-none border-0">
            <div className="flex flex-col h-full">
              {/* Chat Messages Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {/* Chat messages will be rendered here */}
                </div>
              </ScrollArea>

              {/* Chat Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask a question about the PDF..."
                    className="flex-1"
                  />
                  <Button size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Panel>
      </PanelGroup>
    </div>
  );
}

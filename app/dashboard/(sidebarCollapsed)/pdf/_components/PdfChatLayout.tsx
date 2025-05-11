"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { PdfViewer } from "./PdfViewer";
import ChatSection from "./ChatSection";

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

  //Example pdf link: https://res.cloudinary.com/dxvvg9nwf/raw/upload/v1746874055/pdfs/7621573f-022e-467e-9fe9-a7e7d8b1f27f
  const pdfDocumentLink = pdf.document_link;

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
        <Panel defaultSize={50} minSize={20} maxSize={80} className="p-0">
          <Card className="h-[100%] rounded-none border-0 p-0">
            <div className="h-full bg-muted rounded-none flex items-center justify-center">
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
          <ChatSection pdfId={pdf.id} />
        </Panel>
      </PanelGroup>
    </div>
  );
}

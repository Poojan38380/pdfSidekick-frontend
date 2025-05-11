"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Panel, PanelGroup } from "react-resizable-panels";
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
      <PanelGroup direction={isMobile ? "vertical" : "horizontal"}>
        <Panel defaultSize={30} minSize={0} maxSize={60} className="p-0">
          <Card className="h-[100%] rounded-none border-0 p-0">
            <div className="h-full bg-muted rounded-none flex items-center justify-center">
              <PdfViewer documentLink={pdfDocumentLink} />
            </div>
          </Card>
        </Panel>

        <ChatSection pdfId={pdf.id} isMobile={isMobile} />
      </PanelGroup>
    </div>
  );
}

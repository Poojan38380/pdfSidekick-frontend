"use client";

import React, { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import {
  Panel,
  PanelGroup,
  ImperativePanelHandle,
} from "react-resizable-panels";
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
  const pdfPanelRef = useRef<ImperativePanelHandle>(null);
  const chatPanelRef = useRef<ImperativePanelHandle>(
    null
  ) as React.MutableRefObject<ImperativePanelHandle>;

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

  useEffect(() => {
    // Set a timeout to collapse the PDF viewer panel after 5 seconds of page load
    const timer = setTimeout(() => {
      if (pdfPanelRef.current) {
        pdfPanelRef.current.resize(0);
      }
    }, 10000);

    // Clean up the timeout on component unmount
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this runs only once on mount

  // Add CSS to make panel transitions smooth
  useEffect(() => {
    // Add a CSS rule to make panel transitions smooth
    const styleElement = document.createElement("style");
    styleElement.textContent = `
      [data-panel] {
        transition: all 1000ms ease-in-out !important;
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)]">
      <PanelGroup
        direction={isMobile ? "vertical" : "horizontal"}
        className="h-full"
        autoSaveId="pdf-chat-layout"
      >
        {/* PDF Viewer Section */}
        <Panel
          defaultSize={40}
          minSize={0}
          maxSize={60}
          className="p-0"
          id="pdfViewerPanel"
          ref={pdfPanelRef}
        >
          <Card className="h-[100%] rounded-none border-0 p-0">
            <div className="h-full bg-muted rounded-none flex items-center justify-center">
              <PdfViewer documentLink={pdfDocumentLink} />
            </div>
          </Card>
        </Panel>

        {/* Chat Section */}
        <ChatSection
          pdfId={pdf.id}
          isMobile={isMobile}
          chatPanelRef={chatPanelRef}
        />
      </PanelGroup>
    </div>
  );
}

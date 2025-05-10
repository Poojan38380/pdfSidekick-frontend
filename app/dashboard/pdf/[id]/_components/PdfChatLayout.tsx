"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

interface PdfChatLayoutProps {
  pdf: {
    title: string;
  };
}

export function PdfChatLayout({ pdf }: PdfChatLayoutProps) {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <PanelGroup
        direction="vertical"
        className="h-full"
        autoSaveId="pdf-chat-layout"
      >
        {/* PDF Viewer Section */}
        <Panel defaultSize={25} minSize={20} maxSize={80} className="p-0">
          <Card className="h-full rounded-none border-0 p-0 gap-0">
            <div className="h-full">
              <div className="h-full bg-gray-100 rounded-none flex items-center justify-center">
                {/* PDF Viewer will be implemented here */}
                <p className="text-gray-500">PDF Preview</p>
              </div>
            </div>
          </Card>
        </Panel>

        {/* Resize Handle */}
        <PanelResizeHandle className="h-2 bg-border hover:bg-primary/20 transition-colors" />

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

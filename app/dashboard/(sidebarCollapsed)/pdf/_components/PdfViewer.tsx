"use client";

import React from "react";

interface PdfViewerProps {
  documentLink: string;
}

export function PdfViewer({ documentLink }: PdfViewerProps) {
  // Add #view=FitW and toolbar=0 to remove frame header and make PDF fit width by default
  const documentLinkWithParams = documentLink.includes("#")
    ? `${documentLink}&view=FitW`
    : `${documentLink}#view=FitW`;

  return (
    <div className="flex items-center justify-center w-full h-[100%]">
      <iframe
        src={documentLinkWithParams}
        className="w-full h-full border-0 overflow-hidden"
        title="PDF Viewer"
        style={{ overflow: "hidden" }}
      />
    </div>
  );
}

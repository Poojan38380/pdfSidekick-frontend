"use client";

// Configure PDF.js worker with a more reliable CDN URL

interface PdfViewerProps {
  documentLink: string;
}

export function PdfViewer({ documentLink }: PdfViewerProps) {
  return (
    <div className="w-full h-screen">
      <iframe
        src={documentLink}
        className="w-full h-full border-0"
        title="PDF Viewer"
      />
    </div>
  );
}

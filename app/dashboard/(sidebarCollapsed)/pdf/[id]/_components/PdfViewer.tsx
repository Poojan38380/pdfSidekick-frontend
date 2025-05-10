"use client";

import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Configure PDF.js worker with a more reliable CDN URL
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PdfViewerProps {
  documentLink: string;
}

export function PdfViewer({ documentLink }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState(1.0);

  useEffect(() => {
    // Reset states when document link changes
    setIsLoading(true);
    setError(null);
    setPageNumber(1);
  }, [documentLink]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
  }

  function onDocumentLoadError(err: Error) {
    console.error("PDF load error:", err);
    setIsLoading(false);
    setError(
      "Failed to load PDF. Please check if the file exists and is accessible."
    );
  }

  const previousPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const nextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages || prev));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  return (
    <div className="flex flex-col items-center h-full w-full">
      {isLoading && (
        <div className="flex items-center justify-center h-full w-full">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center h-full w-full text-destructive gap-2">
          <AlertCircle className="h-8 w-8" />
          <p className="text-sm text-center max-w-xs">{error}</p>
          <p className="text-xs text-muted-foreground">
            Check console for details
          </p>
        </div>
      )}

      <div className="flex-1 overflow-auto w-full flex justify-center">
        <Document
          file={documentLink}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={null}
          className="flex-1 overflow-auto flex justify-center"
          options={{
            cMapUrl: "//cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/cmaps/",
            cMapPacked: true,
          }}
        >
          {!isLoading && !error && (
            <Page
              pageNumber={pageNumber}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              scale={scale}
              className="shadow-md"
            />
          )}
        </Document>
      </div>

      {numPages && !error && (
        <div className="flex items-center gap-4 p-4 border-t w-full justify-center">
          <Button
            variant="outline"
            size="icon"
            onClick={zoomOut}
            title="Zoom out"
          >
            <span className="text-sm">-</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={previousPage}
            disabled={pageNumber <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="text-sm whitespace-nowrap">
            Page {pageNumber} of {numPages}
          </span>

          <Button
            variant="outline"
            size="icon"
            onClick={nextPage}
            disabled={pageNumber >= numPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={zoomIn}
            title="Zoom in"
          >
            <span className="text-sm">+</span>
          </Button>
        </div>
      )}
    </div>
  );
}

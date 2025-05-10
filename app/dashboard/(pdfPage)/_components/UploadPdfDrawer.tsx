"use client";
import React, { useState, useCallback } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Plus, Upload, FileText, X } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDropzone } from "react-dropzone";
import { uploadPdf } from "../_actions/uploadPdf";
import { Progress } from "@/components/ui/progress";
import quotes from "@/staticData/loadingQuotes";

interface PdfDocument {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  createdAt: string;
}

interface UploadPdfDrawerProps {
  onUploadSuccess?: (newPdf: PdfDocument) => void;
}

const UploadPdfDrawer: React.FC<UploadPdfDrawerProps> = ({
  onUploadSuccess,
}) => {
  const [pdfTitle, setPdfTitle] = useState("");
  const [pdfDescription, setPdfDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const [currentQuote, setCurrentQuote] = useState(
    quotes[Math.floor(Math.random() * quotes.length)]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file && file.type === "application/pdf") {
        setSelectedFile(file);
        // Set default title from filename if title is empty
        if (!pdfTitle) {
          setPdfTitle(file.name.replace(".pdf", ""));
        }
      } else {
        toast.error("Please select a PDF file");
        setSelectedFile(null);
      }
    },
    [pdfTitle]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    multiple: false,
  });

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadProgress(0);

    if (!selectedFile) {
      toast.error("Please upload a PDF file.");
      setIsUploading(false);
      return;
    }
    if (!pdfTitle) {
      toast.error("Please provide a title");
      setIsUploading(false);
      return;
    }

    // Start quote rotation
    const quoteInterval = setInterval(() => {
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 3000);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 500);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", pdfTitle);
    formData.append("description", pdfDescription);

    try {
      const newPdf = await uploadPdf(formData);
      setUploadProgress(100);
      clearInterval(quoteInterval);
      clearInterval(progressInterval);
      onUploadSuccess?.(newPdf);
      toast.success("PDF uploaded successfully");
      // Reset form and close drawer
      setPdfTitle("");
      setPdfDescription("");
      setSelectedFile(null);
      setIsOpen(false);
    } catch (error) {
      clearInterval(quoteInterval);
      clearInterval(progressInterval);
      console.error("Error uploading PDF:", error);
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button className="cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Upload PDF
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <form onSubmit={handleUpload} className="mx-auto w-full max-w-lg">
          <DrawerHeader className="px-4 py-2">
            <DrawerTitle>Upload a PDF</DrawerTitle>
            <DrawerDescription>
              Upload your PDF and add details to start asking questions.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 py-2 space-y-4">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                  ${
                    isDragActive
                      ? "border-primary bg-primary/5"
                      : "border-muted-foreground/25 hover:border-primary/50"
                  }
                  ${selectedFile ? "border-primary/50 bg-primary/5" : ""}`}
            >
              <input {...getInputProps()} />
              {selectedFile ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">
                      {selectedFile.name}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile();
                    }}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">
                    {isDragActive ? (
                      <p>Drop the PDF here</p>
                    ) : (
                      <p>Drag & drop a PDF here, or click to select</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="title">Title</Label>
                <span className="text-sm text-muted-foreground">
                  {pdfTitle.length}/100
                </span>
              </div>
              <div className="relative">
                <Input
                  id="title"
                  value={pdfTitle}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPdfTitle(e.target.value.slice(0, 100))
                  }
                  placeholder="Enter PDF title"
                  required
                  maxLength={100}
                  className="pr-12"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="description">Description</Label>
                <span className="text-sm text-muted-foreground">
                  {pdfDescription.length}/250
                </span>
              </div>
              <div className="relative">
                <textarea
                  id="description"
                  value={pdfDescription}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setPdfDescription(e.target.value.slice(0, 250))
                  }
                  placeholder="Enter a description for your PDF"
                  rows={3}
                  maxLength={250}
                  className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-12"
                />
              </div>
            </div>

            {isUploading && (
              <div className="space-y-4">
                <Progress value={uploadProgress} className="w-full" />
                <div className="text-center text-sm italic text-muted-foreground">
                  {currentQuote}
                </div>
              </div>
            )}
          </div>
          <DrawerFooter>
            <Button type="submit" disabled={isUploading} className="gap-2">
              {isUploading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Uploading... {uploadProgress}%
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Upload PDF
                </>
              )}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default UploadPdfDrawer;

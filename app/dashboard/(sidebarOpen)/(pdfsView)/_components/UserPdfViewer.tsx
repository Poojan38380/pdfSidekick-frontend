import React from "react";
import { PdfDocumentType } from "../_actions/getUserPdfs";
import { encodeURLid } from "@/utils/url-encoder-decoder";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Clock } from "lucide-react";
import UploadPdfDrawer from "./UploadPdfDrawer";

const UserPdfViewer = ({ pdfs }: { pdfs: PdfDocumentType[] }) => {
  if (pdfs.length === 0) {
    return (
      <div className="flex flex-col w-full h-full justify-center items-center gap-6 p-6">
        <div className="text-center space-y-2">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto" />
          <h2 className="text-2xl font-semibold">
            No PDFs found for your query
          </h2>
          <p className="text-sm text-muted-foreground">
            Upload a PDF to get started / try a different search term
          </p>
        </div>
        <UploadPdfDrawer />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {pdfs.map((pdf) => (
        <Link
          href={`/dashboard/pdf/${encodeURLid(pdf.id)}`}
          key={pdf.id}
          target="_blank"
          prefetch={false}
        >
          <Card
            key={pdf.id}
            className="group hover:shadow-md transition-all py-2 gap-0 h-min"
          >
            <CardHeader className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-medium line-clamp-1">
                      {pdf.title}
                    </CardTitle>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <Clock className="h-3 w-3" />
                      <span>
                        {formatDistanceToNow(new Date(pdf.created_at), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-2">
              {pdf.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {pdf.description}
                </p>
              )}

              {/* Processing Status */}
              {pdf.processing_status && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Badge
                        variant={
                          pdf.processing_status === "completed"
                            ? "success"
                            : pdf.processing_status === "pending"
                            ? "outline"
                            : pdf.processing_status === "processing"
                            ? "secondary"
                            : "destructive"
                        }
                        className="text-xs py-0 h-5"
                      >
                        {pdf.processing_status === "completed"
                          ? "Ready"
                          : pdf.processing_status === "pending"
                          ? "Pending"
                          : pdf.processing_status === "processing"
                          ? "Processing"
                          : "Failed"}
                      </Badge>

                      {pdf.processing_status === "failed" &&
                        pdf.error_message && (
                          <div className="text-xs text-destructive flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            <span className="line-clamp-1">
                              {pdf.error_message}
                            </span>
                          </div>
                        )}
                    </div>

                    {pdf.processing_status === "processing" && (
                      <span className="text-xs text-muted-foreground">
                        {pdf.processing_progress}%
                      </span>
                    )}
                  </div>

                  {pdf.processing_status === "processing" && (
                    <Progress
                      value={pdf.processing_progress || 0}
                      className="h-1.5"
                    />
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default UserPdfViewer;

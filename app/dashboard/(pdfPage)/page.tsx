"use client";
import React, { useState, useEffect } from "react";
import UploadPdfDrawer from "./_components/UploadPdfDrawer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Clock, MoreVertical, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { getUserPdfs, PdfDocumentType } from "./_actions/getUserPdfs";

const DashboardPage = () => {
  const [pdfs, setPdfs] = useState<PdfDocumentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch PDFs using server action
  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const data = await getUserPdfs();
        console.log(data);
        setPdfs(data);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
        setPdfs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPdfs();
  }, []);

  const filteredPdfs = pdfs.filter((pdf) =>
    pdf.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="p-4">
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="p-4">
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (pdfs.length === 0) {
    return (
      <div className="flex flex-col w-full h-full justify-center items-center gap-6 p-6">
        <div className="text-center space-y-2">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto" />
          <h2 className="text-2xl font-semibold">No PDFs Found</h2>
          <p className="text-muted-foreground">
            Upload your first PDF to get started with PDF Sidekick
          </p>
        </div>
        <UploadPdfDrawer />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Your PDFs</h1>
          <p className="text-sm text-muted-foreground">
            Manage and interact with your PDF documents
          </p>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search PDFs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-full sm:w-[200px]"
            />
          </div>
          <UploadPdfDrawer />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPdfs.map((pdf) => (
          <Card key={pdf.id} className="group hover:shadow-md transition-all">
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
            <CardContent className="p-4 pt-0">
              {pdf.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {pdf.description}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;

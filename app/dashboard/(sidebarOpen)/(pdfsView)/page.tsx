"use client";
import React, { useState, useEffect } from "react";
import UploadPdfDrawer from "./_components/UploadPdfDrawer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getUserPdfs, PdfDocumentType } from "./_actions/getUserPdfs";
import UserPdfViewer from "./_components/UserPdfViewer";
import { CustomUser } from "@/lib/auth";
import { useSession } from "next-auth/react";

const DashboardPage = () => {
  const [pdfs, setPdfs] = useState<PdfDocumentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  const user = session?.user as CustomUser;

  const fetchPdfs = async () => {
    try {
      const data = await getUserPdfs();
      console.log(data);
      setPdfs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching PDFs:", error);
      setPdfs([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch PDFs using server action
  useEffect(() => {
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
          <h2 className="text-2xl font-semibold">
            Welcome, {user?.firstName || "there"}!
          </h2>
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
          <h1 className="text-2xl font-bold">
            Welcome back, {user?.firstName || "there"}!
          </h1>
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
          <UploadPdfDrawer onUploadSuccess={() => fetchPdfs()} />
        </div>
      </div>

      <UserPdfViewer pdfs={filteredPdfs} />
    </div>
  );
};

export default DashboardPage;

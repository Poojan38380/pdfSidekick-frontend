import { decodeURLid } from "@/utils/url-encoder-decoder";
import React from "react";

interface PdfViewerPageProps {
  params: Promise<{ id: string }>;
}

const PdfViewerPage = async ({ params }: PdfViewerPageProps) => {
  const { id } = await params;
  const decodedId = decodeURLid(id);
  return <div>{decodedId}</div>;
};

export default PdfViewerPage;

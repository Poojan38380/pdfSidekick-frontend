import { decodeURLid } from "@/utils/url-encoder-decoder";
import React from "react";
import { getSinglePdf } from "../_actions/getSinglePdf";
import { PdfChatLayout } from "./_components/PdfChatLayout";

interface PdfViewerPageProps {
  params: Promise<{ id: string }>;
}

const PdfViewerPage = async ({ params }: PdfViewerPageProps) => {
  const { id } = await params;
  const decodedId = decodeURLid(id);

  const pdf = await getSinglePdf(decodedId);

  return <PdfChatLayout pdf={pdf} />;
};

export default PdfViewerPage;

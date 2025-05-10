"use server";

import { auth } from "@/lib/auth";
import { PdfDocumentType } from "../../(pdfsView)/_actions/getUserPdfs";

export async function getSinglePdf(pdfId: string): Promise<PdfDocumentType> {
    const session = await auth();
    if (!session?.user) {
        throw new Error("User not authenticated");
    }

    try {
        const backendUrl = process.env.BACKEND_URL;
        if (!backendUrl) {
            throw new Error("BACKEND_URL environment variable is not set");
        }

        const response = await fetch(`${backendUrl}/api/pdfs/${pdfId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to fetch PDF");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching PDF:", error);
        throw new Error(error instanceof Error ? error.message : "Failed to fetch PDF");
    }
}

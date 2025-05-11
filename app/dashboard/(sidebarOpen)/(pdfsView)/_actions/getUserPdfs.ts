"use server";

import { auth } from "@/lib/auth";

export type PdfDocumentType = {
    id: string;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    document_link: string;
    user_id: string;
    processing_status: 'pending' | 'processing' | 'completed' | 'failed';
    processing_progress: number;
    total_pages: number | null;
    error_message: string | null;
}

export async function getUserPdfs(): Promise<PdfDocumentType[]> {
    const session = await auth();
    if (!session?.user) {
        throw new Error("User not authenticated");
    }

    try {
        const backendUrl = process.env.BACKEND_URL;
        if (!backendUrl) {
            throw new Error("BACKEND_URL environment variable is not set");
        }

        const response = await fetch(`${backendUrl}/api/pdfs/user/${session.user.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to fetch PDFs");
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching PDFs:", error);
        throw new Error(error instanceof Error ? error.message : "Failed to fetch PDFs");
    }
}

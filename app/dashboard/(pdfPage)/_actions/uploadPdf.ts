"use server";

import { auth } from "@/lib/auth";

interface UploadPdfResponse {
    id: string;
    title: string;
    description: string;
    fileUrl: string;
    createdAt: string;
}

export async function uploadPdf(formData: FormData): Promise<UploadPdfResponse> {

    const session = await auth();
    if (!session?.user) {
        throw new Error("User not authenticated");
    }
    try {

        formData.append("user_id", session.user.id);
        const backendUrl = process.env.BACKEND_URL;
        if (!backendUrl) {
            throw new Error("BACKEND_URL environment variable is not set");
        }

        const response = await fetch(`${backendUrl}/api/pdfs/upload`, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to upload PDF");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error uploading PDF:", error);
        throw new Error(error instanceof Error ? error.message : "Failed to upload PDF");
    }
}

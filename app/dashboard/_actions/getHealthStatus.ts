"use server";

export type HealthStatus = {
    status: "healthy" | "unhealthy";
    timestamp: string;
    version: string;
    uptime_seconds: number;
    database: string;
};

export async function getHealthStatus(): Promise<HealthStatus> {
    try {
        const backendUrl = process.env.BACKEND_URL;
        if (!backendUrl) {
            throw new Error("BACKEND_URL environment variable is not set");
        }

        const response = await fetch(`${backendUrl}/health`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Health check failed");
        }

        const data = await response.json();
        return {
            status: data.status === "healthy" ? "healthy" : "unhealthy",
            timestamp: data.timestamp,
            version: data.version,
            uptime_seconds: data.uptime_seconds,
            database: data.database,
        };
    } catch (error) {
        console.error("Health check failed:", error);
        return {
            status: "unhealthy",
            timestamp: new Date().toISOString(),
            version: process.env.npm_package_version || "0.1.0",
            uptime_seconds: process.uptime(),
            database: "unhealthy",
        };
    }
} 
"use client";

import { getHealthStatus } from "../_actions/getHealthStatus";
import type { HealthStatus } from "../_actions/getHealthStatus";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function HealthStatus() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const status = await getHealthStatus();
        setHealth(status);
      } catch (error) {
        console.error("Failed to fetch health status:", error);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchHealth();

    // Poll every 30 seconds
    const interval = setInterval(fetchHealth, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="w-2 h-2 rounded-full bg-muted animate-pulse" />;
  }

  if (!health) {
    return <div className="w-2 h-2 rounded-full bg-destructive" />;
  }

  const isHealthy =
    health.status === "healthy" && !health.database.includes("unhealthy");

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              isHealthy ? "bg-green-500" : "bg-red-500"
            )}
          />
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p>Status: {health.status}</p>
            <p>Database: {health.database}</p>
            <p>Uptime: {Math.floor(health.uptime_seconds / 60)} minutes</p>
            <p>Last Check: {new Date(health.timestamp).toLocaleString()}</p>
            <p>Version: v{health.version}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

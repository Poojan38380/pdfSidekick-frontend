import { useState, useEffect, useCallback, useRef } from "react";

export interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: string;
  thinking?: string;
}

interface UseChatSocketProps {
  pdfId: string;
}

export const useChatSocket = ({ pdfId }: UseChatSocketProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<
    "connecting" | "connected" | "disconnected"
  >("disconnected");
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  const getBackendUrl = useCallback(() => {
    // Get the base URL from the environment variable or derive it
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    // Check if we have BACKEND_URL in env or derive from window location
    const host =
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      window.location.hostname === "localhost"
        ? `${window.location.hostname}:8000`
        : window.location.host;

    return `${protocol}//${host}`;
  }, []);

  // Connect to WebSocket
  const connect = useCallback(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) return;

    try {
      setStatus("connecting");
      const backendUrl = getBackendUrl();
      const socket = new WebSocket(`${backendUrl}/ws/chat/${pdfId}`);

      socket.onopen = () => {
        setStatus("connected");
        setError(null);
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages((prev) => [...prev, data]);
      };

      socket.onerror = (event) => {
        console.error("WebSocket error:", event);
        setError("Failed to connect to chat server");
        setStatus("disconnected");
      };

      socket.onclose = () => {
        setStatus("disconnected");
      };

      socketRef.current = socket;
    } catch (err) {
      console.error("Failed to establish WebSocket connection:", err);
      setError("Failed to connect to chat server");
      setStatus("disconnected");
    }
  }, [pdfId, getBackendUrl]);

  // Disconnect from WebSocket
  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
      setStatus("disconnected");
    }
  }, []);

  // Send message through WebSocket
  const sendMessage = useCallback((message: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      const messageData = {
        content: message,
      };
      socketRef.current.send(JSON.stringify(messageData));
      return true;
    }
    return false;
  }, []);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    messages,
    status,
    error,
    connect,
    disconnect,
    sendMessage,
  };
};

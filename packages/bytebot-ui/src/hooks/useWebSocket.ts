"use client";

import { useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { Message, Task } from "@/types";
import { useAuth } from "@clerk/nextjs";

interface UseWebSocketProps {
  onTaskUpdate?: (task: Task) => void;
  onNewMessage?: (message: Message) => void;
  onTaskCreated?: (task: Task) => void;
  onTaskDeleted?: (taskId: string) => void;
}

export function useWebSocket({
  onTaskUpdate,
  onNewMessage,
  onTaskCreated,
  onTaskDeleted,
}: UseWebSocketProps = {}) {
  const socketRef = useRef<Socket | null>(null);
  const currentTaskIdRef = useRef<string | null>(null);
  const { getToken } = useAuth();

  const getAuthToken = useCallback(async () => {
    try {
      // Prefer a Clerk JWT template named "backend" if configured
      return (await getToken({ template: "backend" })) || (await getToken());
    } catch {
      return null;
    }
  }, [getToken]);

  const connect = useCallback(async () => {
    if (socketRef.current?.connected) {
      return socketRef.current;
    }

    // Get Clerk token for backend verification
    const token = await getAuthToken();

    // Connect to the WebSocket server
    const socket = io({
      path: "/api/proxy/tasks",
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      auth: token ? { token } : undefined,
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
      // Re-join current room after reconnect
      if (currentTaskIdRef.current) {
        socket.emit("join_task", currentTaskIdRef.current);
      }
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    socket.io.on("reconnect_attempt", async () => {
      const refreshed = await getAuthToken();
      (socket.io as any).opts.auth = refreshed ? { token: refreshed } : undefined;
    });

    socket.on("task_updated", (task: Task) => {
      console.log("Task updated:", task);
      onTaskUpdate?.(task);
    });

    socket.on("new_message", (message: Message) => {
      console.log("New message:", message);
      onNewMessage?.(message);
    });

    socket.on("task_created", (task: Task) => {
      console.log("Task created:", task);
      onTaskCreated?.(task);
    });

    socket.on("task_deleted", (taskId: string) => {
      console.log("Task deleted:", taskId);
      onTaskDeleted?.(taskId);
    });

    socketRef.current = socket;
    return socket;
  }, [onTaskUpdate, onNewMessage, onTaskCreated, onTaskDeleted, getAuthToken]);

  const joinTask = useCallback(
    (taskId: string) => {
      const maybeSocket = socketRef.current;
      if (maybeSocket?.connected) {
        if (currentTaskIdRef.current) {
          maybeSocket.emit("leave_task", currentTaskIdRef.current);
        }
        maybeSocket.emit("join_task", taskId);
        currentTaskIdRef.current = taskId;
        console.log(`Joined task room: ${taskId}`);
      } else {
        // Connect then join
        connect().then((socket) => {
          if (!socket) return;
          if (currentTaskIdRef.current) {
            socket.emit("leave_task", currentTaskIdRef.current);
          }
          socket.emit("join_task", taskId);
          currentTaskIdRef.current = taskId;
          console.log(`Joined task room: ${taskId}`);
        });
      }
    },
    [connect],
  );

  const leaveTask = useCallback(() => {
    const socket = socketRef.current;
    if (socket && currentTaskIdRef.current) {
      socket.emit("leave_task", currentTaskIdRef.current);
      console.log(`Left task room: ${currentTaskIdRef.current}`);
      currentTaskIdRef.current = null;
    }
  }, []);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      currentTaskIdRef.current = null;
    }
  }, []);

  // Initialize connection on mount
  useEffect(() => {
    // Initialize connection on mount
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    socket: socketRef.current,
    joinTask,
    leaveTask,
    disconnect,
    isConnected: socketRef.current?.connected || false,
  };
}

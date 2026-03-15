// useToast.ts
import { useState, useCallback } from "react";

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = "info") => {
    const id = Date.now().toString();
    setToasts((ts) => [...ts, { id, message, type }]);
    setTimeout(() => {
      setToasts((ts) => ts.filter((t) => t.id !== id));
    }, 3000);
  }, []);
  return { toasts, addToast };
}

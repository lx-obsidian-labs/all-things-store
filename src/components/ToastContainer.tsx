"use client";

import { CheckCircle, Info, X, XCircle } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
  };

  const styles = {
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    error: "border-red-500/30 bg-red-500/10 text-red-300",
    info: "border-accent/30 bg-accent/10 text-accent-light",
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => {
        const Icon = icons[toast.type];
        return (
          <div
            key={toast.id}
            className={`animate-slide-up flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium shadow-xl backdrop-blur-xl ${styles[toast.type]}`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{toast.message}</span>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="ml-2 opacity-60 hover:opacity-100"
              aria-label="Dismiss"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

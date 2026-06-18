"use client";

import { useEffect, useState } from "react";
import { X, Truck, Gift } from "lucide-react";

const ANNOUNCEMENTS = [
  {
    id: "free-shipping",
    icon: Truck,
    text: "Free shipping on orders over $50 — worldwide",
  },
  {
    id: "welcome-offer",
    icon: Gift,
    text: 'New customers: Use code <span class="font-mono text-accent-light">WELCOME10</span> for 10% off',
  },
];

const STORAGE_KEY = "all-things-announcement-dismissed";

export function AnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const [dismissed, setDismissed] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "true") {
        setDismissed(true);
        return;
      }
    } catch {}
    setDismissed(false);

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
  };

  if (!mounted || dismissed) return null;

  const ann = ANNOUNCEMENTS[current];
  const Icon = ann.icon;

  return (
    <div className="relative border-b border-white/5 bg-obsidian-900/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-obsidian-300">
          <Icon className="h-4 w-4 shrink-0 text-accent-light" />
          <span dangerouslySetInnerHTML={{ __html: ann.text }} />
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute right-3 rounded-full p-1 text-obsidian-500 transition-colors hover:bg-white/5 hover:text-white sm:right-6"
          aria-label="Dismiss announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

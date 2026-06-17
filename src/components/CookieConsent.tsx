"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const CONSENT_KEY = "all-things-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consented = localStorage.getItem(CONSENT_KEY);
    if (!consented) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "true");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-obsidian-900/95 p-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row">
        <p className="flex-1 text-sm text-obsidian-300">
          We use cookies to improve your experience. By using this site you accept our{" "}
          <a href="/privacy" className="text-accent-light underline underline-offset-2 hover:text-accent">
            Privacy Policy
          </a>.
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={accept}
            className="btn-primary whitespace-nowrap px-6 py-2 text-sm"
          >
            Accept All
          </button>
          <button
            onClick={accept}
            className="text-obsidian-500 transition-colors hover:text-white"
            aria-label="Dismiss"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

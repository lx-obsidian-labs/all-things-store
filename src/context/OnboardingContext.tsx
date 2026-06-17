"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export interface OnboardingData {
  name: string;
  country: string;
  currency: string;
}

interface OnboardingContextValue {
  onboarding: OnboardingData | null;
  showOnboarding: boolean;
  completeOnboarding: (data: OnboardingData) => void;
  dismissOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextValue>({
  onboarding: null,
  showOnboarding: false,
  completeOnboarding: () => {},
  dismissOnboarding: () => {},
});

const STORAGE_KEY = "all-things-onboarding";

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [onboarding, setOnboarding] = useState<OnboardingData | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setOnboarding(JSON.parse(stored));
      } else {
        setShowOnboarding(true);
      }
    } catch {
      setShowOnboarding(true);
    }
    setHydrated(true);
  }, []);

  const completeOnboarding = useCallback((data: OnboardingData) => {
    setOnboarding(data);
    setShowOnboarding(false);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }, []);

  const dismissOnboarding = useCallback(() => {
    setShowOnboarding(false);
  }, []);

  return (
    <OnboardingContext.Provider value={{ onboarding, showOnboarding, completeOnboarding, dismissOnboarding }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  return useContext(OnboardingContext);
}

"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import LoadingTransition from "./LoadingTransition";

interface NavigationContextType {
  triggerTransition: (callback: () => void) => void;
  isReturningFromProject: boolean;
  setIsReturningFromProject: (value: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
};

interface ClientWrapperProps {
  children: React.ReactNode;
}

const FILL_ANIMATION_MS = 1000; // 200ms delay + 800ms clip-path fill in LoadingTransition
const NAV_FALLBACK_MS = 2000;   // safety timeout if pathname never changes

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isReturningFromProject, setIsReturningFromProject] = useState(false);
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);
  const pendingNavRef = useRef(false);

  useEffect(() => {
    if (isReturningFromProject) {
      const timer = setTimeout(() => {
        setIsReturningFromProject(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isReturningFromProject]);

  // Dismiss overlay only after Next.js commits the new route — prevents the
  // home from peeking through if the exit fade started while still on '/'.
  useEffect(() => {
    if (pendingNavRef.current && pathname !== prevPathnameRef.current) {
      pendingNavRef.current = false;
      setIsLoading(false);
    }
    prevPathnameRef.current = pathname;
  }, [pathname]);

  const triggerTransition = useCallback((callback: () => void) => {
    setIsLoading(true);
    pendingNavRef.current = true;

    // Fire navigation the instant the name-fill finishes; pathname-watcher above
    // takes the overlay down once the new route mounts.
    setTimeout(() => {
      callback();
      // Safety net: if pathname never changes (e.g. navigation cancelled), still clear loading.
      setTimeout(() => {
        if (pendingNavRef.current) {
          pendingNavRef.current = false;
          setIsLoading(false);
        }
      }, NAV_FALLBACK_MS);
    }, FILL_ANIMATION_MS);
  }, []);

  return (
    <NavigationContext.Provider value={{
      triggerTransition,
      isReturningFromProject,
      setIsReturningFromProject
    }}>
      {children}
      <LoadingTransition isLoading={isLoading} />
    </NavigationContext.Provider>
  );
}
"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import LoadingTransition from "./LoadingTransition";

interface NavigationContextType {
  triggerTransition: (callback: () => void) => void;
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

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [isLoading, setIsLoading] = useState(false);

  const triggerTransition = useCallback((callback: () => void) => {
    setIsLoading(true);
    
    // Wait for the animation to complete, then navigate
    setTimeout(() => {
      callback();
      // Reset loading state after navigation
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }, 1800); // Total animation time: 200ms delay + 800ms fill + 400ms fade text + 300ms fade overlay + 100ms buffer
  }, []);

  return (
    <NavigationContext.Provider value={{ triggerTransition }}>
      {children}
      <LoadingTransition isLoading={isLoading} />
    </NavigationContext.Provider>
  );
}
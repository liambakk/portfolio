"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
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

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isReturningFromProject, setIsReturningFromProject] = useState(false);

  // Reset the returning state after animations have had a chance to trigger
  useEffect(() => {
    if (isReturningFromProject) {
      const timer = setTimeout(() => {
        setIsReturningFromProject(false);
      }, 500); // Increased from 100ms to give GridLayout time to mount and read the state
      return () => clearTimeout(timer);
    }
  }, [isReturningFromProject]);

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
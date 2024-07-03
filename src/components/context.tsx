// context.tsx
import React, { createContext, useContext, ReactNode } from 'react';

interface AppContextInterface {
  basename: string;
}

const AppContext = createContext<AppContextInterface | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
  basename: string;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children, basename }) => {
  return (
    <AppContext.Provider value={{ basename }}>
      {children}
    </AppContext.Provider>
  );
};

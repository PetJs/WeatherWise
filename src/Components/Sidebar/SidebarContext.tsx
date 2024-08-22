import { createContext, useContext } from 'react';

interface SidebarItemContextProps {
  icon: string;
  label: string;
  link: string;
}

const SidebarItemContext = createContext<SidebarItemContextProps | undefined>(undefined);

export const useSidebarItemContext = () => {
  const context = useContext(SidebarItemContext);
  if (!context) {
    throw new Error('useSidebarItemContext must be used within a SidebarItemProvider');
  }
  return context;
};

export { SidebarItemContext };
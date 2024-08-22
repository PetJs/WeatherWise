import React from 'react';
import { useSidebarItemContext } from './SidebarContext';

const SidebarItem: React.FC = () => {
  const { icon, label, link } = useSidebarItemContext();

  return (
    <div className="sidebar-item">
      <a href={link} className="sidebar-link">
        <img src={`/${icon}.png`} alt={label} className="sidebar-icon" />
        <span className="sidebar-label">{label}</span>
      </a>
    </div>
  );
};

export default SidebarItem;


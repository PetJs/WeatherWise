import React from 'react';
import { useSidebarItemContext } from './SidebarContext';

const SidebarItem: React.FC = () => {
  const { icon, label, link } = useSidebarItemContext();

  return (
    <a href={link} className="sidebar-item">
      <div>
        <i className={`fas fa-${icon}`}>{label}</i>
      </div>
    </a>
  );
};

export default SidebarItem;


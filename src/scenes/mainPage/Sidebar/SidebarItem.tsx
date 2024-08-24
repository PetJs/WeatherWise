import React from 'react';
import { useSidebarItemContext } from './SidebarContext';
//import { Link } from 'react-router-dom';

const SidebarItem: React.FC = () => {
  const { /* icon */ label, link } = useSidebarItemContext();

  return (
    <a href={link} className="sidebar-item">
      <div>
        <i>{label}</i>
      </div>
    </a>
  );
};

export default SidebarItem;

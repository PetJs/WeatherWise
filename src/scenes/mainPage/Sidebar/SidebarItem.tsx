import React from 'react';
import { useSidebarItemContext } from './SidebarContext';
import { Link } from 'react-router-dom';

const SidebarItem: React.FC = () => {
  const { /* icon */ label, link } = useSidebarItemContext();

  return (
    <div className="sidebar-item">
      <Link to={link} className="sidebar-link"> {/* Changed to Link for better routing */}
        {/* <img src={`/${icon}.png`} alt={`${label} icon`} className="sidebar-icon" /> */}
        <span className="sidebar-label">{label}</span>
      </Link>
    </div>
  );
};

export default SidebarItem;

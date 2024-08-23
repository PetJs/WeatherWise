import React from 'react';
import { useSidebarItemContext } from './SidebarContext';
import { Link } from 'react-router-dom';

const SidebarItem: React.FC = () => {
  const { /* icon */ label, link } = useSidebarItemContext();

  return (
<<<<<<< HEAD
    <div className="sidebar-item">
      <Link to={link} className="sidebar-link"> {/* Changed to Link for better routing */}
        {/* <img src={`/${icon}.png`} alt={`${label} icon`} className="sidebar-icon" /> */}
        <span className="sidebar-label">{label}</span>
      </Link>
    </div>
=======
    <a href={link} className="sidebar-item">
      <div>
        <i className={`fas fa-${icon}`}>{label}</i>
      </div>
    </a>
>>>>>>> 07950edd71e34c87a6481692c29584756b24b24e
  );
};

export default SidebarItem;

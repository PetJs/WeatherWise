import SidebarItem from './SidebarItem';
import { SidebarItemContext } from './SidebarContext';

const Sidebar = () => {
  const sidebarItems = [
    { icon: 'cloud', label: 'Weather', link: '/weather' },
    { icon: 'city', label: 'Cities', link: '/cities' },
    { icon: 'map', label: 'Map', link: '/map' },
    { icon: 'settings', label: 'Settings', link: '/settings' },
    { icon: 'account', label: 'Account', link: '/account' },
  ];

  return (
    <div className="sidebar">
      {sidebarItems.map((item, index) => (
        <SidebarItemContext.Provider key={index} value={item}>
          <SidebarItem />
        </SidebarItemContext.Provider>
      ))}
    </div>
  );
};

export default Sidebar;


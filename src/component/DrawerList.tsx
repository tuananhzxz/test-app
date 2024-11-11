import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SubMenuItem {
  name: string;
  path: string;
}

interface MenuItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  activeIcon: React.ComponentType<{ className?: string }>;
  subMenu?: SubMenuItem[];
}

interface DrawerListProps {
  menu: MenuItem[];
  menu2: MenuItem[];
  toggleDrawer: () => void;
}

const DrawerList = ({ menu, menu2, toggleDrawer }: DrawerListProps) => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (menuName: string) => {
    setOpenSubmenu(openSubmenu === menuName ? null : menuName);
  };

  const MenuItem = ({ item }: { item: MenuItem }) => {
    const isActive = location.pathname === item.path || 
                    (item.subMenu?.some(sub => location.pathname === sub.path));
    const Icon = isActive ? item.activeIcon : item.icon;
    const hasSubmenu = item.subMenu && item.subMenu.length > 0;
    const isSubmenuOpen = openSubmenu === item.name;

    return (
      <div>
        <div
          onClick={() => hasSubmenu ? toggleSubmenu(item.name) : toggleDrawer()}
          className={`
            flex items-center px-4 py-2.5 text-sm font-medium
            transition-colors duration-200 rounded-lg mx-2 cursor-pointer
            ${isActive
              ? 'bg-red-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
            }
          `}
        >
          <Link
            to={hasSubmenu ? '#' : item.path}
            className="flex items-center flex-1"
            onClick={(e) => {
              if (hasSubmenu) {
                e.preventDefault();
              }
            }}
          >
            <Icon
              className={`mr-3 h-5 w-5 ${
                isActive ? 'text-white' : 'text-blue-600'
              }`}
            />
            <span>{item.name}</span>
          </Link>
          {hasSubmenu && (
            <div className="ml-auto">
              {isSubmenuOpen ? (
                <ChevronUp className={`h-4 w-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
              ) : (
                <ChevronDown className={`h-4 w-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
              )}
            </div>
          )}
        </div>

        {/* Submenu */}
        {hasSubmenu && isSubmenuOpen && (
          <div className="ml-4 mt-1 space-y-1">
            {item.subMenu?.map((subItem) => {
              const isSubActive = location.pathname === subItem.path;
              return (
                <Link
                  key={subItem.name}
                  to={subItem.path}
                  onClick={toggleDrawer}
                  className={`
                    flex items-center px-4 py-2 text-sm font-medium
                    transition-colors duration-200 rounded-lg
                    ${isSubActive
                      ? 'bg-red-100 text-red-600'
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className="w-5 h-5 mr-3" /> {/* Spacing to align with parent */}
                  <span>{subItem.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const MenuSection = ({ items }: { items: MenuItem[] }) => (
    <div className="space-y-1">
      {items.map((item) => (
        <MenuItem key={item.name} item={item} />
      ))}
    </div>
  );

  return (
    <div className="h-full">
      <div className="flex flex-col justify-between h-full w-[280px] border-r border-gray-200 bg-white py-5">
        <div className="flex-1 overflow-y-auto">
          <MenuSection items={menu} />
        </div>
        <div className="border-t border-gray-200 pt-4 mt-4">
          <MenuSection items={menu2} />
        </div>
      </div>
    </div>
  );
};

export default DrawerList;
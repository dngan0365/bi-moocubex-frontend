'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

// Icons
import AnalyticsIcon from '@mui/icons-material/Analytics';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import BookIcon from '@mui/icons-material/Book';

const Sidebar = () => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    {
      name: 'Tổng quan',
      href: '/overview',
      icon: <AnalyticsIcon />,
    },
    {
      name: 'Chất lượng dữ liệu',
      href: '/data-quality',
      icon: <DonutLargeIcon />,
    },
    {
      name: 'Khóa học',
      href: '/courses',
      icon: <BookIcon />,
    },
    {
      name: 'Khai thác dữ liệu',
      href: '/data-mining',
      icon: <QueryStatsIcon />,
    },
  ];

  const sidebarClasses = `sticky top-16 z-10 h-[calc(100vh-4rem)] transition-all duration-300 ${
    isCollapsed ? 'w-16' : 'w-60'
  } ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} shadow-lg overflow-y-auto`;

  return (
    <div className={`${sidebarClasses} hidden md:block`}>
      <div className="flex flex-col h-full">

        {/* Collapse button - moved to top */}
        <div className="pt-4 px-2">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`flex items-center justify-center w-8 h-8 rounded-md
              ${theme === 'dark'
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-300'}
              transition-colors duration-200`}
          >
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>

        </div>


        {/* Navigation links */}
        <nav className="flex-1 py-4 px-2">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center ${
                      isCollapsed ? 'justify-center' : 'justify-start'
                    } px-2 py-2 rounded-md ${
                      isActive
                        ? theme === 'dark'
                          ? 'bg-gray-700 text-white'
                          : 'bg-cyan-400/5 text-cyan-500'
                        : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-cyan-400/10'
                    } transition-colors duration-200`}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      {!isCollapsed && <span className="ml-3">{item.name}</span>}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

      </div>
    </div>
  );
};

export default Sidebar;

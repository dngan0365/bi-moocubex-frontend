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
    // {
    //   name: 'Báo cáo',
    //   href: '/reports',
    //   icon: (
    //     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    //     </svg>
    //   ),
    // },
  ];

  const sidebarClasses = `sticky top-16 z-10 h-[calc(100vh-4rem)] transition-all duration-300 ${
    isCollapsed ? 'w-16' : 'w-60'
  } ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} shadow-lg overflow-y-auto`;

  return (
    <>
      {/* Sidebar for desktop and tablet */}
      <div className={`${sidebarClasses} hidden md:block`}>
        <div className="flex flex-col h-full">
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

          {/* Collapse button */}
          <div className="py-4 px-2">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`flex items-center ${
                isCollapsed ? 'justify-center w-full' : 'justify-start w-full'
              } px-2 py-2 rounded-md ${
                theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
              } transition-colors duration-200`}
            >
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
              {!isCollapsed && <span className="ml-3">Collapse</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

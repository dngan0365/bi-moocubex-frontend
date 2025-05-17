'use client'

import * as React from 'react';

import Sidebar from '@/components/sidebar/Sidebar';

import Image from 'next/image';
import { AuthRedirect } from '@/components/auth/AuthRedirect';

// Icons
import AnalyticsIcon from '@mui/icons-material/Analytics';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import BookIcon from '@mui/icons-material/Book';

// Navigation config
export const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'overview',
    title: 'Overview',
    icon: <AnalyticsIcon />,
    href: '/overview',
    pattern:'overview'
  },
  {
    segment: 'data-quality',
    title: 'Data Quality',
    icon: <DonutLargeIcon />,
    href: '/data-quality',
    pattern: 'data-quality'
  },
  {
    segment: 'courses',
    title: 'Courses',
    icon: <BookIcon />,
    href: '/courses',
    pattern: 'courses'
  },
  {
    segment: 'data-mining',
    title: 'Data Mining',
    icon: <QueryStatsIcon />,
    href: '/data-mining', 
    pattern: 'data-mining'
  },
];

export const BRANDING = {
  title: 'BI MOOCCubeX',
  logo: (
    <Image
      src="/img/analysis.png"
      alt="BI MOOCCubeX logo"
      width={30}
      height={30}
    />
  ),
  homeUrl: '/', // ✅ use absolute path instead of './'
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      {/* <AuthRedirect /> */}
      <div className="flex flex-1 pt-16 h-[calc(100vh-4rem)]">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </>
  );
}

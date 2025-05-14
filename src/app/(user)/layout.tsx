'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import {
  type Session,
  type Navigation,
} from '@toolpad/core/AppProvider';
import { useDemoRouter } from '@toolpad/core/internal';
// material import
import { NextAppProvider } from '@toolpad/core/nextjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

// Icon
import AnalyticsIcon from '@mui/icons-material/Analytics';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import BookIcon from '@mui/icons-material/Book';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Image from 'next/image';
import { AuthRedirect } from '@/components/auth/AuthRedirect';

export const NAVIGATION = [
  {
    segment: 'overview',
    title: 'Overview',
    icon: <AnalyticsIcon />,
    href: '/overview'
  },
  {
    segment: 'data-quality',
    title: 'Data Quality',
    icon: <DonutLargeIcon />,
    href: '/data-quality'
  },
  {
    segment: 'courses',
    title: 'Courses',
    icon: <BookIcon />,
    href: '/courses'
  },
  {
    segment: 'data-mining',
    title: 'Data Mining',
    icon: <QueryStatsIcon />,
    href: 'data-mining'
  },
];

export const BRANDING = {
    title: 'BI MOOCCubeX',
    logo: <Image 
      src="/img/analysis.png" 
      alt="BI MOOCCubeX logo" 
      width={30} 
      height={30} 
    />,
    homeUrl: './',
}

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [session, setSession] = React.useState<Session | null>({
    user: {
      name: 'Bharat Kashyap',
      email: 'bharatkashyap@outlook.com',
      image: 'https://avatars.githubusercontent.com/u/19550456',
    },
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: 'Bharat Kashyap',
            email: 'bharatkashyap@outlook.com',
            image: 'https://avatars.githubusercontent.com/u/19550456',
          },
        });
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  const router = useDemoRouter('/dashboard');

  return (
    <>
      {/* <AuthRedirect/> */}
        <ThemeProvider theme={demoTheme}>
          <CssBaseline />
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
              <NextAppProvider 
                session={session}
                authentication={authentication}
                branding={BRANDING}
                navigation={NAVIGATION}
                router={router}
                theme={demoTheme}>
                    <DashboardLayout>
                      {children}
                    </DashboardLayout>
              </NextAppProvider>
          </AppRouterCacheProvider>
        </ThemeProvider>
    </>
  );
}

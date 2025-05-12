import type { Metadata } from "next";
import { Be_Vietnam_Pro, Roboto } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

// Icon

// Font Family
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese'],
  weight: ['400', '500', '700'],
  display: 'swap',
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BI MOOCCubeX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <html lang="en">
            <body
              className={`${beVietnamPro.className} ${roboto.className} antialiased`}
            >
              
              {children}
            </body>
          </html>
    </AppRouterCacheProvider>
  );
}

import type { Metadata } from "next";
import { Be_Vietnam_Pro, Roboto } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '../components/navbar/Navbar';
import {ThemeProvider} from '@/context/ThemeContext';
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
    <AuthProvider>

            <html lang="en">
              <body
                className={`${beVietnamPro.className} ${roboto.className} antialiased`}
                >
                <ThemeProvider>
                <div className="min-h-screen flex flex-col">
                    <Navbar />
                      {children}
                </div>
                </ThemeProvider>
              </body>
            </html>
    </AuthProvider>
  );
}

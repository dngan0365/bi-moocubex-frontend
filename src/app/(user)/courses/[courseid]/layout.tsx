'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const params = useParams();
  const pathname = usePathname();
  const courseid = params.courseid as string;

  // Function to determine if a link is active
  const isActive = (path: string) => {
    return pathname === path;
  };

  // Dynamic class based on active state and theme
  const getLinkClassName = (path: string) => {
    const baseClasses = "px-3 py-2 text-sm font-medium rounded-md";
    const activeClasses = "bg-cyan-400/10 text-cyan-500";
    const inactiveClasses = theme === 'dark' ? "text-gray-200 hover:bg-gray-700/50" : "text-gray-600 hover:bg-gray-100";
    
    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  // Container theme classes
  const containerClasses = theme === 'dark' 
    ? "flex flex-col min-h-screen bg-gray-700 text-white" 
    : "flex flex-col min-h-screen bg-white text-black";

  // Nav bar theme classes
  const navBarClasses = theme === 'dark'
    ? "border-b border-gray-700 bg-gray-800"
    : "border-b border-gray-200 bg-white";

  return (
    <div className={containerClasses}>
      <div className={navBarClasses}>
        <nav className="flex space-x-8 px-6 py-4">
          <Link
            href={`/courses/${courseid}/dashboard`}
            className={getLinkClassName(`/courses/${courseid}/dashboard`)}
          >
            Course Dashboard
          </Link>
          <Link
            href={`/courses/${courseid}/user`}
            className={getLinkClassName(`/courses/${courseid}/user`)}
          >
            List User
          </Link>
        </nav>
      </div>

      <main className="flex-1">{children}</main>
    </div>
  );
}
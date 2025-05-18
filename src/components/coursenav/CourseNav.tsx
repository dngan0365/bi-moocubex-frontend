'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

export default function CourseNav() {
  const { theme } = useTheme();
  const params = useParams();
  const pathname = usePathname();
  const courseid = params.courseid as string;

  const isActive = (path: string) => pathname === path;

  const getLinkClassName = (path: string) => {
    const base = "px-3 py-2 text-sm font-medium rounded-md";
    const active = "bg-cyan-400/10 text-cyan-500";
    const inactive = theme === 'dark'
      ? "text-gray-200 hover:bg-gray-700/50"
      : "text-gray-600 hover:bg-gray-100";

    return `${base} ${isActive(path) ? active : inactive}`;
  };

  return (
    <div className={theme === 'dark' ? "border-b border-gray-700 bg-gray-800" : "border-b border-gray-200 bg-white"}>
      <nav className="flex space-x-8 px-6 py-4">
        <Link href={`/courses/${courseid}/dashboard`} className={getLinkClassName(`/courses/${courseid}/dashboard`)}>
          Course Dashboard
        </Link>
        <Link href={`/courses/${courseid}/user`} className={getLinkClassName(`/courses/${courseid}/user`)}>
          List User
        </Link>
      </nav>
    </div>
  );
}

'use client';
import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { BookOpen, Users, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

// Course interface
interface Course {
  id: string;
  name: string;
  description: string;
  university: string;
  enrolledUsers: number;
}

// Course Card Component
const CourseCard = ({ course }: { course: Course }) => {
  const { theme } = useTheme();

  return (
    <div className={`rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.01] ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <div className="relative h-40 bg-gradient-to-r from-cyan-200 to-cyan-500">
        <div className="absolute inset-0 flex items-center justify-center ">
          <BookOpen className=" w-12 h-12 opacity-30" />
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-medium bg-cyan-400/10 text-cyan-500 px-2 py-1 rounded-full">
              {course.id}
            </span>
            <h3 className={`mt-2 text-xl font-bold ${theme === "dark"? '#fff' : "text-gray-800"}`}>{course.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{course.description}</p>
          </div>
          <Link
            href={`/courses/${course.id}/dashboard`}
            className={`bg-cyan-50 p-2 rounded-full text-cyan-500 bg-cyan-400/5 hover:bg-cyan-400/10 transition-colors`}
          >
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="mt-4 flex items-center justify-between border-t pt-4 border-gray-100">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-cyan-400/10">
              <BookOpen className="w-3 h-3  text-cyan-500" />
            </div>
            <span className="ml-2 text-sm text-gray-600">{course.university}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Users className="w-4 h-4 mr-1" />
            {course.enrolledUsers.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

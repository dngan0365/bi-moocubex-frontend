
'use client'
import React, { useState } from 'react';
import { Search, BookOpen, Users, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext'
import CourseCard from '@/components/coursecard/CourseCard';

// Course interface
interface Course {
  id: string;
  name: string;
  description: string;
  university: string;
  enrolledUsers: number;
}

// Mock course data
const mockCourses: Course[] = [
  {
    id: 'C_123456',
    name: '巴蜀文化',
    description: '《资治通鉴》导读',
    university: '清华大学',
    enrolledUsers: 617155
  },
  {
    id: 'C_15721',
    name: '数据挖掘：理论与算法',
    description: '《资治通鉴》导读',
    university: '清华大学',
    enrolledUsers: 617155
  },
  {
    id: 'C_19284',
    name: '大学计算机',
    description: '《资治通鉴》导读',
    university: '清华大学',
    enrolledUsers: 617155
  },
  {
    id: 'C_13849',
    name: '大学物理1（力学、热学）',
    description: '《资治通鉴》导读',
    university: '清华大学',
    enrolledUsers: 617155
  }
];


const CoursesPage: React.FC = () => {
  const { theme } = useTheme()

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = mockCourses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`} >
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className={`h-5 w-5 ${theme === "dark" ? "text-gray-100": "text-gray-400"} `} />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm khóa học bằng tên hoặc ID..."
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500  shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Không tìm thấy khóa học</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
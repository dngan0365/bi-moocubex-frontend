'use client'

import React, { useState, useEffect } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext'
import CourseCard from '@/components/coursecard/CourseCard';

interface Course {
  course_id: string;
  name: string;
  school: string;
  start_date: string;
  end_date: string;
  user_count: string;
}

const CoursesPage: React.FC = () => {
  const { theme } = useTheme();

  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://uz71shye78.execute-api.us-east-1.amazonaws.com/dev/api/course-enrollments')
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load courses:', err);
        setLoading(false);
      });
  }, []);

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.course_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-400'}`} />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm khóa học bằng tên hoặc ID..."
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="text-center text-lg">Đang tải dữ liệu...</div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Không tìm thấy khóa học</h3>
            <p className="mt-1 text-gray-500">Thử điều chỉnh từ khóa tìm kiếm</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <CourseCard
                key={index}
                course={{
                  id: course.course_id,
                  name: course.name,
                  description: `${course.school || '未知学校'} | ${course.start_date} → ${course.end_date}`,
                  university: course.school,
                  enrolledUsers: parseInt(course.user_count, 10),
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;

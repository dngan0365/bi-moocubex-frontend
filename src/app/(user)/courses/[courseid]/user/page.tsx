'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Eye, Calendar, School, User } from 'lucide-react';
import { useTheme } from "@/context/ThemeContext"
import CourseNav from '@/components/coursenav/CourseNav';

// User interface
interface User {
  id: string;
  school: string;
  enrollDate: string;
}

// Mock user data
const mockUsers: User[] = [
  {
    id: 'U_123456',
    school: '巴蜀文化',
    enrollDate: '2023-10-02',
  },
  {
    id: 'U_15721',
    school: '数据挖掘',
    enrollDate: '2023-10-02',
  },
  {
    id: 'U_19284',
    school: '大学计算机',
    enrollDate: '2023-10-05',
  },
  {
    id: 'U_13849',
    school: '大学物理',
    enrollDate: '2023-10-07',
  }
];

const UserListItem = ({ user }: { user: User }) => {
  const { theme } = useTheme();

  return (
    <div className={`border-b transition-colors ${theme === "dark" ? 'bg-gray-900 text-white hover:bg-gray-700' : 'bg-white text-black hover:bg-gray-50'}`}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 w-10 h-10 bg-cyan-400/10 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-cyan-500" />
          </div>
          <div>
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{user.id}</p>
          </div>
        </div>

        <div className="flex items-center mt-1 justify-between space-x-4">
          <School className="w-3.5 h-3.5 text-gray-500 mr-1" />
          <p className="text-sm text-gray-500">{user.school}</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center text-sm text-gray-500">
            <Calendar className="w-3.5 h-3.5 mr-1" />
            <span>{new Date(user.enrollDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}</span>
          </div>

          <Link
            href={`./user/${user.id}`}
            className="p-2 text-cyan-500 hover:text-cyan-600 hover:bg-cyan-400/5 rounded-full transition-colors"
          >
            <Eye className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const UsersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();

  const filteredUsers = mockUsers.filter(user =>
    user.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen pd-4 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
      <CourseNav/>
      <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Danh sách học viên</h1>
            <p className="text-gray-500 mt-1">Quản lý và xem tất cả người dùng hệ thống</p>
          </div>
          <div className="hidden sm:block bg-white rounded-md shadow-sm px-3 py-1 text-sm text-gray-500 border border-gray-200">
            {filteredUsers.length} học viên
          </div>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm bằng ID..."
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm"

            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={`rounded-lg shadow overflow-hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
          <div className={`px-4 py-3 border-b ${theme === 'dark' ? 'border-gray-800 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex items-center justify-between">
              <div className="flex space-x-6 sm:space-x-6">
                <div className="text-xs font-medium text-gray-500 uppercase">User ID</div>
                <div className="text-xs font-medium text-gray-500 uppercase">Trường học</div>

              </div>
              <div className="text-xs font-medium text-gray-500 uppercase pl-2">School</div>
              <div className="flex space-x-6 sm:space-x-12">
                <div className="hidden sm:block text-xs font-medium text-gray-500 uppercase">Đăng kí</div>
                <div className="text-xs font-medium text-gray-500 uppercase">Xem</div>
              </div>
            </div>
          </div>

          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <User className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mt-3 text-base font-medium text-gray-900">Không tìm thấy học viên</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search terms</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <UserListItem key={user.id} user={user} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;

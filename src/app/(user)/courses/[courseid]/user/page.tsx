'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Eye, Calendar, School, User } from 'lucide-react';
import { useTheme } from "@/context/ThemeContext"

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
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
      <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-500 mt-1">Manage and view all system users</p>
          </div>
          <div className={`hidden sm:block rounded-md shadow-sm px-3 py-1 text-sm border ${theme === 'dark' ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white text-gray-500 border-gray-200'}`}>
            {filteredUsers.length} users
          </div>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by ID or School..."
            className={`block w-full pl-10 pr-3 py-2.5 rounded-lg focus:ring-2 shadow-sm
              ${theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500'
                : 'bg-white border-gray-200 text-black placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500'}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={`rounded-lg shadow overflow-hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
          <div className={`px-4 py-3 border-b ${theme === 'dark' ? 'border-gray-800 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex items-center justify-between">
              <div className="flex space-x-6 sm:space-x-12">
                <div className="text-xs font-medium text-gray-500 uppercase"></div>
                <div className="text-xs font-medium text-gray-500 uppercase">User ID</div>
              </div>
              <div className="text-xs font-medium text-gray-500 uppercase pl-2">School</div>
              <div className="flex space-x-6 sm:space-x-12">
                <div className="hidden sm:block text-xs font-medium text-gray-500 uppercase">Enrolled</div>
                <div className="text-xs font-medium text-gray-500 uppercase">Detail</div>
              </div>
            </div>
          </div>

          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <User className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className={`mt-3 text-base font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>No users found</h3>
              <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Try adjusting your search terms</p>
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

'use client';
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import CourseNav from '@/components/coursenav/CourseNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <CourseNav/>
      {children}
    </div>
  );
}
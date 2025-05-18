'use client'

import * as React from 'react';

import Sidebar from '@/components/sidebar/Sidebar';
export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      {/* <AuthRedirect /> */}
      <div className="flex flex-1 pt-16 h-[calc(100vh-4rem)]">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </>
  );
}

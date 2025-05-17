'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export function AuthRedirect() {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait until authentication check is completed
    if (loading) return;

    if (isAuthenticated && user) {
    } else {
        router.push('/');
    }
  }, [isAuthenticated, user, loading, router]);

  return null;
}

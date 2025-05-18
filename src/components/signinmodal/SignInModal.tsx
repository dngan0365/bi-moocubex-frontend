'use client';
import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext'; // ✅ Import theme context

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal: FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, isAuthenticated, clearError, user } = useAuth();
  const { theme } = useTheme(); // ✅ Get theme value

  // useEffect(() => {
  //   if (isAuthenticated && user) {
  //     onClose();
  //     router.push('/');
  //   }
  // }, [isAuthenticated, user, router, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
    }
  }, [isOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    await login(email, password);
    onClose();
  };

  if (!isOpen) return null;

  // ✅ Conditional theme classes
  const isDark = theme === 'dark';
  const modalBg = isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-800';
  const inputBg = isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800';
  const inputFocus = isDark ? 'focus:ring-cyan-500 focus:border-cyan-500' : 'focus:ring-blue-500 focus:border-blue-500';
  const closeButton = isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600';
  const helpLink = isDark ? 'text-gray-300 hover:underline' : 'text-gray-700 hover:underline';

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className={`rounded-2xl p-8 w-full max-w-md relative mx-4 shadow-xl ${modalBg}`}>
        {/* Close button */}
        <button onClick={onClose} className={`absolute right-6 top-6 ${closeButton}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h1 className="text-3xl font-medium mb-8">Sign in</h1>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              required
              className={`w-full px-4 py-3 rounded-lg border outline-none ${inputBg} ${inputFocus}`}
              placeholder="Nhập email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password">Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm flex items-center text-gray-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      showPassword
                        ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    }
                  />
                </svg>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              required
              className={`w-full px-4 py-3 rounded-lg border outline-none ${inputBg} ${inputFocus}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-cyan-500 text-white font-medium rounded-full hover:bg-cyan-400 transition-colors mb-6"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          {/* Help link */}
          <div className="flex justify-between items-center mb-4">
            <Link href="/help" className={helpLink}>
              Need help?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInModal;

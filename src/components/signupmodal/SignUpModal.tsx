'use client';
import { FC, useState, useEffect  } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, loading, error, isAuthenticated, clearError } = useAuth();
  
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isOpen) return null;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    await register(username, email, password);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="bg-white rounded-2xl p-8 w-full max-w-lg relative mx-4 shadow-xl">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex flex-col mb-8">
        <h1 className="text-3xl font-medium text-gray-800 mb-4">Create an account</h1>
        <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="./" className="text-blue-600 hover:underline">
            Log in
            </Link>
        </p>
        </div>
        
        <form onSubmit={handleRegister}>
        {/* Name field */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-600 mb-2">
                What should we call you?
            </label>
            <input
              type="text"
              id="name"
              name="username"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder='Enter your profile name'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/* Email/Phone field */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-600 mb-2">
              What's your email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder='Enter your email address'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          {/* Password field */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="block text-gray-600">
                Create a password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 flex items-center"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d={showPassword 
                      ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" 
                      : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    } 
                  />
                </svg>
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder='Enter your password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className='text-sm text-gray-600'>Use 8 or more characters with a mix of letters, numbers & symbols</p>
          </div>
          
          {/* Sign up button */}
        {/* Sign up button section */}
        <p className="text-sm text-gray-600 mb-4">
            By creating an account, you agree to the{' '}
            <Link href="./" className="underline">
                Terms of Use
            </Link>{' '}
            and{' '}
            <Link href="./" className="underline">
                Privacy Policy
            </Link>.
        </p>

        <button
            type="submit"
            className="w-full py-3 bg-cyan-500 text-white font-medium rounded-full hover:bg-cyan-300 transition-colors mb-6"
            >
            Create an account
        </button>

        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
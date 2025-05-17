'use client';
import Link from 'next/link';
import Image from 'next/image';
import { FC, useState } from 'react';
import SignInModal from '../signinmodal/SignInModal';
import SignUpModal from '../signupmodal/SignUpModal';
import { useAuth } from "@/context/AuthContext";
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from '@/components/themetoggle/ThemeToggle';
import { useRouter } from "next/navigation";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar: FC = () => {
  const { theme } = useTheme();
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const handleLogout = () => {
    setShowSignInModal(false);
    setShowSignUpModal(false);
    logout();
    router.push(`/`);
  };

  const navBg = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800';
  const menuBg = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-30 ${navBg} shadow-md`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/img/analysis.png"
              alt="Logo"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="text-cyan-500 font-bold text-xl">BI MOOCCubeX</span>
          </Link>

          <div className="flex items-center space-x-2">
            <Link href="/about" className="text-cyan-500 font-bold hover:text-cyan-400">Giới thiệu</Link>
            <span className="text-cyan-500 font-bold">|</span>
            <Link href="/experiment" className="text-cyan-500 font-bold hover:text-cyan-400">Kết quả thực nghiệm</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <Link href="/overview" className="px-4 py-2 rounded-full bg-cyan-500 text-white font-medium hover:bg-cyan-400 transition-colors">
                  Giao diện BI
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
                <Link href="/profile">
                  <AccountCircleIcon style={{ width: '45px', height: '45px' }} className="text-cyan-500" />
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowSignInModal(true)}
                  className="px-5 py-2 rounded-full border border-cyan-500 text-cyan-500 font-medium hover:bg-gray-100 transition-colors"
                >
                  Log in
                </button>
                <button
                  onClick={() => setShowSignUpModal(true)}
                  className="px-5 py-2 rounded-full bg-cyan-500 text-white font-medium hover:bg-cyan-400 transition-colors"
                >
                  Sign up
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <CloseIcon className="text-cyan-500" />
              ) : (
                <MenuIcon className="text-cyan-500" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className={`md:hidden px-4 pb-4 pt-2 space-y-3 ${menuBg} transition-all`}>
            <div className="flex justify-between items-center">
              <ThemeToggle />
            </div>
            {isAuthenticated ? (
              <>
                <Link href="/overview" className="block px-4 py-2 rounded bg-cyan-500 text-white hover:bg-cyan-400">
                  Giao diện BI
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  Logout
                </button>
                <Link href="/profile" className="block text-cyan-600 px-4">
                  <AccountCircleIcon style={{ width: '35px', height: '35px' }} />
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => { setShowSignInModal(true); setIsOpen(false); }}
                  className="w-full text-left px-4 py-2 rounded border border-cyan-500 text-cyan-500 hover:bg-gray-200"
                >
                  Log in
                </button>
                <button
                  onClick={() => { setShowSignUpModal(true); setIsOpen(false); }}
                  className="w-full text-left px-4 py-2 rounded bg-cyan-500 text-white hover:bg-cyan-400"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Modals */}
      <SignInModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
      />
      <SignUpModal
        isOpen={showSignUpModal}
        onClose={() => setShowSignUpModal(false)}
      />
    </>
  );
};

export default Navbar;

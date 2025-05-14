'use client';
import Link from 'next/link';
import Image from 'next/image'
import { FC, useState } from 'react';
import SignInModal from '../signinmodal/SignInModal';
import SignUpModal from '../signupmodal/SignUpModal';
import { useAuth } from "@/context/AuthContext"
import { usePathname, useRouter } from "next/navigation"

const Navbar: FC = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const { isAuthenticated, user, logout } = useAuth()
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push(`/`);
  };

  return (
    <>
      <nav className="bg-white py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
                src="/img/analysis.png"
                alt="Logo"
                width={40}
                height={40}
                className="h-10 w-10"
            />
            <span className="text-cyan-700 font-bold text-xl">BI MOOCCubeX</span>
          </Link>
          
          <div className="space-x-3">
        {isAuthenticated ? (
          <>
              <Link href={`/overview`}>
                <button
                    onClick={logout}
                    className="ml-4 px-4 py-2 rounded-full bg-cyan-500 text-white font-medium hover:bg-cyan-400 transition-colors"
                  >
                    Giao diện BI
                </button>
              </Link>

              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
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
        )
        }

          </div>
        </div>
      </nav>

      {/* Sign In Modal */}

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
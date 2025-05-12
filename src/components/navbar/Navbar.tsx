'use client';
import Link from 'next/link';
import Image from 'next/image'
import { FC, useState } from 'react';
import SignInModal from '../signinmodal/SignInModal';
import SignUpModal from '../signupmodal/SignUpModal';

const Navbar: FC = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

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
            <span className="text-gray-700 font-medium">BI MOOCCubeX</span>
          </Link>
          
          <div className="space-x-3">
            <button
              onClick={() => setShowSignInModal(true)}
              className="px-5 py-2 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Log in
            </button>
            <button
                onClick={() => setShowSignUpModal(true)}
                className="px-5 py-2 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
                >
                Sign up
            </button>
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
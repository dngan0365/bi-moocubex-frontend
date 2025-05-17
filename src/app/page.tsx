'use client';
import { NextPage } from 'next';
import { useState } from 'react';
import SignInModal from '../components/signinmodal/SignInModal';
import { useTheme } from '@/context/ThemeContext';

const Home = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const { theme } = useTheme();

  const bgColor = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900';
  const cardBg = theme === 'dark' ? 'bg-white/10 text-white' : 'bg-white/80 text-gray-900';
  const inputBg = theme === 'dark' ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-white text-gray-900';

  return (
    <div className={`min-h-screen bg-[url('/img/hero-bg.png')] bg-cover bg-center bg-no-repeat ${bgColor}`}>
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-20 py-12 md:py-20 flex flex-col md:flex-row items-center">
            {/* Left content */}
            <div className={`w-full md:w-1/2 p-10 md:px-12 md:py-24 ${cardBg} backdrop-blur-md rounded-3xl shadow-xl`}>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Learn with Insight<br />
                Decide with Data
              </h1>
              <p className="text-lg mb-8">
                Unlock the power of educational data. Our platform transforms raw information into actionable insights — helping schools, educators, and institutions make smarter, data-driven decisions for student success.
              </p>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex-grow">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className={`w-full px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${inputBg}`}
                  />
                </div>
                <button 
                  className="px-6 py-3 bg-cyan-500 text-white font-medium rounded-full hover:bg-gray-600 transition-colors"
                  onClick={() => setShowSignInModal(true)}
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sign In Modal */}
      <SignInModal 
        isOpen={showSignInModal} 
        onClose={() => setShowSignInModal(false)} 
      />

    </div>
  );
};

export default Home;

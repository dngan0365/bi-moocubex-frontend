'use client';
// pages/index.tsx
import Head from 'next/head';
import { NextPage } from 'next';
import { useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import SignInModal from '../components/signinmodal/SignInModal';

const Home: NextPage = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);

  return (
    <div className="min-h-screen bg-[url('/img/hero-bg.png')] bg-cover bg-center bg-no-repeat">
      <Head>
        <title>GrowthEdu - Educational Analytics Platform</title>
        <meta name="description" content="Transform educational data into actionable insights" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 md:py-20 flex flex-col md:flex-row items-center">
            {/* Left content */}
            <div className="w-full md:w-1/2 p-10 md:px-12 md:py-24 bg-white/10 bg-opacity-50 backdrop-blur-md rounded-3xl shadow-xl">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Learn with Insight<br />
                Decide with Data
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Unlock the power of educational data. Our platform transforms raw information into actionable insights — helping schools, educators, and institutions make smarter, data-driven decisions for student success.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex-grow">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
            
            {/* Right decorative elements */}
            {/* <div className="hidden md:block w-1/2 relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/30 rounded-full blur-2xl"></div>
              <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-200/40 rounded-full blur-xl"></div>
              <div className="absolute top-40 right-40 w-24 h-24 bg-blue-400/20 rounded-full"></div>
            </div> */}
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
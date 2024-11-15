'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithGoogle, signUpWithEmail } from '@/lib/firebase/auth';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isEmailForm, setIsEmailForm] = useState(false);

  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle();
      router.push('/onboarding');
    } catch (error) {
      console.error('Error signing up with Google:', error);
    }
  };

  const handleEmailSignUp = async () => {
    if (!isEmailForm) {
      setIsEmailForm(true);
    } else {
      try {
        await signUpWithEmail(email);
        router.push('/onboarding');
      } catch (error) {
        console.error('Error signing up with email:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Auth Form */}
      <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
        {/* Logo */}
        <div className="mb-8 lg:mb-0">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={120}
            height={40}
            className="max-w-[120px]"
          />
        </div>

        {/* Auth Form */}
        <div className="max-w-md mx-auto w-full py-8 lg:py-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            Create your free account
          </h1>
          <p className="text-gray-600 mb-8">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700">
              Sign In
            </Link>
          </p>

          {/* Auth Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleGoogleSignUp}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Image
                src="/google-icon.svg"
                alt="Google"
                width={20}
                height={20}
              />
              <span className="text-sm sm:text-base">Sign up with Google</span>
            </button>

            {!isEmailForm ? (
              <button
                onClick={() => setIsEmailForm(true)}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm sm:text-base">Sign up with Email</span>
              </button>
            ) : (
              <div className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                />
                <button
                  onClick={handleEmailSignUp}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                >
                  Continue
                </button>
              </div>
            )}
          </div>

          <div className="mt-8 text-xs sm:text-sm text-gray-500">
            By signing up, you agree to our{' '}
            <Link href="/terms" className="text-gray-700 hover:underline">Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-gray-700 hover:underline">Privacy Policy</Link>
          </div>
        </div>

        <div className="hidden lg:block">{/* Bottom spacing for desktop */}</div>
      </div>

      {/* Right Side - Marketing */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-teal-900 to-teal-700 p-4 sm:p-6 lg:p-8">
        <div className="max-w-lg mx-auto h-full flex flex-col justify-center">
          {/* Only show on mobile */}
          <div className="h-32 lg:hidden"></div>
          
          <div className="text-white space-y-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Over 100k companies have built with us.
            </h2>
            
            {/* Company Logos Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 opacity-80">
              {/* Add company logos here */}
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div 
                  key={index}
                  className="bg-white/10 rounded-lg p-4 aspect-video flex items-center justify-center"
                >
                  <div className="text-white/50">Logo {index}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
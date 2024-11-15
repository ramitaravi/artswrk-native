'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path ? 'text-pink-500' : 'text-gray-600 hover:text-gray-900';
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and primary nav */}
          <div className="flex">
            {/* Remove the W logo and just use text */}
            <Link href="/" className="flex items-center text-xl font-semibold text-gray-900">
              Home
            </Link>

            {/* Primary Nav */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 
                  ${pathname === '/' ? 'border-pink-500' : 'border-transparent'}
                  ${isActive('/')}`}
              >
                Home
              </Link>
              <Link 
                href="/companies"
                className={`inline-flex items-center px-1 pt-1 border-b-2 
                  ${pathname === '/companies' ? 'border-pink-500' : 'border-transparent'}
                  ${isActive('/companies')}`}
              >
                Companies
              </Link>
              <Link 
                href="/jobs"
                className={`inline-flex items-center px-1 pt-1 border-b-2 
                  ${pathname === '/jobs' ? 'border-pink-500' : 'border-transparent'}
                  ${isActive('/jobs')}`}
              >
                Jobs
              </Link>
              <Link 
                href="/admin"
                className={`inline-flex items-center px-1 pt-1 border-b-2 
                  ${pathname.startsWith('/admin') ? 'border-pink-500' : 'border-transparent'}
                  ${isActive('/admin')}`}
              >
                Admin
              </Link>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <Link
              href="/jobs/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              Post a Job
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium
              ${pathname === '/' ? 'border-pink-500 text-pink-700 bg-pink-50' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}`}
          >
            Home
          </Link>
          <Link
            href="/companies"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium
              ${pathname === '/companies' ? 'border-pink-500 text-pink-700 bg-pink-50' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}`}
          >
            Companies
          </Link>
          <Link
            href="/jobs"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium
              ${pathname === '/jobs' ? 'border-pink-500 text-pink-700 bg-pink-50' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}`}
          >
            Jobs
          </Link>
          <Link
            href="/admin"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium
              ${pathname.startsWith('/admin') ? 'border-pink-500 text-pink-700 bg-pink-50' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}`}
          >
            Admin
          </Link>
          <Link
            href="/post-job"
            className="block pl-3 pr-4 py-2 text-base font-medium text-pink-600 hover:bg-gray-50"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </nav>
  );
} 
'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function CompaniesPage() {
  // Mock data - in a real app, this would come from an API
  const companies = [
    {
      id: 'ceros',
      name: 'Radix',
      description: 'RADIX Dance Convention. A three-day dance experience touring to 24 cities in the USA.',
      coverImage: '/radix-logo.jpg',
      jobs: [
        { title: 'Merch', count: 3 },
        { title: 'Faculty', count: 2 },
        { title: 'Backstage', count: 1 },
      ]
    },
    {
      id: 'mindsdb',
      name: 'Imagine',
      description: 'From a pool of 5 songs, each finalist will choose their music (from a list presented to the dancers) and have 45 seconds to dance their hearts out.',
      coverImage: '/Imagine-Logo-9.png',
      jobs: [
        { title: 'Registration', count: 1 },
        { title: 'Tabulator', count: 1 },
        { title: 'Judges', count: 1 },
      ]
    },
    {
      id: 'kalderos',
      name: 'JUMP',
      description: 'JUMP is proud to be the largest dance convention in the world, touring to 28 US cities and 3 international cities. ',
      coverImage: '/jump images (10).jpeg',
      jobs: [
        { title: 'HR', count: 1 },
        { title: 'Admin', count: 2 },
      ]
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex justify-center gap-2">
          <button className="px-4 py-2 rounded-full hover:bg-gray-100">All</button>
          <button className="px-4 py-2 rounded-full hover:bg-gray-100">Jobs</button>
          <button className="px-4 py-2 rounded-full bg-yellow-300">Brands</button>
          <button className="px-4 py-2 rounded-full hover:bg-gray-100">Collections</button>
        </div>
      </div>

      {/* Companies Section */}
      <h1 className="text-2xl font-semibold mb-6">Open Jobs (52)</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => (
          <Link 
            key={company.id}
            href={`/companies/${company.id}`}
            className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src={company.coverImage}
                alt={company.name}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 right-4">
              </div>
            </div>
            
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{company.name}</h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {company.description}
              </p>
              
              <div className="flex items-center text-sm">
                <span className="text-gray-600 mr-2">Jobs:</span>
                <div className="flex gap-2 overflow-x-auto">
                  {company.jobs.map((job, index) => (
                    <span key={index} className="whitespace-nowrap">
                      {job.count} {job.title}
                      {index < company.jobs.length - 1 && <span className="mx-1">•</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 
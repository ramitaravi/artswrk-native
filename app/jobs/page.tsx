'use client';


import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  createdDate: any;
}

export default function JobsPage() {
  const [location, setLocation] = useState('New York, NY, USA');
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedFilters, setSelectedFilters] = useState({
    artistType: '',
    serviceType: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Load jobs from localStorage
  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    // Add default coordinates for map if not present
    const jobsWithCoordinates = savedJobs.map(job => ({
      ...job,
      coordinates: { lat: 40.7128, lng: -74.0060 }, // Default to NYC coordinates
    }));
    setJobs(jobsWithCoordinates);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        {/* Left Column - Job Listings */}
        <div className="overflow-y-auto border-r border-gray-200">
          <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold mb-6 flex items-center">
              Jobs For You 
              <span className="ml-2 text-gray-500">({jobs.length})</span>
            </h1>

            {/* Search and Filters */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search Jobs..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Location"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <select
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={selectedFilters.artistType}
                  onChange={(e) => setSelectedFilters(prev => ({ ...prev, artistType: e.target.value }))}
                >
                  <option value="">Artist Type</option>
                  <option value="dance">Dance Teacher</option>
                  <option value="music">Music Teacher</option>
                </select>
                <select
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={selectedFilters.serviceType}
                  onChange={(e) => setSelectedFilters(prev => ({ ...prev, serviceType: e.target.value }))}
                >
                  <option value="">Service Type</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="flexible">Flexible</option>
                  <option value="single">Single Date</option>
                </select>
                <button
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  onClick={() => setSelectedFilters({ artistType: '', serviceType: '' })}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="p-6 space-y-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    {/* Placeholder for company logo */}
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{job.jobTitle}</h3>
                    <p className="text-gray-600">{job.company.name}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-sm text-gray-500 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {job.company.location}
                      </span>
                      <span className="text-sm text-gray-500">{job.dateType}</span>
                    </div>
                    <p className="mt-2 text-gray-600">{job.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">
                          {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                        <span className="text-sm font-medium text-green-600">
                          {job.rateType === 'fixed' ? `$${job.hourlyRate}/hr` : 'Rate Negotiable'}
                        </span>
                      </div>
                      <Link 
                        href={`/jobs/${job.id}`}
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Apply
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Map */}
        <div className="hidden lg:block relative">
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
            <GoogleMap
              mapContainerClassName="w-full h-screen"
              center={{ lat: 40.7128, lng: -74.0060 }}
              zoom={11}
            >
              {jobs.map((job) => (
                <Marker
                  key={job.id}
                  position={job.coordinates || { lat: 40.7128, lng: -74.0060 }}
                  title={job.jobTitle}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
}
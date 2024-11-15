'use client';

import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/solid';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  postedDate: string;
  description: string;
  responsibilities: string[];
  budget: string;
  deliveryTime: string;
  tags: string[];
}

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  // This would normally fetch from an API based on the ID
  const job: Job = {
    id: params.id,
    title: "Product Designer for Construction Leads & Opportunities Application",
    company: "ConceptLAB",
    location: "Remote",
    salary: "$500 - $1,000",
    type: "One-time",
    postedDate: "Oct 1, 2024",
    description: "ConceptLAB is seeking a talented product designer with a minimalist yet functional aesthetic to design an application focused on discovering Leads and Opportunities in the Construction Industry. The main goal is to enable users to filter and discover projects by status in the most simple and intuitive way.",
    responsibilities: [
      "Design intuitive and user-friendly interfaces for the application.",
      "Develop minimalist and functional design concepts that align with the application's goals.",
      "Collaborate with developers to ensure design feasibility and integration.",
      "Create wireframes, mockups, and prototypes to illustrate design ideas."
    ],
    budget: "$500 - $1,000",
    deliveryTime: "2 weeks",
    tags: ["Product Designer", "Figma"]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <Link href="/" className="text-gray-400 hover:text-gray-500">
                <HomeIcon className="h-5 w-5" />
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                <Link href="/jobs" className="ml-4 text-gray-500 hover:text-gray-700">
                  Jobs
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                <span className="ml-4 text-gray-700 font-medium truncate">
                  {job.title}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Job Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                <div className="mt-2 flex items-center text-gray-500">
                  <span>{job.company}</span>
                  <span className="mx-2">•</span>
                  <span>{job.location}</span>
                  <span className="mx-2">•</span>
                  <span>Posted {job.postedDate}</span>
                </div>
              </div>
              <button
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                onClick={() => alert('Apply functionality to be implemented')}
              >
                Apply Now
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-6">
            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Budget</h3>
                <p className="mt-1 text-lg font-semibold">{job.budget}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Delivery Time</h3>
                <p className="mt-1 text-lg font-semibold">{job.deliveryTime}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Job Type</h3>
                <p className="mt-1 text-lg font-semibold">{job.type}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">About the job</h2>
              <p className="text-gray-600">{job.description}</p>
            </div>

            {/* Responsibilities */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">What you'll be working on</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
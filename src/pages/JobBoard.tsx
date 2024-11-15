import React from 'react';
import { Link } from 'react-router-dom';

export const JobBoard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Job Board</h1>
        <Link
          to="/jobs/create"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
        >
          Post a Job
        </Link>
      </div>
      
      {/* Job listings will go here */}
      <div className="bg-white shadow rounded-lg p-6 mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Senior Developer</h2>
        <div className="text-gray-600">TechCorp</div>
        <div className="text-gray-500">San Francisco, CA</div>
      </div>
    </div>
  );
}; 
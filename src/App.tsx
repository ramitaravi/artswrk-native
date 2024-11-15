import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CreateJobPage } from './pages/CreateJobPage';

function App() {
  return (
    <Router>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header/Navigation */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Job Board</h1>
          <Link
            to="/jobs/create"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Post a Job
          </Link>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<JobBoard />} />
          <Route path="/jobs/create" element={<CreateJobPage />} />
        </Routes>
      </div>
    </Router>
  );
}

// Simple JobBoard component (you can move this to its own file)
function JobBoard() {
  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold">Senior Developer</h2>
        <p className="text-gray-600">TechCorp</p>
        <p className="text-gray-500">San Francisco, CA</p>
      </div>
    </div>
  );
}

export default App; 
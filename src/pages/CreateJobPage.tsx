import React from 'react';
import { JobSubmissionForm } from '../components/JobSubmissionForm';

export const CreateJobPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Post a New Job</h1>
      <JobSubmissionForm />
    </div>
  );
}; 
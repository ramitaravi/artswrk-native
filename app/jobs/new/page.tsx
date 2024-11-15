'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const PLANS = {
  SINGLE: {
    name: 'Single Post',
    price: 25,
    type: 'one-time',
    posts: 1,
    features: ['One job posting', '30 days visibility']
  },
  BASIC: {
    name: 'Monthly Basic',
    price: 50,
    type: 'subscription',
    posts: 3,
    features: ['3 job postings per month', 'Dashboard access']
  },
  PRO: {
    name: 'Monthly Pro',
    price: 100,
    type: 'subscription',
    posts: 'unlimited',
    features: ['Unlimited job postings', 'Featured listings', 'Analytics dashboard']
  },
};

// Add this mock data at the top of your file
const mockCompany = {
  name: "Dance Academy NYC",
  location: "New York, NY",
  logo: "/company-logo.png" // Optional
};

export default function NewJobPage() {
  const [showPricingModal, setShowPricingModal] = useState(true); // Set to true by default since this is the job posting page
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [dateType, setDateType] = useState('ongoing');
  const [rateType, setRateType] = useState('negotiable');
  const [jobDescription, setJobDescription] = useState('');
  const [showDetailedForm, setShowDetailedForm] = useState(false);
  const [serviceType, setServiceType] = useState('dance');
  const [jobTitle, setJobTitle] = useState('');
  const [hourlyRate, setHourlyRate] = useState<number | undefined>();
  const router = useRouter();

  // Mock company data
  const mockCompany = {
    name: "Dance Academy NYC",
    location: "New York, NY",
    logo: "/company-logo.png"
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowPricingModal(false);
    setShowPaymentForm(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setShowPaymentForm(false);
    setShowJobForm(true);
  };

  // Mock function to save job (replace with actual API call later)
  const saveJob = async (jobData: Omit<Job, 'id' | 'createdAt'>) => {
    // Simulate API call
    return {
      ...jobData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Create job object
      const newJob = await saveJob({
        company: mockCompany,
        description: jobDescription,
        serviceType,
        jobTitle,
        dateType,
        rateType,
        hourlyRate: rateType === 'fixed' ? hourlyRate : undefined,
      });

      // Save to localStorage for persistence
      const existingJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
      localStorage.setItem('jobs', JSON.stringify([...existingJobs, newJob]));

      // Show success message
      alert('Job posted successfully!');
      
      // Instead of routing, you could just clear the form
      setJobDescription('');
      setJobTitle('');
      setShowDetailedForm(false);
      
    } catch (error) {
      console.error('Error saving job:', error);
      alert('Failed to post job. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Pricing Modal */}
      {showPricingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-4xl w-full mx-4">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">Choose a Plan</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(PLANS).map(([key, plan]) => (
                <div key={key} className={`border rounded-lg p-6 hover:shadow-lg transition-shadow ${key === 'PRO' ? 'bg-yellow-50 relative' : ''}`}>
                  {key === 'PRO' && (
                    <div className="absolute top-0 right-0 bg-yellow-400 text-xs px-2 py-1 rounded-bl-lg">
                      Best Value
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <p className="text-3xl font-bold mb-4">
                    ${plan.price}<span className="text-sm text-gray-600">{plan.type === 'subscription' ? '/month' : '/post'}</span>
                  </p>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => handlePlanSelect(plan)}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg font-semibold"
                  >
                    Select Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Payment Form Modal */}
      {showPaymentForm && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">Payment Details</h2>
            </div>

            <div className="mb-6">
              <p className="text-lg mb-2">Selected Plan: {selectedPlan.name}</p>
              <p className="text-xl font-bold">${selectedPlan.price} {selectedPlan.type === 'subscription' ? '/month' : ''}</p>
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input type="text" placeholder="4242 4242 4242 4242" className="w-full p-2 border rounded" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input type="text" placeholder="MM/YY" className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                  <input type="text" placeholder="123" className="w-full p-2 border rounded" />
                </div>
              </div>
              <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg font-semibold">
                Pay Now
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Job Posting Form Modal */}
      {showJobForm && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">Post a Job</h2>
              <button onClick={() => setShowJobForm(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Company Header */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-sm text-gray-500">Posting on behalf of</p>
                  <p className="font-medium">{mockCompany.name}</p>
                  <p className="text-sm text-gray-500">{mockCompany.location}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleJobSubmit} className="space-y-6">
              {/* Job Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                <textarea 
                  rows={4} 
                  className="w-full p-2 border rounded"
                  placeholder="Describe the job requirements, experience level needed, and any other relevant details..."
                  value={jobDescription}
                  onChange={(e) => {
                    setJobDescription(e.target.value);
                    if (e.target.value.length > 10) {
                      setShowDetailedForm(true);
                    }
                  }}
                  required
                ></textarea>
                {!showDetailedForm && (
                  <p className="text-sm text-gray-500 mt-2">
                    Start by describing the job. Additional details will appear once you've added a description.
                  </p>
                )}
              </div>

              {/* Show rest of the form only after job description is filled */}
              {showDetailedForm && (
                <>
                  {/* Service Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                    <select 
                      className="w-full p-2 border rounded bg-white"
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      required
                    >
                      <option value="dance">Dance Teacher</option>
                      <option value="music">Music Teacher</option>
                    </select>
                  </div>

                  {/* Job Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded" 
                      placeholder="e.g., Ballet Instructor"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      required
                    />
                  </div>

                  {/* Date Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Type</label>
                    <select 
                      className="w-full p-2 border rounded bg-white"
                      value={dateType}
                      onChange={(e) => setDateType(e.target.value)}
                      required
                    >
                      <option value="ongoing">Ongoing</option>
                      <option value="flexible">Dates Flexible</option>
                      <option value="single">Single Date</option>
                    </select>
                  </div>

                  {/* Rate Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rate</label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="rateType" 
                          value="negotiable" 
                          checked={rateType === 'negotiable'}
                          onChange={(e) => setRateType(e.target.value)}
                          className="mr-2" 
                        />
                        Ask Artists for Rate
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="rateType" 
                          value="fixed" 
                          checked={rateType === 'fixed'}
                          onChange={(e) => setRateType(e.target.value)}
                          className="mr-2" 
                        />
                        Set Hourly Rate
                      </label>
                    </div>
                  </div>

                  {/* Hourly Rate */}
                  {rateType === 'fixed' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate ($)</label>
                      <input 
                        type="number" 
                        className="w-full p-2 border rounded" 
                        placeholder="e.g., 75"
                        value={hourlyRate || ''}
                        onChange={(e) => setHourlyRate(Number(e.target.value))}
                        required={rateType === 'fixed'}
                      />
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg font-semibold"
                  >
                    Post Job
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
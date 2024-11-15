import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobsService } from '../services/jobsService';
import { Timestamp } from 'firebase/firestore';

interface Job {
  title: string;
  company: string;
  location: string;
  description: string;
  rateType: 'FLAT_RATE' | 'HOURLY_RATE' | 'OPEN_RATE';
  rate?: number;
  hours?: number;
  artistType: 'MASTER_ARTIST_TYPE';
  clientEmail: string;
  requestStatus: 'PENDING';
  masterServiceType: 'MASTER_SERVICE_TYPE';
  masterStyles: string[];
  transportation: boolean;
  transportationDetails: string;
  createdDate: Timestamp;
  modifiedDate: Timestamp;
  status: 'AWAITING_RESPONSE';
  boost: boolean;
  converted: boolean;
  direct: boolean;
  ages: [];
  backupArtists: [];
  bookings: [];
  interestedArtists: [];
  interestedArtistsUsers: [];
  sentTo: [];
  creator: {
    id: 'test-user';
    name: 'Test User';
    email: 'test@example.com'
  }
}

export const JobSubmissionForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    rateType: 'FLAT_RATE', // 'FLAT_RATE' | 'HOURLY_RATE' | 'OPEN_RATE'
    rate: 0,
    hours: 0
  });

  const [rateError, setRateError] = useState('');

  const validateRate = (type: string, value: number, hours?: number) => {
    setRateError('');
    if (type === 'HOURLY_RATE') {
      if (value < 15) {
        setRateError('Hourly rate must be at least $15/hour');
        return false;
      }
    } else if (type === 'FLAT_RATE') {
      if (value < 15) {
        setRateError('Flat rate must be at least $15');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.rateType !== 'OPEN_RATE') {
      if (!validateRate(formData.rateType, formData.rate, formData.hours)) {
        return;
      }
    }

    try {
      const jobData = {
        ...formData,
        createdDate: Timestamp.now(),
        modifiedDate: Timestamp.now(),
        status: 'AWAITING_RESPONSE',
        boost: false,
        converted: false,
        direct: false,
        creator: {
          id: 'test-user',
          name: 'Test User',
          email: 'test@example.com'
        }
      };

      const jobId = await jobsService.createJob(jobData);
      console.log('Job created with ID:', jobId);
      navigate('/');
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Error creating job. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Post a New Job</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Title
          </label>
          <input
            type="text"
            placeholder="e.g., Senior Developer"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <input
            type="text"
            placeholder="Your company name"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            placeholder="e.g., San Francisco, CA"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rate Type
          </label>
          <select
            value={formData.rateType}
            onChange={(e) => {
              setFormData({
                ...formData, 
                rateType: e.target.value,
                rate: 0,
                hours: 0
              });
              setRateError('');
            }}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            required
          >
            <option value="FLAT_RATE">Flat Rate</option>
            <option value="HOURLY_RATE">Hourly Rate</option>
            <option value="OPEN_RATE">Open Rate (Artist Proposes Rate)</option>
          </select>
        </div>

        {formData.rateType !== 'OPEN_RATE' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {formData.rateType === 'FLAT_RATE' ? 'Flat Rate Amount' : 'Hourly Rate'}
              <span className="text-gray-500 text-sm ml-2">
                (Minimum: ${formData.rateType === 'FLAT_RATE' ? '15 total' : '15/hour'})
              </span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">$</span>
              <input
                type="number"
                value={formData.rate}
                onChange={(e) => {
                  const newRate = Number(e.target.value);
                  setFormData({...formData, rate: newRate});
                  validateRate(formData.rateType, newRate, formData.hours);
                }}
                min="15"
                step="0.01"
                placeholder="0.00"
                className={`w-full p-3 pl-8 border border-gray-300 rounded-lg shadow-sm ${
                  rateError ? 'border-red-500' : ''
                }`}
                required
              />
            </div>
            {rateError && (
              <p className="text-red-500 text-sm mt-1">{rateError}</p>
            )}
          </div>
        )}

        {formData.rateType === 'HOURLY_RATE' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expected Hours
            </label>
            <input
              type="number"
              value={formData.hours}
              onChange={(e) => {
                const newHours = Number(e.target.value);
                setFormData({...formData, hours: newHours});
                validateRate(formData.rateType, formData.rate, newHours);
              }}
              min="1"
              placeholder="0"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            placeholder="Job description..."
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            rows={6}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};
'use client';

import { useFormContext } from 'react-hook-form';

export default function CompanyInfo() {
  const { register, formState: { errors } } = useFormContext();

  const industryOptions = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Entertainment',
    'Retail',
    'Other'
  ];

  const companySizeOptions = [
    '1-10',
    '11-50',
    '51-200',
    '201-500',
    '500+'
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Company Information</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            {...register('companyName', { required: 'Company name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.companyName && (
            <p className="mt-1 text-sm text-red-600">{errors.companyName.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Industry
          </label>
          <select
            {...register('industry', { required: 'Please select an industry' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select Industry</option>
            {industryOptions.map((industry) => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
          {errors.industry && (
            <p className="mt-1 text-sm text-red-600">{errors.industry.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Size
          </label>
          <select
            {...register('companySize')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select Company Size</option>
            {companySizeOptions.map((size) => (
              <option key={size} value={size}>{size} employees</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Website
          </label>
          <input
            type="url"
            {...register('website', {
              pattern: {
                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                message: 'Please enter a valid URL'
              }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="https://example.com"
          />
          {errors.website && (
            <p className="mt-1 text-sm text-red-600">{errors.website.message as string}</p>
          )}
        </div>
      </div>
    </div>
  );
} 
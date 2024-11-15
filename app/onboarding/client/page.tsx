'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createClientProfile } from '@/lib/firebase/client';
import toast from 'react-hot-toast';

// Step Components
import PersonalInfo from './steps/PersonalInfo';
import ContactInfo from './steps/ContactInfo';
import CompanyInfo from './steps/CompanyInfo';
import Review from './steps/Review';

interface OnboardingFormData {
  // Personal Info
  firstName: string;
  lastName: string;
  profileImage?: File;
  
  // Contact Info
  email: string;
  phone: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  
  // Company Info
  companyName?: string;
  industry?: string;
  companySize?: string;
  website?: string;
}

const validationSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  location: z.object({
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().min(1, 'Please select a country'),
  }),
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  industry: z.string().min(1, 'Please select an industry'),
  companySize: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  profileImage: z.any().optional(),
});

export default function ClientOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const methods = useForm<OnboardingFormData>({
    resolver: zodResolver(validationSchema),
  });

  const totalSteps = 4;

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: OnboardingFormData) => {
    try {
      await createClientProfile(data);
      toast.success('Profile created successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-1/4 h-2 rounded-full mx-1 ${
                  step <= currentStep ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <div className="text-center text-sm text-gray-500">
            Step {currentStep} of {totalSteps}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {currentStep === 1 && <PersonalInfo />}
              {currentStep === 2 && <ContactInfo />}
              {currentStep === 3 && <CompanyInfo />}
              {currentStep === 4 && <Review />}

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Back
                  </button>
                )}
                
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600"
                  >
                    Complete Setup
                  </button>
                )}
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
} 
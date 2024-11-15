'use client';

import { useFormContext } from 'react-hook-form';
import Image from 'next/image';

export default function Review() {
  const { watch } = useFormContext();
  const formData = watch();

  const sections = [
    {
      title: 'Personal Information',
      fields: [
        { label: 'First Name', value: formData.firstName },
        { label: 'Last Name', value: formData.lastName },
      ]
    },
    {
      title: 'Contact Information',
      fields: [
        { label: 'Email', value: formData.email },
        { label: 'Phone', value: formData.phone },
        { label: 'Location', value: `${formData.location?.city}, ${formData.location?.state}, ${formData.location?.country}` },
      ]
    },
    {
      title: 'Company Information',
      fields: [
        { label: 'Company Name', value: formData.companyName },
        { label: 'Industry', value: formData.industry },
        { label: 'Company Size', value: formData.companySize },
        { label: 'Website', value: formData.website },
      ]
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Review Your Information</h2>

      {formData.profileImage && (
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20">
            <Image
              src={URL.createObjectURL(formData.profileImage)}
              alt="Profile preview"
              fill
              className="rounded-full object-cover"
            />
          </div>
        </div>
      )}

      {sections.map((section) => (
        <div key={section.title} className="border rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-3">{section.title}</h3>
          <dl className="grid grid-cols-2 gap-4">
            {section.fields.map((field) => (
              <div key={field.label}>
                <dt className="text-sm font-medium text-gray-500">{field.label}</dt>
                <dd className="mt-1 text-sm text-gray-900">{field.value || 'Not provided'}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
} 
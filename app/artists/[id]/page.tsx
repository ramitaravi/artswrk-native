'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  completedDate: string;
}

interface Artist {
  id: string;
  name: string;
  title: string;
  avatar: string;
  coverImage: string;
  rating: number;
  completedProjects: number;
  hourlyRate: number;
  skills: string[];
  bio: string;
  location: string;
  memberSince: string;
  languages: string[];
  projects: Project[];
}

export default function ArtistProfilePage({ params }: { params: { id: string } }) {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  
  // Mock data - would normally fetch based on params.id
  const artist: Artist = {
    id: '2',
    name: 'Marcus Rodriguez',
    title: 'Visual Designer',
    avatar: 'https://placehold.co/100x100',
    coverImage: 'https://placehold.co/1200x300',
    rating: 4.8,
    completedProjects: 89,
    hourlyRate: 75,
    skills: ['Illustration', 'Brand Design', 'Adobe CC', 'Motion Graphics'],
    bio: 'Creative visual designer specializing in brand identity and illustration.',
    location: 'New York, USA',
    memberSince: 'January 2022',
    languages: ['English', 'Spanish'],
    projects: [
      {
        id: '1',
        title: 'Brand Identity for Tech Startup',
        image: 'https://placehold.co/600x400',
        description: 'Complete brand identity including logo, color palette, and brand guidelines.',
        category: 'Brand Design',
        completedDate: 'December 2023'
      },
      {
        id: '2',
        title: 'Product Illustration Series',
        image: 'https://placehold.co/600x400',
        description: 'Series of custom illustrations for product marketing materials.',
        category: 'Illustration',
        completedDate: 'November 2023'
      },
      // Add more projects as needed
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-80 bg-gray-200">
        <Image
          src={artist.coverImage}
          alt=""
          fill
          className="object-cover"
        />
      </div>

      {/* Profile Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <Image
              src={artist.avatar}
              alt={artist.name}
              width={150}
              height={150}
              className="rounded-full border-4 border-white shadow-lg -mt-20"
            />
            <div className="flex-1 mt-4 md:mt-0">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{artist.name}</h1>
                  <p className="text-xl text-gray-600">{artist.title}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-yellow-400 mb-2">
                    <span className="text-2xl font-bold">{artist.rating}</span>
                    <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">{artist.completedProjects} projects completed</p>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-4">
                <button
                  onClick={() => setIsMessageModalOpen(true)}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Message
                </button>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-gray-900">${artist.hourlyRate}</span>
                  <span className="text-gray-600 ml-1">/hr</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-600">{artist.bio}</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p className="mt-1">{artist.location}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Member since</h3>
                  <p className="mt-1">{artist.memberSince}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Languages</h3>
                  <p className="mt-1">{artist.languages.join(', ')}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {artist.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Projects */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Recent Projects</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {artist.projects.map((project) => (
                  <div key={project.id} className="group">
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <h3 className="mt-3 font-semibold text-gray-900">{project.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{project.category}</p>
                    <p className="mt-2 text-sm text-gray-600">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMessageModalOpen && (
        <MessageModal
          recipientId={artist.id}
          recipientName={artist.name}
          senderId={auth.currentUser?.uid || ''} // You'll need to handle authentication
          senderName={auth.currentUser?.displayName || ''}
          isOpen={isMessageModalOpen}
          onClose={() => setIsMessageModalOpen(false)}
        />
      )}
    </div>
  );
} 
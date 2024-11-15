'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
}

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  const artists: Artist[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      title: 'UI/UX Designer',
      avatar: 'https://placehold.co/100x100',
      coverImage: 'https://placehold.co/600x200',
      rating: 4.9,
      completedProjects: 143,
      hourlyRate: 85,
      skills: ['UI Design', 'User Research', 'Figma', 'Prototyping'],
      bio: 'Passionate designer with 8+ years of experience creating intuitive digital experiences.'
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      title: 'Visual Designer',
      avatar: 'https://placehold.co/100x100',
      coverImage: 'https://placehold.co/600x200',
      rating: 4.8,
      completedProjects: 89,
      hourlyRate: 75,
      skills: ['Illustration', 'Brand Design', 'Adobe CC', 'Motion Graphics'],
      bio: 'Creative visual designer specializing in brand identity and illustration.'
    },
    // Add more sample artists as needed
  ];

  const allSkills = Array.from(
    new Set(artists.flatMap(artist => artist.skills))
  );

  const filteredArtists = artists.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.bio.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSkill = selectedSkill === 'All' || artist.skills.includes(selectedSkill);
    
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header and Search Section */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Browse Artists</h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name, title, or keywords..."
                className="w-full px-4 py-2 border rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border rounded-lg bg-white"
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
            >
              <option value="All">All Skills</option>
              {allSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Artists Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtists.map((artist) => (
            <div key={artist.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={artist.coverImage}
                  alt=""
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <Image
                    src={artist.avatar}
                    alt={artist.name}
                    width={64}
                    height={64}
                    className="rounded-full border-2 border-white"
                  />
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">{artist.name}</h2>
                    <p className="text-gray-600">{artist.title}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-yellow-400">
                      <span className="text-lg font-semibold">{artist.rating}</span>
                      <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500">{artist.completedProjects} projects</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{artist.bio}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {artist.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">${artist.hourlyRate}/hr</span>
                  <div className="space-x-2">
                    <Link
                      href={`/artists/${artist.id}`}
                      className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50"
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedArtist(artist);
                        setIsMessageModalOpen(true);
                      }}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Modal */}
      {isMessageModalOpen && selectedArtist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">Message {selectedArtist.name}</h3>
              <button
                onClick={() => setIsMessageModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <textarea
              className="w-full h-32 p-3 border rounded-lg mb-4"
              placeholder="Type your message here..."
            />
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsMessageModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Message sent!');
                  setIsMessageModalOpen(false);
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
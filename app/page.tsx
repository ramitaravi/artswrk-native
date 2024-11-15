'use client'
import React from 'react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-4">
            <span className="text-purple-600 font-medium uppercase tracking-wide">
              FOR DANCE TEACHERS
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-navy-900 mb-6">
            Join our dance<br />teacher network
          </h1>
          
          <p className="text-xl text-gray-600 mb-10">
            Create your dance[wrk] profile and connect with studios<br />
            across the country.
          </p>
          
          <Link
            href="/auth/signup"
            className="inline-block bg-purple-700 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-800 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Horizontal Scrolling Image Gallery */}
      <section className="max-w-full px-4 pb-20">
        <div className="flex overflow-x-auto space-x-4 pb-4 snap-x snap-mandatory scrollbar-hide scroll-smooth">
          {/* Using placeholder.com for demo images */}
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div 
              key={index} 
              className="flex-none w-72 h-72 rounded-2xl overflow-hidden snap-center"
            >
              <img
                src={`https://picsum.photos/400/400?random=${index}`}
                alt={`Dance pose ${index}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

import Image from 'next/image'
import Link from 'next/link'

const facultyMembers = [
  {
    id: 1,
    name: "Brian Friendman",
    location: "Los Angeles, CA",
    roles: "Master Teacher",
    imageUrl: "/brian-friedman.2813a46.jpg"
  },
  {
    id: 2,
    name: "Tricia Miranda",
    location: "Los Angeles, CA",
    roles: "Master Teacher",
    imageUrl: "/tricia-miranda.c696478.jpg"
  },
  {
    id: 3,
    name: "Tessandra Chavez",
    location: "Los Angeles, CA",
    roles: "Master Teacher",
    imageUrl: "/tessandra-chavez.58acad8.jpg"
  },
  {
    id: 4,
    name: "Tyce Diorio",
    location: "Los Angeles, CA",
    roles: "Master Teacher",
    imageUrl: "/tyce-diorio.4516120.jpg"
  },
  {
    id: 5,
    name: "Wade Robson",
    location: "Los Angeles, CA",
    roles: "Master Teacher",
    imageUrl: "/wade-robson.321fc2d.jpg"
  }
];

export default function BookFacultyPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-16">
        <Image 
          src="/radix-logo.jpg" 
          alt="Radix Dance" 
          width={100}
          height={48}
          className="mx-auto mb-8"
        />
        <h1 className="text-5xl font-bold mb-4">Book Radix Faculty</h1>
        <p className="text-gray-600 text-lg mb-8">
          Book a lesson with world-class faculty from Radix Dance Convention
        </p>
      </div>

      {/* Search Section */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">Book Radix Faculty Online</h2>
        <p className="text-gray-600 mb-6">Browse & book your online lesson</p>
        
        {/* Search Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <input 
            type="text" 
            placeholder="New York, NY, USA" 
            className="p-3 border rounded-md"
          />
          <select className="p-3 border rounded-md">
            <option>Browse by Artist Type</option>
          </select>
          <select className="p-3 border rounded-md">
            <option>Choose a credit</option>
          </select>
          <select className="p-3 border rounded-md">
            <option>Browse by Style</option>
          </select>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {facultyMembers.map((faculty) => (
            <div key={faculty.id} className="flex flex-col group cursor-pointer">
              <div className="aspect-square rounded-lg overflow-hidden mb-3 relative">
                <Image 
                  src={faculty.imageUrl}
                  alt={faculty.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="font-bold text-lg">{faculty.name}</h3>
              <p className="text-sm text-gray-600">{faculty.location}</p>
              <p className="text-sm text-gray-600">{faculty.roles}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
} 
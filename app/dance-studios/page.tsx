'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface WorkCard {
  icon: string;
  title: string;
  description: string;
}

interface TeacherProfile {
  name: string;
  location: string;
  experience: string;
  image: string;
}

export default function DanceStudiosPage() {
  const studioLogos = [
    { src: '/studio-logos/boston-dance.png', alt: 'Boston Dance Collective' },
    { src: '/studio-logos/time-to-dance.png', alt: 'Time to Dance' },
    { src: '/studio-logos/allegra.png', alt: 'Allegra Dance' },
    { src: '/studio-logos/lambarri.png', alt: 'Lambarri Dance' },
    { src: '/studio-logos/danj.png', alt: 'DANJ Academy' },
    { src: '/studio-logos/fl-dance.png', alt: 'FL Dance' },
  ];

  const workCards: WorkCard[] = [
    {
      icon: "📅", // Calendar icon
      title: "Weekly Classes",
      description: "Find part-time or full-time roles at studios"
    },
    {
      icon: "💬", // Chat icon
      title: "Substitutes",
      description: "Pick up substitute work on your schedule"
    },
    {
      icon: "⭐", // Star icon
      title: "Guest Classes",
      description: "Connect with studios for guest drop-in classes"
    },
    {
      icon: "🏅", // Medal icon
      title: "Competition Choreography",
      description: "Set choreography for competition season"
    },
    {
      icon: "👣", // Footprints icon
      title: "Private Lessons",
      description: "Work with students and studios 1:1"
    },
    {
      icon: "🎤", // Microphone icon
      title: "Dance Adjudication",
      description: "Give feedback, in studio or at competitions"
    }
  ];

  const teachers: TeacherProfile[] = [
    {
      name: "Courtney S.",
      location: "New York, NY",
      experience: "Broadway Dance Center",
      imageUrl: "https://picsum.photos/seed/teacher1/300/400"
    },
    {
      name: "Marlon S.",
      location: "New York, NY",
      experience: "In The Heights Movie, West Side Story Movie",
      imageUrl: "https://picsum.photos/seed/teacher2/300/400"
    },
    {
      name: "Jill G.",
      location: "New York, NY",
      experience: "West Side Story National Tour",
      imageUrl: "https://picsum.photos/seed/teacher3/300/400"
    },
    {
      name: "Akina K.",
      location: "New York, NY",
      experience: "Radio City Christmas Spectacular",
      imageUrl: "https://picsum.photos/seed/teacher4/300/400"
    },
    {
      name: "Courtney D.",
      location: "New York, NY",
      experience: "Steps on Broadway",
      imageUrl: "https://picsum.photos/seed/teacher5/300/400"
    }
  ];

  const testimonials: Testimonial[] = [
    {
      quote: "I truly LOVE your platform! Thanks for advocating for all of us.",
      author: "Giulia Griffith",
      role: "Radio City Rockette",
      imageUrl: "https://picsum.photos/seed/giulia/64/64"
    },
    {
      quote: "Thank y'all so much, you're literally saving my bank account",
      author: "Courtney Darlington",
      role: "Steps on Broadway",
      imageUrl: "https://picsum.photos/seed/courtney/64/64"
    },
    {
      quote: "Let me say, you guys have been a LIFESAVER to me these past few months. It's exactly the type of work I've been itching for",
      author: "Natalia Nieves",
      role: "Pace University",
      imageUrl: "https://picsum.photos/seed/natalia/64/64"
    }
  ];

  const pricingTiers: PricingTier[] = [
    {
      name: "FREE",
      price: "$0",
      period: "",
      features: [
        "Free Profile",
        "Job Notifications",
        "Browse Opportunities",
        "Database Listing"
      ],
      buttonText: "Try for free",
    },
    {
      name: "BASIC",
      price: "$50",
      period: "/mo",
      features: [
        "Free Plan Features",
        "3 Job Apps / Month",
        "Message Studios",
        "Direct Payments"
      ],
      buttonText: "Try for free",
      highlighted: true,
    },
    {
      name: "PRO",
      price: "$100",
      period: "/mo",
      features: [
        "Basic Plan Features",
        "Unlimited Job Apps",
        "Browse Studios",
        "Direct Payemnts"
      ],
      buttonText: "Try for free",
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="ArtsWrk"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center pt-16 pb-12 md:pt-24 md:pb-20">
          {/* Purple badge */}
          <div className="inline-block mb-6">
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-purple-600 bg-purple-100 rounded-full">
              FOR DANCE STUDIOS
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
            Hire dance teachers
            <br />
            like never before
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Connect with dance teachers near you on dance[wrk]
          </p>

          {/* CTA Button */}
          <Link
            href="/auth/signup"
            className="inline-block px-8 py-4 text-lg font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Social Proof Section */}
        <div className="text-center pb-16">
          <p className="text-sm text-gray-500 mb-8">
            Trusted by 1000+ dance studio owners
          </p>

          {/* Logo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-75">
            {studioLogos.map((logo, index) => (
              <div key={index} className="w-32 h-16 relative">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Work We Offer Section - Full Width Background */}
      <div className="w-full bg-purple-50">
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
        >
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-purple-600 font-medium mb-2 block"
            >
              WORK WE OFFER
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-navy-900 mb-4"
            >
              Hire dance teachers for...
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-600"
            >
              Qualified, vetted dance teachers for your studio
            </motion.p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  <span className="text-3xl" role="img" aria-label={card.title}>
                    {card.icon}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-purple-600 font-medium mb-16 block text-center"
        >
          HOW IT WORKS
        </motion.span>

        {/* First Feature */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center mb-24"
        >
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              Create your
              <br />
              studio profile
            </h2>
            <p className="text-gray-600 text-lg">
              Build a unique experience by mixing and matching components. Make your brand shine.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <div className="rounded-2xl shadow-lg overflow-hidden">
              <Image
                src="/images/studio-profile.png"
                alt="Studio Profile Example"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </motion.div>

        {/* Second Feature */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="order-1">
            <div className="rounded-2xl shadow-lg overflow-hidden">
              <Image
                src="/images/teacher-map.png"
                alt="Teacher Map"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              Find & connect
              <br />
              with teachers
              <br />
              near you.
            </h2>
            <p className="text-gray-600 text-lg">
              Build a unique experience by mixing and matching components. Make your brand shine.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Who Are The Teachers Section */}
      <section className="w-full bg-purple-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-purple-600 font-medium mb-2 block">
              WHO ARE THE TEACHERS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              A network of seasoned dance pro's
            </h2>
            <p className="text-xl text-gray-600">
              Qualified dance teachers for your studio
            </p>
          </motion.div>

          {/* Teacher Profiles Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
          >
            {teachers.map((teacher, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden mb-3">
                  <img
                    src={teacher.imageUrl}
                    alt={teacher.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-navy-900">{teacher.name}</h3>
                  <p className="text-sm text-gray-600">{teacher.location}</p>
                  <p className="text-sm text-gray-500 mt-1">{teacher.experience}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-purple-600 font-medium mb-2 block">
              TESTIMONIALS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Loved by studio owners
            </h2>
          </motion.div>

          {/* Testimonials Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-40 mb-6">
                  <p className="text-xl text-gray-600 italic">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="flex items-center">
                  <img
                    src={testimonial.imageUrl}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-navy-900">
                      {testimonial.author}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-purple-600 font-medium mb-2 block">
              SELECT A PLAN
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take as long as you need to get your site just right. No trial, 
              no fees, no risk. Only upgrade when you are ready to ship.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-2xl p-8 ${
                  tier.highlighted 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white'
                }`}
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-medium">{tier.name}</h3>
                  {tier.highlighted && (
                    <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                      Billed yearly
                    </span>
                  )}
                </div>

                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-xl ml-1">{tier.period}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg
                        className={`w-5 h-5 mr-3 ${
                          tier.highlighted ? 'text-white' : 'text-purple-600'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    tier.highlighted
                      ? 'bg-white text-purple-600 hover:bg-gray-50'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {tier.buttonText}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1C1C1C] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Logo Column */}
            <div>
              <Image
                src="/artswrk-white.svg" // Make sure to add your white logo variant
                alt="Artswrk"
                width={120}
                height={40}
                className="mb-6"
              />
            </div>

            {/* About Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/about" 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Visit Artswrk
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/join" 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Join Artswrk
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <a 
                href="mailto:contact@artswrk.com"
                className="text-gray-400 hover:text-white transition-colors block mb-6"
              >
                contact@artswrk.com
              </a>
              
              {/* Social Icons */}
              <div className="flex space-x-4">
                <a 
                  href="https://instagram.com/artswrk" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg 
                    className="w-6 h-6" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com/company/artswrk" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg 
                    className="w-6 h-6" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-sm">
              © Artswrk Inc. {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 
import React from 'react';
import { Link } from 'react-router';
import {
  BookOpenIcon,
  UsersIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  HeartIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const About = () => {
  const features = [
    {
      icon: BookOpenIcon,
      title: 'Authentic Hadith',
      description:
        'Access thousands of verified hadith from Sahih Bukhari, Muslim, and other major collections.',
      color: 'bg-blue-500',
    },
    {
      icon: UsersIcon,
      title: 'Community Driven',
      description:
        'Join thousands of users learning and sharing the wisdom of Prophet Muhammad (ﷺ).',
      color: 'bg-green-500',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Verified Content',
      description:
        'All hadith are carefully verified by our team of Islamic scholars.',
      color: 'bg-purple-500',
    },
    {
      icon: GlobeAltIcon,
      title: 'Global Access',
      description: 'Accessible worldwide, anytime, anywhere on any device.',
      color: 'bg-indigo-500',
    },
    {
      icon: HeartIcon,
      title: 'Free for All',
      description:
        'Completely free platform dedicated to spreading Islamic knowledge.',
      color: 'bg-red-500',
    },
    {
      icon: SparklesIcon,
      title: 'Easy to Use',
      description:
        'User-friendly interface designed for everyone, from beginners to scholars.',
      color: 'bg-yellow-500',
    },
  ];

  const team = [
    {
      name: 'Dr. Abdullah Khan',
      role: 'Lead Scholar',
      image: 'A',
    },
    {
      name: 'Prof. Muhammad Ali',
      role: 'Hadith Researcher',
      image: 'M',
    },
    {
      name: 'Fatima Rahman',
      role: 'Content Manager',
      image: 'F',
    },
    {
      name: 'Omar Faruk',
      role: 'Technical Lead',
      image: 'O',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Al-Hadith
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Preserving and sharing the authentic teachings of Prophet Muhammad
              (ﷺ) for generations to come.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/contact"
                className="bg-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 100L60 85.7C120 71.4 240 42.9 360 35.7C480 28.6 600 42.9 720 57.1C840 71.4 960 85.7 1080 85.7C1200 85.7 1320 71.4 1380 64.3L1440 57.1V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Al-Hadith is dedicated to making the authentic sayings and teachings
            of Prophet Muhammad (ﷺ) accessible to everyone. We believe that the
            wisdom of Hadith should be available to all, regardless of their
            background or location. Our platform provides a comprehensive
            collection of verified Hadith, organized by topic and source, with
            easy-to-use search and learning tools.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Why Choose Al-Hadith?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gray-50 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div
                className={`${feature.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                10K+
              </div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                50K+
              </div>
              <div className="text-gray-600">Hadith</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                20+
              </div>
              <div className="text-gray-600">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                100+
              </div>
              <div className="text-gray-600">Scholars</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
          Our Team
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Dedicated scholars and developers working to bring you the best hadith
          experience
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="group text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-4xl font-bold text-white">
                  {member.image}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {member.name}
              </h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Your Journey Today
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already learning and benefiting from
            authentic hadith.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Create Free Account
            </Link>
            <Link
              to="/contact"
              className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <div className="bg-gray-900 text-gray-400 py-4 text-center text-sm">
        <p>© {new Date().getFullYear()} Al-Hadith. All rights reserved.</p>
      </div>
    </div>
  );
};

export default About;

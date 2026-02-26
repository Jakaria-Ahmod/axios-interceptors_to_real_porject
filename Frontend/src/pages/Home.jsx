import React from 'react';
import { Link } from 'react-router';
import {
  UsersIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

const Home = () => {
  // Stats data
  const stats = [
    { label: 'Active Users', value: '10K+', icon: UsersIcon },
    { label: 'Hadith Collections', value: '50+', icon: BookOpenIcon },
    { label: 'Countries', value: '120+', icon: GlobeAltIcon },
    { label: 'Verified Scholars', value: '200+', icon: ShieldCheckIcon },
  ];

  // Features data
  const features = [
    {
      title: 'Authentic Hadith',
      description:
        'Access thousands of verified hadith from Sahih Bukhari, Muslim, and other major collections.',
      icon: BookOpenIcon,
      color: 'bg-blue-500',
    },
    {
      title: 'Smart Search',
      description:
        'Find any hadith instantly with our advanced search and filtering system.',
      icon: ChatBubbleLeftRightIcon,
      color: 'bg-green-500',
    },
    {
      title: 'User Dashboard',
      description:
        'Save your favorite hadith, create collections, and track your learning progress.',
      icon: UsersIcon,
      color: 'bg-purple-500',
    },
    {
      title: 'Verified Content',
      description:
        'All hadith are carefully verified by our team of Islamic scholars.',
      icon: ShieldCheckIcon,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-20 md:py-28 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Announcement Badge */}
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
              <span className="text-sm font-medium">
                New: Mobile App Now Available
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Discover the Wisdom of
              <span className="block text-yellow-300">Prophetic Teachings</span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Your complete source for authentic hadith. Read, learn, and share
              the teachings of Prophet Muhammad (ﷺ).
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/user"
                className="group bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-300 transition-all duration-300 flex items-center justify-center"
              >
                Explore Hadith
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/register"
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                Get Started Free
              </Link>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-2xl md:text-3xl font-bold">
                    {stat.value}
                  </div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 md:px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Study Hadith
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to make learning and understanding hadith
            accessible for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:-translate-y-2"
            >
              <div
                className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <Link
                to="/learn-more"
                className="text-blue-600 font-medium inline-flex items-center group-hover:gap-2 transition-all"
              >
                Learn More
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already learning and benefiting from
            our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300"
            >
              Create Free Account
            </Link>
            <Link
              to="/about"
              className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 border border-gray-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Preview */}
      <section className="container mx-auto px-4 md:px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-semibold text-sm">
                Featured Testimonial
              </div>
            </div>
            <div className="text-6xl text-blue-200 mb-4">"</div>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 italic">
              This platform has transformed how I study hadith. The organization
              and authenticity of content is exceptional. Highly recommended for
              anyone seeking authentic Islamic knowledge.
            </p>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                A
              </div>
              <div className="ml-4 text-left">
                <div className="font-bold text-gray-900">Ahmed Hassan</div>
                <div className="text-sm text-gray-500">Islamic Scholar</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

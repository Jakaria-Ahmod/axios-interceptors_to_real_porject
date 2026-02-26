import React from 'react';
import { CodeBracketIcon } from '@heroicons/react/24/outline';

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      {/* Developer Message Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 px-6 text-center relative overflow-hidden shadow-2xl rounded-2xl max-w-2xl w-full">
        <div className="absolute inset-0 opacity-10">
          <CodeBracketIcon className="h-40 w-40 absolute -left-10 -top-10 transform rotate-12" />
          <CodeBracketIcon className="h-32 w-32 absolute -right-8 -bottom-8 transform -rotate-12" />
        </div>
        <div className="relative z-10">
          <CodeBracketIcon className="h-16 w-16 mx-auto mb-4 text-white/80" />
          <p className="text-2xl md:text-3xl font-bold mb-3">Coming Soon!</p>
          <p className="text-lg md:text-xl flex items-center justify-center gap-2">
            Developer is currently working on this feature
          </p>
          <div className="w-24 h-1 bg-white/30 mx-auto my-6 rounded-full"></div>
          <p className="text-sm text-blue-100">
            We're building something amazing for you. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

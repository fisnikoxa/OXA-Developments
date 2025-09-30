import React from 'react';
import Navbar from '@/components/Navbar';

const FreeAutomation = () => {
  return (
    <div className="min-h-screen bg-offwhite text-charcoal">
      <Navbar disableAnimation={true} forceShowButton={true} />
      <main className="flex flex-col items-center justify-center py-16">
        <h1 className="text-3xl font-bold mb-8">Free Automation</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-4">
          {[1, 2, 3].map((num) => (
            <div key={num} className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center justify-center min-h-[200px]">
              <span className="text-xl font-semibold mb-2">Automation {num}</span>
              <div className="w-24 h-24 bg-gray-200 rounded mb-4 flex items-center justify-center">
                <span className="text-gray-400">Placeholder</span>
              </div>
              <p className="text-gray-500">Coming soon...</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FreeAutomation; 
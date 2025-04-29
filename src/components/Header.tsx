
import React from 'react';
import { Camera } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8 px-4 shadow-md">
      <div className="container mx-auto flex items-center justify-center">
        <Camera className="h-8 w-8 mr-3" />
        <h1 className="text-3xl font-bold">Photo Booth Event Prep Checklist</h1>
      </div>
      <p className="text-center mt-3 text-white/80 max-w-2xl mx-auto">
        Your comprehensive checklist for perfect photo booth event preparation
      </p>
      <p className="text-center mt-2 text-white/70 max-w-2xl mx-auto text-sm">
        Plan ahead, stay organized, and deliver a flawless photo booth experience every time
      </p>
    </header>
  );
};

export default Header;

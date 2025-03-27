import React from 'react';

const Loader = ({ backgroundColor }) => {
  return (
    <div className="w-9">
      <div
        className="p-1 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-8 md:h-8 h-7 w-7 aspect-square rounded-full"
      >
        <div
          style={{ backgroundColor: backgroundColor || '#1f2937' }}
          className="rounded-full h-full w-full"
        ></div>
      </div>
    </div>
  );
};

export default Loader;

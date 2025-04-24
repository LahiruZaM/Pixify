
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-6 text-center text-gray-500 text-sm">
      <div className="container mx-auto px-4">
        <p>© {new Date().getFullYear()} Pixify PDF Alchemy. All rights reserved.</p>
        <p className="mt-1">Powered by advanced document processing technology</p>
      </div>
    </footer>
  );
};

export default Footer;

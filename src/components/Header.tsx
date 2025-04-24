
import React from 'react';
import { FileText, File, Merge } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-sm py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <FileText className="h-8 w-8 text-brand-purple mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">
              <span className="text-brand-purple">Pixify</span> PDF Alchemy
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-1 text-sm text-gray-500">
              <FileText className="h-4 w-4" />
              <span>Image to PDF</span>
            </div>
            <div className="hidden md:flex items-center space-x-1 text-sm text-gray-500">
              <Merge className="h-4 w-4" />
              <span>Merge PDFs</span>
            </div>
            <div className="hidden md:flex items-center space-x-1 text-sm text-gray-500">
              <FileText className="h-4 w-4" />
              <span>PDF to Text</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

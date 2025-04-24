
import React from 'react';
import { X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PDFPreviewProps {
  files: File[];
  onRemove: (index: number) => void;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ files, onRemove }) => {
  if (files.length === 0) return null;

  return (
    <div className="mt-6 animate-fade-in">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Selected PDFs ({files.length})</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {files.map((file, index) => (
          <div key={`${file.name}-${index}`} className="relative group">
            <div className="bg-gray-50 border rounded-lg p-4 flex items-center">
              <div className="bg-red-50 p-2 rounded-md mr-3">
                <FileText className="h-6 w-6 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 ml-2"
                onClick={() => onRemove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PDFPreview;

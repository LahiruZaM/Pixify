
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImagePreviewProps {
  files: File[];
  onRemove: (index: number) => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ files, onRemove }) => {
  if (files.length === 0) return null;

  return (
    <div className="mt-6 animate-fade-in">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Selected Images ({files.length})</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {files.map((file, index) => (
          <div key={`${file.name}-${index}`} className="relative group">
            <div className="aspect-square rounded-lg border overflow-hidden bg-gray-100">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-full h-full object-cover"
                onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
              />
            </div>
            <Button 
              variant="destructive" 
              size="icon" 
              className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onRemove(index)}
            >
              <X className="h-3 w-3" />
            </Button>
            <p className="text-xs text-gray-500 truncate mt-1">{file.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePreview;

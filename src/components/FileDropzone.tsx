
import React, { useCallback, useState } from 'react';
import { FileImage, FileText, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FileDropzoneProps {
  acceptedFileTypes: string[];
  onFileSelect: (files: File[]) => void;
  maxFiles?: number;
  label: string;
  icon: 'image' | 'pdf';
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  acceptedFileTypes,
  onFileSelect,
  maxFiles = 10,
  label,
  icon
}) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  }, [isDragging]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const validFiles = Array.from(e.dataTransfer.files).filter(file => 
        acceptedFileTypes.some(type => file.type.includes(type))
      );
      
      if (validFiles.length > maxFiles) {
        alert(`You can only upload up to ${maxFiles} files at once.`);
        return;
      }
      
      if (validFiles.length > 0) {
        onFileSelect(validFiles);
      } else {
        alert('Invalid file type. Please upload the correct file format.');
      }
    }
  }, [acceptedFileTypes, maxFiles, onFileSelect]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const validFiles = Array.from(files).filter(file => 
        acceptedFileTypes.some(type => file.type.includes(type))
      );
      
      if (validFiles.length > maxFiles) {
        alert(`You can only upload up to ${maxFiles} files at once.`);
        return;
      }
      
      if (validFiles.length > 0) {
        onFileSelect(validFiles);
      } else {
        alert('Invalid file type. Please upload the correct file format.');
      }
    }
  };

  return (
    <div
      className={cn(
        'border-2 border-dashed rounded-lg p-8 text-center transition-colors',
        isDragging 
          ? 'border-brand-purple bg-purple-50' 
          : 'border-gray-300 hover:border-gray-400',
        'cursor-pointer animate-fade-in'
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        onChange={handleFileSelect}
        multiple={maxFiles > 1}
        accept={acceptedFileTypes.map(type => `.${type}`).join(',')}
        className="hidden" 
        id="file-upload" 
      />
      <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center">
        <div className="bg-purple-100 p-4 rounded-full mb-4">
          {icon === 'image' ? (
            <FileImage className="h-8 w-8 text-brand-purple" />
          ) : (
            <FileText className="h-8 w-8 text-brand-purple" />
          )}
        </div>
        <p className="text-lg font-medium text-gray-700 mb-2">{label}</p>
        <p className="text-sm text-gray-500 mb-4">
          Drag & drop your files here, or click to browse
        </p>
        <Button
          variant="outline"
          className="border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white"
        >
          <Upload className="h-4 w-4 mr-2" />
          Choose Files
        </Button>
      </label>
    </div>
  );
};

export default FileDropzone;

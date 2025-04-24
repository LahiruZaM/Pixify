
import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';
import FileDropzone from './FileDropzone';
import ImagePreview from './ImagePreview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { convertImagesToPDF, downloadPDF } from '@/utils/pdfUtils';

const ImageToPDF: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (files: File[]) => {
    setImages(prev => [...prev, ...files]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleConvertToPDF = async () => {
    if (images.length === 0) return;
    
    setConverting(true);
    try {
      const pdfBytes = await convertImagesToPDF(images);
      downloadPDF(pdfBytes, 'converted-images.pdf');
      
      toast({
        title: "Conversion complete!",
        description: "Your images have been converted to PDF successfully.",
      });
    } catch (error) {
      console.error('Error converting images to PDF:', error);
      toast({
        title: "Conversion failed",
        description: "There was an error converting your images to PDF.",
        variant: "destructive",
      });
    } finally {
      setConverting(false);
    }
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center text-gray-800">
          <FileText className="h-5 w-5 text-brand-purple mr-2" />
          Convert Images to PDF
        </CardTitle>
        <CardDescription>
          Upload images to convert them into a single PDF document
        </CardDescription>
      </CardHeader>
      <CardContent>
        {images.length === 0 ? (
          <FileDropzone
            acceptedFileTypes={['image/jpeg', 'image/png', 'image/gif', 'image/webp']}
            onFileSelect={handleFileSelect}
            maxFiles={20}
            label="Upload Images"
            icon="image"
          />
        ) : (
          <ImagePreview files={images} onRemove={handleRemoveImage} />
        )}
      </CardContent>
      {images.length > 0 && (
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setImages([])}
          >
            Clear All
          </Button>
          <Button 
            onClick={handleConvertToPDF}
            disabled={images.length === 0 || converting}
            className="bg-brand-purple hover:bg-brand-purple-dark text-white"
          >
            {converting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Converting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Convert to PDF
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ImageToPDF;

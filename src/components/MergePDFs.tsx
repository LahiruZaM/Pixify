
import React, { useState } from 'react';
import { Merge, Download, FileText } from 'lucide-react';
import FileDropzone from './FileDropzone';
import PDFPreview from './PDFPreview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { mergePDFs, downloadPDF } from '@/utils/pdfUtils';

const MergePDFs: React.FC = () => {
  const [pdfs, setPdfs] = useState<File[]>([]);
  const [merging, setMerging] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (files: File[]) => {
    setPdfs(prev => [...prev, ...files]);
  };

  const handleRemovePDF = (index: number) => {
    setPdfs(prev => prev.filter((_, i) => i !== index));
  };

  const handleMergePDFs = async () => {
    if (pdfs.length < 2) return;
    
    setMerging(true);
    try {
      const pdfBytes = await mergePDFs(pdfs);
      downloadPDF(pdfBytes, 'merged-document.pdf');
      
      toast({
        title: "Merge complete!",
        description: "Your PDFs have been merged successfully.",
      });
    } catch (error) {
      console.error('Error merging PDFs:', error);
      toast({
        title: "Merge failed",
        description: "There was an error merging your PDFs.",
        variant: "destructive",
      });
    } finally {
      setMerging(false);
    }
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center text-gray-800">
          <Merge className="h-5 w-5 text-brand-purple mr-2" />
          Merge PDF Documents
        </CardTitle>
        <CardDescription>
          Combine multiple PDF files into a single document
        </CardDescription>
      </CardHeader>
      <CardContent>
        {pdfs.length === 0 ? (
          <FileDropzone
            acceptedFileTypes={['application/pdf']}
            onFileSelect={handleFileSelect}
            maxFiles={10}
            label="Upload PDFs"
            icon="pdf"
          />
        ) : (
          <PDFPreview files={pdfs} onRemove={handleRemovePDF} />
        )}
        
        {pdfs.length > 0 && pdfs.length < 10 && (
          <div className="mt-4">
            <FileDropzone
              acceptedFileTypes={['application/pdf']}
              onFileSelect={handleFileSelect}
              maxFiles={10 - pdfs.length}
              label="Add More PDFs"
              icon="pdf"
            />
          </div>
        )}
      </CardContent>
      {pdfs.length > 0 && (
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setPdfs([])}
          >
            Clear All
          </Button>
          <Button 
            onClick={handleMergePDFs}
            disabled={pdfs.length < 2 || merging}
            className="bg-brand-purple hover:bg-brand-purple-dark text-white"
          >
            {merging ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Merging...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Merge PDFs
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default MergePDFs;

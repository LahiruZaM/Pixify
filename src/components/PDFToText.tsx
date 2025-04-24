
import React, { useState } from 'react';
import { FileText, Download, Copy, Check } from 'lucide-react';
import FileDropzone from './FileDropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { extractTextFromPDF } from '@/utils/pdfUtils';

const PDFToText: React.FC = () => {
  const [pdf, setPdf] = useState<File | null>(null);
  const [extracting, setExtracting] = useState(false);
  const [extractedText, setExtractedText] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (files: File[]) => {
    // Only use the first file for PDF to text
    if (files.length > 0) {
      setPdf(files[0]);
    }
  };

  const handleExtractText = async () => {
    if (!pdf) return;
    
    setExtracting(true);
    try {
      const text = await extractTextFromPDF(pdf);
      setExtractedText(text);
      toast({
        title: "Text extraction complete!",
        description: "The text has been successfully extracted from your PDF.",
      });
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      toast({
        title: "Extraction failed",
        description: "There was an error extracting text from your PDF.",
        variant: "destructive",
      });
    } finally {
      setExtracting(false);
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadText = () => {
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = pdf ? `${pdf.name.replace('.pdf', '')}.txt` : 'extracted-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center text-gray-800">
          <FileText className="h-5 w-5 text-brand-purple mr-2" />
          Extract Text from PDF
        </CardTitle>
        <CardDescription>
          Convert your PDF documents into editable text
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!pdf && !extractedText ? (
          <FileDropzone
            acceptedFileTypes={['application/pdf']}
            onFileSelect={handleFileSelect}
            maxFiles={1}
            label="Upload a PDF"
            icon="pdf"
          />
        ) : !extractedText ? (
          <div className="bg-gray-50 border rounded-lg p-4 flex items-center animate-fade-in">
            <div className="bg-red-50 p-2 rounded-md mr-3">
              <FileText className="h-6 w-6 text-red-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{pdf?.name}</p>
              <p className="text-xs text-gray-500">
                {pdf ? `${(pdf.size / 1024 / 1024).toFixed(2)} MB` : ''}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-2"
              onClick={() => setPdf(null)}
            >
              Change
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="preview" className="w-full animate-fade-in">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <div className="mt-4 bg-gray-50 border rounded-lg p-4 h-64 overflow-y-auto">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">{extractedText}</pre>
              </div>
            </TabsContent>
            <TabsContent value="actions">
              <div className="mt-4 flex flex-col space-y-3">
                <Button 
                  onClick={handleCopyText}
                  className="bg-brand-purple hover:bg-brand-purple-dark text-white"
                >
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy to Clipboard
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleDownloadText}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download as Text File
                </Button>
                <Button 
                  variant="link" 
                  onClick={() => {
                    setExtractedText('');
                    setPdf(null);
                  }}
                >
                  Process Another PDF
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      {pdf && !extractedText && (
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setPdf(null)}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleExtractText}
            disabled={!pdf || extracting}
            className="bg-brand-purple hover:bg-brand-purple-dark text-white"
          >
            {extracting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Extracting Text...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Extract Text
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default PDFToText;

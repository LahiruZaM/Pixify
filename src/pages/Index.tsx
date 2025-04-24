import React, { useState } from 'react';
import { FileImage, FileText, Merge } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/Header';
import ImageToPDF from '@/components/ImageToPDF';
import MergePDFs from '@/components/MergePDFs';
import PDFToText from '@/components/PDFToText';
import Footer from '@/components/Footer';

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>('image-to-pdf');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">PDF Document Tools</h2>
          <p className="text-gray-600 text-center mb-8">
            Transform, merge, and extract text from your documents with ease
          </p>
          
          <Tabs defaultValue="image-to-pdf" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="image-to-pdf" className="flex items-center justify-center">
                <FileImage className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Image to PDF</span>
                <span className="sm:hidden">Images</span>
              </TabsTrigger>
              <TabsTrigger value="merge-pdfs" className="flex items-center justify-center">
                <Merge className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Merge PDFs</span>
                <span className="sm:hidden">Merge</span>
              </TabsTrigger>
              <TabsTrigger value="pdf-to-text" className="flex items-center justify-center">
                <FileText className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">PDF to Text</span>
                <span className="sm:hidden">Extract</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <TabsContent value="image-to-pdf" className="mt-0">
                <ImageToPDF />
              </TabsContent>
              
              <TabsContent value="merge-pdfs" className="mt-0">
                <MergePDFs />
              </TabsContent>
              
              <TabsContent value="pdf-to-text" className="mt-0">
                <PDFToText />
              </TabsContent>
            </div>
          </Tabs>
          
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-brand-purple font-bold">1</span>
                </div>
                <h4 className="font-medium text-gray-800 mb-2">Upload Files</h4>
                <p className="text-gray-600 text-sm">
                  Drag and drop or browse to select your files
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-brand-purple font-bold">2</span>
                </div>
                <h4 className="font-medium text-gray-800 mb-2">Process</h4>
                <p className="text-gray-600 text-sm">
                  Our AI technology processes your documents instantly
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-brand-purple font-bold">3</span>
                </div>
                <h4 className="font-medium text-gray-800 mb-2">Download</h4>
                <p className="text-gray-600 text-sm">
                  Get your converted files ready to use
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

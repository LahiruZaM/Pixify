
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export const convertImagesToPDF = async (images: File[]): Promise<Uint8Array> => {
  const pdfDoc = await PDFDocument.create();
  
  for (const imageFile of images) {
    const imageBytes = await readFileAsArrayBuffer(imageFile);
    
    // Determine image type and embed accordingly
    let page;
    if (imageFile.type === 'image/jpeg' || imageFile.type === 'image/jpg') {
      const jpgImage = await pdfDoc.embedJpg(imageBytes);
      page = pdfDoc.addPage([jpgImage.width, jpgImage.height]);
      const { width, height } = page.getSize();
      page.drawImage(jpgImage, {
        x: 0,
        y: 0,
        width: width,
        height: height,
      });
    } else if (imageFile.type === 'image/png') {
      const pngImage = await pdfDoc.embedPng(imageBytes);
      page = pdfDoc.addPage([pngImage.width, pngImage.height]);
      const { width, height } = page.getSize();
      page.drawImage(pngImage, {
        x: 0,
        y: 0,
        width: width,
        height: height,
      });
    } else if (imageFile.type === 'image/webp' || imageFile.type === 'image/gif') {
      // For unsupported formats, add a page with text about conversion limitation
      const page = pdfDoc.addPage([600, 800]);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      page.drawText(`Image format ${imageFile.type} conversion is limited. Original filename: ${imageFile.name}`, {
        x: 50,
        y: 700,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
    }
  }
  
  return pdfDoc.save();
};

export const mergePDFs = async (pdfs: File[]): Promise<Uint8Array> => {
  const mergedPdf = await PDFDocument.create();
  
  for (const pdfFile of pdfs) {
    try {
      const pdfBytes = await readFileAsArrayBuffer(pdfFile);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page);
      });
    } catch (error) {
      console.error(`Error processing PDF ${pdfFile.name}:`, error);
    }
  }
  
  return mergedPdf.save();
};

export const extractTextFromPDF = async (pdf: File): Promise<string> => {
  // Note: pdf-lib doesn't support text extraction natively
  // This is a placeholder that creates a PDF with a note about the limitation
  const pdfBytes = await readFileAsArrayBuffer(pdf);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  
  // Create a simple text representation showing page count
  let extractedText = `PDF Document: ${pdf.name}\n`;
  extractedText += `Size: ${(pdf.size / 1024).toFixed(2)} KB\n`;
  extractedText += `Pages: ${pdfDoc.getPageCount()}\n\n`;
  extractedText += `Note: Full text extraction requires additional OCR libraries.\n`;
  extractedText += `This is a simplified representation of your document.\n`;
  extractedText += `The PDF contains ${pdfDoc.getPageCount()} pages.\n\n`;
  
  // Add page dimensions for each page
  for (let i = 0; i < pdfDoc.getPageCount(); i++) {
    const page = pdfDoc.getPage(i);
    const { width, height } = page.getSize();
    extractedText += `Page ${i+1}: Width=${width.toFixed(2)}, Height=${height.toFixed(2)}\n`;
  }
  
  return extractedText;
};

// Helper function to read a file as ArrayBuffer
const readFileAsArrayBuffer = (file: File): Promise<Uint8Array> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        resolve(new Uint8Array(reader.result));
      } else {
        reject(new Error('Failed to read file as ArrayBuffer'));
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

// Helper function to download a PDF
export const downloadPDF = (pdfBytes: Uint8Array, filename: string) => {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

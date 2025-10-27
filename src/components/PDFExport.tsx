'use client';

import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { CVPDFDocument } from './CVPDFDocument';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';
import { CVData } from '@/types/cv';

interface PDFExportProps {
  data: CVData;
  filename?: string;
}

export const PDFExport: React.FC<PDFExportProps> = ({
  data,
  filename = 'cv',
}) => {
  const [isGenerating, setIsGenerating] = React.useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      // Create a version of data with fallback for images
      const safeData = {
        ...data,
        personalInfo: {
          ...data.personalInfo,
          // Remove profile image if it might cause issues
          profileImage: data.personalInfo.profileImage?.startsWith('http') 
            ? data.personalInfo.profileImage 
            : undefined
        }
      };

      // Generate PDF using react-pdf/renderer
      const doc = <CVPDFDocument data={safeData} />;
      const asPdf = pdf(doc);
      const blob = await asPdf.toBlob();
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.pdf`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try the Print PDF option instead.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={generatePDF}
      disabled={isGenerating}
      className="w-full md:w-auto"
    >
      <Download className="w-4 h-4 mr-2" />
      {isGenerating ? 'Generating PDF...' : 'Download PDF'}
    </Button>
  );
};
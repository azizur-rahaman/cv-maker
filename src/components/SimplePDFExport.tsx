'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';

interface SimplePDFExportProps {
  elementId: string;
  filename?: string;
}

export const SimplePDFExport: React.FC<SimplePDFExportProps> = ({
  elementId,
  filename = 'cv',
}) => {
  const [isGenerating, setIsGenerating] = React.useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      // Store current styles
      const originalStyle = document.body.style.cssText;
      
      // Apply print styles
      const printStyles = `
        @media print {
          * { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }
          body { margin: 0 !important; padding: 0 !important; }
          #cv-preview { 
            width: 210mm !important; 
            min-height: 297mm !important; 
            background: white !important;
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .bg-gradient-to-r { background: #334155 !important; }
        }
      `;
      
      // Add print styles to head
      const styleSheet = document.createElement('style');
      styleSheet.type = 'text/css';
      styleSheet.innerHTML = printStyles;
      document.head.appendChild(styleSheet);
      
      // Trigger print
      window.print();
      
      // Clean up
      setTimeout(() => {
        document.head.removeChild(styleSheet);
        document.body.style.cssText = originalStyle;
        setIsGenerating(false);
      }, 500);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
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
                  {isGenerating ? 'Opening Print Dialog...' : 'Print PDF'}
    </Button>
  );
};
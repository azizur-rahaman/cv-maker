'use client';

import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';

interface BetterPDFExportProps {
  elementId: string;
  filename?: string;
}

export const BetterPDFExport: React.FC<BetterPDFExportProps> = ({
  elementId,
  filename = 'cv',
}) => {
  const [isGenerating, setIsGenerating] = React.useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error('Element not found');
      }

      // Create a clean copy of the element
      const clonedElement = element.cloneNode(true) as HTMLElement;
      
      // Apply safe styles
      clonedElement.style.width = '794px';
      clonedElement.style.minHeight = '1123px';
      clonedElement.style.backgroundColor = '#ffffff';
      clonedElement.style.boxShadow = 'none';
      clonedElement.style.position = 'absolute';
      clonedElement.style.top = '-10000px';
      clonedElement.style.left = '-10000px';
      clonedElement.style.zIndex = '-1000';
      clonedElement.style.fontFamily = 'Arial, sans-serif';
      
      // Fix the header background specifically
      const headerElements = clonedElement.querySelectorAll('.bg-slate-700, [style*="background"]');
      headerElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.background = '#334155';
        htmlEl.style.backgroundImage = 'none';
        htmlEl.style.backgroundClip = 'border-box';
      });
      
      // Fix any gradient backgrounds
      const allElements = clonedElement.querySelectorAll('*');
      allElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const computedStyle = window.getComputedStyle(htmlEl);
        
        // Replace problematic CSS properties
        if (computedStyle.background && computedStyle.background.includes('gradient')) {
          htmlEl.style.background = '#334155';
        }
        if (computedStyle.backgroundImage && computedStyle.backgroundImage.includes('gradient')) {
          htmlEl.style.backgroundImage = 'none';
          htmlEl.style.backgroundColor = '#334155';
        }
        
        // Ensure text colors are preserved
        if (htmlEl.classList.contains('text-white')) {
          htmlEl.style.color = '#ffffff';
        }
        if (htmlEl.classList.contains('text-slate-200')) {
          htmlEl.style.color = '#cbd5e1';
        }
        if (htmlEl.classList.contains('text-slate-600')) {
          htmlEl.style.color = '#475569';
        }
        if (htmlEl.classList.contains('text-gray-700')) {
          htmlEl.style.color = '#374151';
        }
      });
      
      // Add to document
      document.body.appendChild(clonedElement);

      // Wait a bit for styles to apply
      await new Promise(resolve => setTimeout(resolve, 100));

      // Generate canvas with conservative settings
      const canvas = await html2canvas(clonedElement, {
        scale: 1.5,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        width: 794,
        height: 1123,
        logging: false,
        removeContainer: false,
        foreignObjectRendering: false,
        imageTimeout: 0,
      });

      // Remove the clone
      document.body.removeChild(clonedElement);

      // Create PDF
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
        heightLeft -= pageHeight;
      }

      pdf.save(`${filename}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try using the Print/Save option instead.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={generatePDF}
      disabled={isGenerating}
      className="w-full md:w-auto"
      variant="secondary"
    >
      <Download className="w-4 h-4 mr-2" />
      {isGenerating ? 'Generating PDF...' : 'Download PDF'}
    </Button>
  );
};
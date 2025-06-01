import React, { useState } from 'react';
import { Download, ImageIcon, Code, FileText, Check, Loader } from 'lucide-react';
import { toPng, toSvg } from 'html-to-image';

const ExportOptions = ({ flowId }) => {
  const [exporting, setExporting] = useState(false);
  const [success, setSuccess] = useState(false);

  const exportFlow = async (format) => {
    setExporting(true);
    setSuccess(false);
    
    try {
      const element = document.querySelector(`#${flowId}`);
      if (!element) throw new Error('Flow element not found');
      
      let dataUrl;
      let filename;
      let mimeType;
      
      if (format === 'png') {
        dataUrl = await toPng(element, { backgroundColor: '#ffffff' });
        filename = 'code-mindmap.png';
        mimeType = 'image/png';
      } else if (format === 'svg') {
        dataUrl = await toSvg(element, { backgroundColor: '#ffffff' });
        filename = 'code-mindmap.svg';
        mimeType = 'image/svg+xml';
      } else {
        throw new Error('Unsupported format');
      }
      
      // Create download link
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      console.error('Export error:', error);
      alert(`Export failed: ${error.message}`);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="absolute bottom-4 right-4 flex flex-col items-end space-y-2 z-10">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2 flex flex-col space-y-1">
        <button
          onClick={() => exportFlow('png')}
          disabled={exporting}
          className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ImageIcon size={16} />
          <span>Export as PNG</span>
          {exporting && <Loader size={16} className="animate-spin ml-2" />}
          {success && <Check size={16} className="text-green-500 ml-2" />}
        </button>
        
        <button
          onClick={() => exportFlow('svg')}
          disabled={exporting}
          className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          <FileText size={16} />
          <span>Export as SVG</span>
        </button>
      </div>
    </div>
  );
};

export default ExportOptions;
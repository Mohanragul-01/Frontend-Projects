import React from 'react';
import { X } from 'lucide-react';

export const InfoPanel = ({ node, onClose }) => {
  if (!node) return null;

  const renderNodeDetails = () => {
    switch (node.type) {
      case 'component':
        return (
          <>
            <h3 className="text-lg font-bold mb-2">Component: {node.data.name}</h3>
            
            {node.data.props && node.data.props.length > 0 && (
              <div className="mb-3">
                <h4 className="font-semibold text-sm text-gray-700 mb-1">Props:</h4>
                <ul className="list-disc pl-5 text-sm">
                  {node.data.props.map((prop, idx) => (
                    <li key={idx}>{prop}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {node.data.state && node.data.state.length > 0 && (
              <div className="mb-3">
                <h4 className="font-semibold text-sm text-gray-700 mb-1">State:</h4>
                <ul className="list-disc pl-5 text-sm">
                  {node.data.state.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        );
        
      case 'function':
        return (
          <>
            <h3 className="text-lg font-bold mb-2">Function: {node.data.name}</h3>
            
            {node.data.params && node.data.params.length > 0 && (
              <div className="mb-3">
                <h4 className="font-semibold text-sm text-gray-700 mb-1">Parameters:</h4>
                <ul className="list-disc pl-5 text-sm">
                  {node.data.params.map((param, idx) => (
                    <li key={idx}>{param}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {node.data.returnsJSX && (
              <div className="px-3 py-2 bg-purple-50 text-purple-800 rounded-md text-sm mb-3">
                Returns JSX
              </div>
            )}
          </>
        );
        
      case 'variable':
        return (
          <>
            <h3 className="text-lg font-bold mb-2">Variable: {node.data.name}</h3>
            
            {node.data.type && (
              <div className="mb-3">
                <h4 className="font-semibold text-sm text-gray-700 mb-1">Type:</h4>
                <div className="px-3 py-2 bg-gray-100 rounded-md text-sm font-mono">
                  {node.data.type}
                </div>
              </div>
            )}
            
            {node.data.value && (
              <div className="mb-3">
                <h4 className="font-semibold text-sm text-gray-700 mb-1">Value:</h4>
                <div className="px-3 py-2 bg-gray-100 rounded-md text-sm font-mono overflow-x-auto max-h-32">
                  {node.data.value}
                </div>
              </div>
            )}
          </>
        );
        
      default:
        return (
          <div>
            <h3 className="text-lg font-bold mb-2">{node.data.name || 'Node'}</h3>
            <p className="text-sm text-gray-600">Type: {node.data.type || 'Unknown'}</p>
          </div>
        );
    }
  };

  return (
    <div className="absolute right-4 top-4 w-72 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-20 animate-slideIn">
      <div className="flex justify-between items-start mb-3">
        <div className="font-semibold text-gray-500 text-xs uppercase">Node Details</div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="divide-y divide-gray-100">
        {renderNodeDetails()}
        
        <div className="pt-3 mt-3">
          <p className="text-xs text-gray-500">ID: {node.id}</p>
        </div>
      </div>
    </div>
  );
};
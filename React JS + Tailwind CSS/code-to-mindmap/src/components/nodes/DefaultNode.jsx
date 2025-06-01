import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { FileText } from 'lucide-react';

const DefaultNode = ({ data }) => {
  return (
    <div className="px-4 py-3 shadow-md rounded-md bg-gradient-to-br from-gray-500 to-gray-600 text-white border-2 border-gray-400">
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-gray-300" />
      
      <div className="flex items-center space-x-2">
        <FileText size={20} className="flex-shrink-0" />
        <div>
          <div className="font-bold text-sm">{data.name || 'Node'}</div>
          {data.type && (
            <div className="text-xs text-gray-100 mt-1">
              Type: {data.type}
            </div>
          )}
        </div>
      </div>
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-gray-300" />
    </div>
  );
};

export default memo(DefaultNode);
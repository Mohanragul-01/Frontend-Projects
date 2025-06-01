import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Database } from 'lucide-react';

const VariableNode = ({ data }) => {
  return (
    <div className="px-4 py-3 shadow-md rounded-md bg-gradient-to-br from-teal-500 to-teal-600 text-white border-2 border-teal-400">
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-teal-300" />
      
      <div className="flex items-center space-x-2">
        <Database size={20} className="flex-shrink-0" />
        <div>
          <div className="font-bold text-sm">{data.name || 'Variable'}</div>
          {data.type && (
            <div className="text-xs text-teal-100 mt-1">
              Type: {data.type}
            </div>
          )}
          {data.value && (
            <div className="text-xs text-teal-100 mt-0.5 truncate max-w-[150px]">
              Value: {data.value}
            </div>
          )}
        </div>
      </div>
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-teal-300" />
    </div>
  );
};

export default memo(VariableNode);
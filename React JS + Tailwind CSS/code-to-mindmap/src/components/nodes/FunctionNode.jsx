import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Code } from 'lucide-react';

const FunctionNode = ({ data }) => {
  return (
    <div className="px-4 py-3 shadow-md rounded-md bg-gradient-to-br from-purple-500 to-purple-600 text-white border-2 border-purple-400">
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-purple-300" />
      
      <div className="flex items-center space-x-2">
        <Code size={20} className="flex-shrink-0" />
        <div>
          <div className="font-bold text-sm">{data.name || 'Function'}</div>
          {data.params && data.params.length > 0 && (
            <div className="text-xs text-purple-100 mt-1">
              Params: {data.params.join(', ')}
            </div>
          )}
        </div>
      </div>
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-purple-300" />
    </div>
  );
};

export default memo(FunctionNode);
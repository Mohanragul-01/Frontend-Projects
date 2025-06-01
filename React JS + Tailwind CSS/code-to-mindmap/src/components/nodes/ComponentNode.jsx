import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Component } from 'lucide-react';

const ComponentNode = ({ data }) => {
  return (
    <div className="px-4 py-3 shadow-md rounded-md bg-gradient-to-br from-blue-500 to-blue-600 text-white border-2 border-blue-400">
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-300" />
      
      <div className="flex items-center space-x-2">
        <Component size={20} className="flex-shrink-0" />
        <div>
          <div className="font-bold text-sm">{data.name || 'Component'}</div>
          {data.props && data.props.length > 0 && (
            <div className="text-xs text-blue-100 mt-1">
              Props: {data.props.join(', ')}
            </div>
          )}
        </div>
      </div>
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-300" />
    </div>
  );
};

export default memo(ComponentNode);
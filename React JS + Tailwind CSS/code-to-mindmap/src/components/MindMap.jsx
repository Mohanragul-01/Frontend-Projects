import React, { useCallback, useMemo, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { ZoomIn, ZoomOut, Maximize, Copy } from 'lucide-react';
import ComponentNode from './nodes/ComponentNode';
import FunctionNode from './nodes/FunctionNode';
import VariableNode from './nodes/VariableNode';
import DefaultNode from './nodes/DefaultNode';

const nodeTypes = {
  component: ComponentNode,
  function: FunctionNode,
  variable: VariableNode,
  default: DefaultNode,
};

const MindMap = ({ data, onNodeSelect }) => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onNodeClick = useCallback((_, node) => {
    onNodeSelect && onNodeSelect(node);
  }, [onNodeSelect]);

  useMemo(() => {
    if (!data) {
      setNodes([]);
      setEdges([]);
      return;
    }

    const { nodes: newNodes, edges: newEdges } = data;
    setNodes(newNodes);
    setEdges(newEdges);
  }, [data, setNodes, setEdges]);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white rounded-lg border border-gray-200 p-4">
        <div className="text-center max-w-md">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No Visualization Yet</h3>
          <p className="text-gray-500 mb-4 text-sm sm:text-base">
            Enter your React component code and click "Parse Code" to generate a mindmap visualization.
          </p>
          <div className="bg-gray-100 p-3 sm:p-4 rounded-md">
            <p className="text-gray-600 text-xs sm:text-sm font-mono">
              {`function Example() {\n  const [count, setCount] = useState(0);\n  return <div>...</div>;\n}`}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[300px] sm:h-full bg-white rounded-lg border border-gray-200 shadow-sm" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-right"
        minZoom={0.2}
        maxZoom={2}
        id="mindmap-flow"
        className="touch-none"
      >
        <Controls 
          showInteractive={false}
          className="!left-2 !bottom-2"
        />
        <MiniMap 
          nodeStrokeWidth={3} 
          zoomable 
          pannable
          className="!right-2 !bottom-2"
        />
        <Background 
          variant="dots" 
          gap={12} 
          size={1}
        />
        
        <Panel position="top-right" className="flex gap-2">
          <button
            className="bg-white p-1.5 sm:p-2 rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
            onClick={() => {
              const instance = document.querySelector('.react-flow__pane');
              if (instance && document.fullscreenEnabled) {
                if (!document.fullscreenElement) {
                  instance.requestFullscreen().catch(err => {
                    console.log(`Error attempting to enable fullscreen: ${err.message}`);
                  });
                } else {
                  document.exitFullscreen();
                }
              }
            }}
            title="Toggle fullscreen"
          >
            <Maximize size={16} />
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default MindMap;

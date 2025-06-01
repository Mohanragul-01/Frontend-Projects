import { useState } from 'react';
import Header from './components/Header';
import CodeInput from './components/CodeInput';
import MindMap from './components/MindMap';
import { parseCode } from './utils/codeParser';
import { InfoPanel } from './components/InfoPanel';
import ExportOptions from './components/ExportOptions';

function App() {
  const [code, setCode] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    setError(null);
  };

  const handleParseCode = () => {
    if (!code.trim()) {
      setError('Please enter some code to parse');
      setParsedData(null);
      return;
    }

    try {
      const result = parseCode(code);
      setParsedData(result);
      setError(null);
    } catch (err) {
      console.error('Parse error:', err);
      setError(`Error parsing code: ${err.message}`);
      setParsedData(null);
    }
  };

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
    setShowInfoPanel(true);
  };

  const handleReset = () => {
    setCode('');
    setParsedData(null);
    setError(null);
    setSelectedNode(null);
    setShowInfoPanel(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header onReset={handleReset} />
      
      <main className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <div className="w-full md:w-1/2 p-4 flex flex-col">
          <CodeInput 
            code={code} 
            onChange={handleCodeChange} 
            onParse={handleParseCode} 
            error={error}
          />
        </div>
        
        <div className="w-full md:w-1/2 p-4 flex flex-col relative">
          <MindMap 
            data={parsedData} 
            onNodeSelect={handleNodeSelect}
          />
          
          {parsedData && <ExportOptions flowId="mindmap-flow" />}
          
          {showInfoPanel && selectedNode && (
            <InfoPanel 
              node={selectedNode} 
              onClose={() => setShowInfoPanel(false)} 
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
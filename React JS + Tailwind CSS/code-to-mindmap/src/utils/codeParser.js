import * as babel from '@babel/parser';
import traverse from '@babel/traverse';

// Generate a unique ID for nodes
const generateId = (() => {
  let id = 0;
  return (prefix = 'node') => `${prefix}_${id++}`;
})();

// Main function to parse code and create graph data
export const parseCode = (code) => {
  try {
    // Parse the code into an AST
    const ast = babel.parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });

    // Prepare the output data
    const output = {
      nodes: [],
      edges: []
    };
    
    // Root node - represents the file
    const rootId = generateId('root');
    output.nodes.push({
      id: rootId,
      type: 'default',
      position: { x: 0, y: 0 },
      data: { 
        name: 'Root',
        type: 'File' 
      }
    });

    // Track what we've seen to avoid duplicates
    const seenNodes = new Set();
    
    // Process the AST
    traverse(ast, {
      // Find React components (function declarations that return JSX)
      FunctionDeclaration(path) {
        processFunction(path, output, rootId, seenNodes);
      },
      
      // Find React components (arrow functions that return JSX)
      ArrowFunctionExpression(path) {
        if (path.parent.type === 'VariableDeclarator') {
          const name = path.parent.id.name;
          processFunction(path, output, rootId, seenNodes, name);
        }
      },
      
      // Find variable declarations
      VariableDeclaration(path) {
        path.node.declarations.forEach(declaration => {
          if (seenNodes.has(declaration.id.name)) return;
          
          // Skip if it's a function component we already processed
          if (
            declaration.init && 
            (declaration.init.type === 'ArrowFunctionExpression' || 
             declaration.init.type === 'FunctionExpression')
          ) {
            return;
          }
          
          // Process regular variables
          const nodeId = generateId('var');
          const name = declaration.id.name;
          seenNodes.add(name);
          
          let type = 'unknown';
          let value = null;
          
          // Try to determine the variable type and value
          if (declaration.init) {
            if (declaration.init.type === 'StringLiteral') {
              type = 'string';
              value = `"${declaration.init.value}"`;
            } else if (declaration.init.type === 'NumericLiteral') {
              type = 'number';
              value = declaration.init.value.toString();
            } else if (declaration.init.type === 'BooleanLiteral') {
              type = 'boolean';
              value = declaration.init.value.toString();
            } else if (declaration.init.type === 'ArrayExpression') {
              type = 'array';
              value = '[ ... ]';
            } else if (declaration.init.type === 'ObjectExpression') {
              type = 'object';
              value = '{ ... }';
            } else if (declaration.init.type === 'CallExpression') {
              if (declaration.init.callee.name === 'useState') {
                type = 'state';
                value = 'useState()';
              } else {
                type = 'function call';
                value = `${declaration.init.callee.name}()`;
              }
            }
          }
          
          // Is this a React hook?
          const isHook = name.startsWith('use') && 
                         name.length > 3 && 
                         name[3] === name[3].toUpperCase();
          
          if (isHook) {
            type = 'hook';
          }
          
          output.nodes.push({
            id: nodeId,
            type: 'variable',
            position: { x: 0, y: 0 }, // Positions will be calculated later
            data: {
              name,
              type,
              value,
              isHook
            }
          });
          
          output.edges.push({
            id: `${rootId}-${nodeId}`,
            source: rootId,
            target: nodeId,
            animated: false
          });
        });
      }
    });

    // Position nodes in a hierarchical layout
    arrangeNodes(output.nodes);
    
    return output;
  } catch (error) {
    console.error('Failed to parse code:', error);
    throw new Error(`Failed to parse code: ${error.message}`);
  }
};

// Process a function declaration
const processFunction = (path, output, parentId, seenNodes, nameOverride = null) => {
  const name = nameOverride || (path.node.id ? path.node.id.name : 'AnonymousFunction');
  
  // Skip if we've seen this function already
  if (seenNodes.has(name)) return;
  seenNodes.add(name);
  
  // Check if it returns JSX
  let returnsJSX = false;
  path.traverse({
    ReturnStatement(returnPath) {
      if (
        returnPath.node.argument &&
        returnPath.node.argument.type === 'JSXElement'
      ) {
        returnsJSX = true;
      }
    },
    ArrowFunctionExpression(arrowPath) {
      if (
        arrowPath.node.body &&
        arrowPath.node.body.type === 'JSXElement'
      ) {
        returnsJSX = true;
      }
    }
  });
  
  // Create node for this function
  const nodeId = generateId(returnsJSX ? 'component' : 'func');
  const params = path.node.params.map(param => {
    if (param.type === 'Identifier') {
      return param.name;
    } else if (param.type === 'ObjectPattern') {
      return `{${param.properties.map(p => p.key.name).join(', ')}}`;
    }
    return 'param';
  });
  
  output.nodes.push({
    id: nodeId,
    type: returnsJSX ? 'component' : 'function',
    position: { x: 0, y: 0 },
    data: {
      name,
      params,
      returnsJSX
    }
  });
  
  output.edges.push({
    id: `${parentId}-${nodeId}`,
    source: parentId,
    target: nodeId,
    animated: false
  });
  
  // Find props and state inside the function
  if (returnsJSX) {
    const props = [];
    const state = [];
    
    // Extract props from parameters
    if (path.node.params.length > 0) {
      const firstParam = path.node.params[0];
      if (firstParam.type === 'ObjectPattern') {
        firstParam.properties.forEach(prop => {
          props.push(prop.key.name);
        });
      }
    }
    
    // Find useState calls
    path.traverse({
      CallExpression(callPath) {
        if (
          callPath.node.callee.type === 'Identifier' &&
          callPath.node.callee.name === 'useState'
        ) {
          if (
            callPath.parent.type === 'VariableDeclarator' &&
            callPath.parent.id.type === 'ArrayPattern' &&
            callPath.parent.id.elements.length === 2
          ) {
            const stateName = callPath.parent.id.elements[0].name;
            const setterName = callPath.parent.id.elements[1].name;
            state.push(`${stateName} (${setterName})`);
          }
        }
      }
    });
    
    // Update component node with props and state
    const componentNode = output.nodes.find(node => node.id === nodeId);
    if (componentNode) {
      componentNode.data.props = props;
      componentNode.data.state = state;
    }
  }
  
  // Process functions and variables inside this function
  path.traverse({
    FunctionDeclaration(funcPath) {
      if (funcPath.scope.parent === path.scope) {
        processFunction(funcPath, output, nodeId, seenNodes);
      }
    },
    
    ArrowFunctionExpression(arrowPath) {
      if (
        arrowPath.scope.parent === path.scope &&
        arrowPath.parent.type === 'VariableDeclarator'
      ) {
        const name = arrowPath.parent.id.name;
        processFunction(arrowPath, output, nodeId, seenNodes, name);
      }
    },
    
    VariableDeclaration(varPath) {
      if (varPath.scope === path.scope) {
        varPath.node.declarations.forEach(declaration => {
          if (seenNodes.has(declaration.id.name)) return;
          
          // Skip if it's a function we already processed
          if (
            declaration.init && 
            (declaration.init.type === 'ArrowFunctionExpression' || 
             declaration.init.type === 'FunctionExpression')
          ) {
            return;
          }
          
          // Process regular variables
          const varNodeId = generateId('var');
          const name = declaration.id.name;
          seenNodes.add(name);
          
          let type = 'unknown';
          let value = null;
          
          // Try to determine the variable type and value
          if (declaration.init) {
            if (declaration.init.type === 'StringLiteral') {
              type = 'string';
              value = `"${declaration.init.value}"`;
            } else if (declaration.init.type === 'NumericLiteral') {
              type = 'number';
              value = declaration.init.value.toString();
            } else if (declaration.init.type === 'BooleanLiteral') {
              type = 'boolean';
              value = declaration.init.value.toString();
            } else if (declaration.init.type === 'ArrayExpression') {
              type = 'array';
              value = '[ ... ]';
            } else if (declaration.init.type === 'ObjectExpression') {
              type = 'object';
              value = '{ ... }';
            } else if (declaration.init.type === 'CallExpression') {
              if (declaration.init.callee.name === 'useState') {
                type = 'state';
                value = 'useState()';
              } else {
                type = 'function call';
                value = `${declaration.init.callee.name}()`;
              }
            }
          }
          
          output.nodes.push({
            id: varNodeId,
            type: 'variable',
            position: { x: 0, y: 0 },
            data: {
              name,
              type,
              value
            }
          });
          
          output.edges.push({
            id: `${nodeId}-${varNodeId}`,
            source: nodeId,
            target: varNodeId,
            animated: false
          });
        });
      }
    }
  });
};

// Arrange nodes in a tree layout
const arrangeNodes = (nodes) => {
  // Find the root node
  const rootNode = nodes.find(node => node.id.startsWith('root'));
  if (!rootNode) return;
  
  // Start from the center
  rootNode.position = { x: 0, y: 0 };
  
  // Get all nodes by level
  const nodesByLevel = {};
  const processLevel = (nodeId, level) => {
    if (!nodesByLevel[level]) {
      nodesByLevel[level] = [];
    }
    nodesByLevel[level].push(nodeId);
    
    // Find all child nodes
    const childIds = [];
    nodes.forEach(node => {
      if (node.id === nodeId) return;
      
      // Check if this node is connected to the current node
      const isChild = nodes.some(n => {
        if (n.id === nodeId) return false;
        return n.edges && n.edges.some(e => e.source === nodeId && e.target === node.id);
      });
      
      if (isChild) {
        childIds.push(node.id);
      }
    });
    
    // Process child nodes
    childIds.forEach(childId => {
      processLevel(childId, level + 1);
    });
  };
  
  // Start processing from the root
  processLevel(rootNode.id, 0);
  
  // Position nodes by level
  const LEVEL_HEIGHT = 150;
  const NODE_WIDTH = 180;
  
  Object.keys(nodesByLevel).forEach(level => {
    const levelNodes = nodesByLevel[level];
    const levelY = parseInt(level) * LEVEL_HEIGHT;
    
    // Position nodes horizontally
    const levelWidth = levelNodes.length * NODE_WIDTH;
    const startX = -levelWidth / 2 + NODE_WIDTH / 2;
    
    levelNodes.forEach((nodeId, index) => {
      const node = nodes.find(n => n.id === nodeId);
      if (node) {
        node.position = {
          x: startX + index * NODE_WIDTH,
          y: levelY
        };
      }
    });
  });
};

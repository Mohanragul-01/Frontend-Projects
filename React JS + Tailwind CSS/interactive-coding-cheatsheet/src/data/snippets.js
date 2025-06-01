export const snippetsData = [
  {
    id: 1,
    title: "useState Hook Basic Example",
    description: "A simple counter implementation using React's useState hook",
    category: "react",
    categoryName: "React",
    tags: ["hooks", "state", "beginner"],
    code: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Counter;`,
    previewEnabled: true,
    codePreview: "const [count, setCount] = useState(0);",
    note: "The <code>useState</code> hook lets you add state to functional components. It returns a stateful value and a function to update it."
  },
  {
    id: 2,
    title: "useEffect with Cleanup",
    description: "How to use useEffect with a cleanup function for event listeners",
    category: "react",
    categoryName: "React",
    tags: ["hooks", "effect", "cleanup", "events"],
    code: `import React, { useState, useEffect } from 'react';

function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    // Return a cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this runs once on mount
  
  return (
    <div>
      <p>Window width: {width}px</p>
    </div>
  );
}

export default WindowWidth;`,
    previewEnabled: false,
    codePreview: "useEffect(() => { /* ... */ return () => { /* cleanup */ } }, []);",
    note: "Always clean up subscriptions, timers, and event listeners in the return function of <code>useEffect</code> to prevent memory leaks."
  },
  {
    id: 3,
    title: "Array Filter, Map, and Reduce",
    description: "Examples of using filter, map, and reduce methods on arrays",
    category: "javascript",
    categoryName: "JavaScript",
    tags: ["arrays", "functional", "methods"],
    code: `// Filter: Get only even numbers
const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4, 6]

// Map: Double each number
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10, 12]

// Reduce: Sum all numbers
const sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum); // 21

// Chaining them together
const sumOfDoubledEvenNumbers = numbers
  .filter(num => num % 2 === 0)
  .map(num => num * 2)
  .reduce((total, num) => total + num, 0);
  
console.log(sumOfDoubledEvenNumbers); // 24 (2*2 + 4*2 + 6*2)`,
    previewEnabled: true,
    codePreview: "filter(fn).map(fn).reduce(fn, initial)",
    note: "<code>filter</code>, <code>map</code>, and <code>reduce</code> are powerful array methods for transforming data without mutating the original array."
  },
  {
    id: 4,
    title: "CSS Grid Layout",
    description: "A responsive grid layout using CSS Grid",
    category: "css",
    categoryName: "CSS",
    tags: ["layout", "grid", "responsive"],
    code: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
  padding: 20px;
}

.grid-item {
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Responsive adjustment for small screens */
@media (max-width: 600px) {
  .grid-container {
    grid-template-columns: 1fr;
    grid-gap: 15px;
    padding: 15px;
  }
}`,
    previewEnabled: false,
    codePreview: "grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));",
    note: "CSS Grid makes complex layouts simple. The <code>minmax()</code> function ensures columns are at least 250px wide but can grow to fill available space."
  },
  {
    id: 5,
    title: "Async/Await with Error Handling",
    description: "How to use async/await with proper error handling",
    category: "javascript",
    categoryName: "JavaScript",
    tags: ["async", "promises", "error-handling"],
    code: `async function fetchUserData(userId) {
  try {
    const response = await fetch(\`https://api.example.com/users/\${userId}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Re-throw to let the caller handle it
  }
}

// Using the function
async function displayUser(userId) {
  try {
    const user = await fetchUserData(userId);
    console.log('User data:', user);
  } catch (error) {
    console.log('Failed to display user:', error.message);
  }
}

// Call the function
displayUser('123');`,
    previewEnabled: true,
    codePreview: "try { await fetch() } catch (error) { /* handle */ }",
    note: "Always use <code>try/catch</code> blocks with <code>async/await</code> to handle errors properly. Check <code>response.ok</code> to catch HTTP errors."
  },
  {
    id: 6,
    title: "useContext for Global State",
    description: "Using React Context API with hooks for global state management",
    category: "react",
    categoryName: "React",
    tags: ["context", "global-state", "hooks"],
    code: `// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };
  
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// App.js
import React from 'react';
import { ThemeProvider } from './ThemeContext';
import ThemedButton from './ThemedButton';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <h1>Theme Example</h1>
        <ThemedButton />
      </div>
    </ThemeProvider>
  );
}

// ThemedButton.js
import React from 'react';
import { useTheme } from './ThemeContext';

function ThemedButton() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: isDarkMode ? '#333' : '#f0f0f0',
        color: isDarkMode ? '#fff' : '#333',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      Toggle Theme (Current: {isDarkMode ? 'Dark' : 'Light'})
    </button>
  );
}`,
    previewEnabled: false,
    codePreview: "const { value } = useContext(MyContext);",
    note: "Using Context with hooks eliminates prop drilling and makes state accessible throughout your component tree."
  },
  {
    id: 7,
    title: "CSS Flexbox Centering",
    description: "Different ways to center elements with CSS Flexbox",
    category: "css",
    categoryName: "CSS",
    tags: ["flexbox", "layout", "centering"],
    code: `/* Center both horizontally and vertically */
.center-all {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px; /* Container needs a height */
  border: 1px solid #ccc;
}

/* Center horizontally only */
.center-horizontal {
  display: flex;
  justify-content: center;
  border: 1px solid #ccc;
  padding: 20px;
}

/* Center vertically only */
.center-vertical {
  display: flex;
  align-items: center;
  height: 300px;
  border: 1px solid #ccc;
  padding: 20px;
}

/* Center with multiple items and spacing */
.center-with-space {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 300px;
  border: 1px solid #ccc;
}

/* Center and align at the bottom */
.center-bottom {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 300px;
  border: 1px solid #ccc;
}`,
    previewEnabled: false,
    codePreview: "display: flex; justify-content: center; align-items: center;",
    note: "Flexbox is the easiest way to center elements in CSS. Remember that for vertical centering, the container needs a defined height."
  },
  {
    id: 8,
    title: "JavaScript Promises Chaining",
    description: "How to chain promises for sequential asynchronous operations",
    category: "javascript",
    categoryName: "JavaScript",
    tags: ["promises", "async", "chaining"],
    code: `// Fetch user, then their posts, then comments on their first post
function fetchUserData(userId) {
  return fetch(\`https://jsonplaceholder.typicode.com/users/\${userId}\`)
    .then(response => {
      if (!response.ok) throw new Error('User not found');
      return response.json();
    })
    .then(user => {
      console.log('User:', user.name);
      // Now fetch the user's posts
      return fetch(\`https://jsonplaceholder.typicode.com/posts?userId=\${user.id}\`)
        .then(response => response.json());
    })
    .then(posts => {
      console.log('Number of posts:', posts.length);
      if (posts.length === 0) return [];
      
      // Fetch comments for the first post
      return fetch(\`https://jsonplaceholder.typicode.com/comments?postId=\${posts[0].id}\`)
        .then(response => response.json())
        .then(comments => {
          console.log('Comments on first post:', comments.length);
          return {
            user: userId,
            postCount: posts.length,
            firstPostComments: comments
          };
        });
    })
    .catch(error => {
      console.error('Error in promise chain:', error);
      throw error;
    });
}

// Usage
fetchUserData(1)
  .then(result => console.log('Final result:', result))
  .catch(error => console.error('Failed:', error));`,
    previewEnabled: true,
    codePreview: "fetch().then().then().catch()",
    note: "Chain promises with <code>.then()</code> for sequential operations. Always include a <code>.catch()</code> at the end to handle errors anywhere in the chain."
  }
];
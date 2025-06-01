import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-jsx';
import '../styles/prism-theme.css';

const CodeEditor = ({ value, onChange, language = 'javascript', readOnly = false }) => {
  const getLanguage = (lang) => {
    switch (lang) {
      case 'javascript':
      case 'js':
        return languages.javascript;
      case 'jsx':
        return languages.jsx;
      case 'html':
      case 'markup':
        return languages.markup;
      case 'css':
        return languages.css;
      default:
        return languages.javascript;
    }
  };

  return (
    <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
      <Editor
        value={value}
        onValueChange={readOnly ? () => {} : onChange}
        highlight={code => highlight(code, getLanguage(language))}
        padding={16}
        style={{
          fontFamily: '"Fira Code", "Fira Mono", monospace',
          fontSize: 14,
          lineHeight: 1.5,
          minHeight: '200px',
        }}
        className="code-editor"
        readOnly={readOnly}
      />
    </div>
  );
};

export default CodeEditor;
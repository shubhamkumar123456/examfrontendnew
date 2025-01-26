// pages/CodeTestPage.js
import React from 'react';
import CodeEditor from '../components/CodeEditor';

const CodeTestPage = () => {
  const handleCodeSubmit = (code) => {
    // Submit code to backend for execution
    console.log('Code submitted:', code);
  };

  return (
    <div>
      <h2>Coding Test</h2>
      <CodeEditor language="javascript" onCodeSubmit={handleCodeSubmit} />
    </div>
  );
};

export default CodeTestPage;

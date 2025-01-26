// components/CodeEditor.js
import React, { useState } from 'react';
import { Editor, Monaco } from '@monaco-editor/react';
import axios from 'axios';
import url from '../config/URL';

const CodeEditor = ({ language }) => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  console.log(output)

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(url+'/api/code/execute', {
        code,
        language,
      });
      setOutput(response.data.stdout || response.data.stderr);
    } catch (error) {
      setOutput('Error executing code');
    }
  };

  return (
    <div>
      <Editor
    
        height="500px"
        defaultLanguage={language}
        defaultValue="// Write your code here"
        onChange={handleEditorChange}
      />
      <button onClick={handleSubmit}>Submit Code</button>
      <pre>{output}</pre>
    </div>
  );
};

export default CodeEditor;

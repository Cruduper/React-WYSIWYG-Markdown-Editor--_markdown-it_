import React, { useState, useEffect } from 'react';
import MarkdownIt from 'markdown-it';
import {demoText} from '../../data/demoText.js'
import './LiveMarkdownEditor.scss';

const md_it = new MarkdownIt();

const LiveMarkdownEditor = () => {
  const [textInput, setTextInput] = useState(demoText);
  const [htmlPreview, setHtmlPreview] = useState('');
  const [viewMode, setViewMode] = useState('preview'); // 'preview', 'markdown', or 'html'

  useEffect(() => {
    setHtmlPreview(md_it.render(demoText));
  }, [])

  const handleTextInputChange = (event) => {
    const rawText = event.target.value;
    setTextInput(rawText);
    const html = md_it.render(rawText);
    setHtmlPreview(html);
  };

  return (
    <div className="text-editor">
      <textarea
        value={textInput}
        onChange={handleTextInputChange}
        className="markdown-input"
      />
      <div className="view-buttons">
        <button onClick={() => setViewMode('preview')}>HTML Preview</button>
        <button onClick={() => setViewMode('markdown')}>Raw Markdown</button>
        <button onClick={() => setViewMode('html')}>Raw HTML</button>
      </div>
      <div className="live-preview-container">
        <h3 id="live-preview-header-text">
          {viewMode === 'preview' && 'Formatted Preview'}
          {viewMode === 'markdown' && 'Raw Markdown'}
          {viewMode === 'html' && 'Raw HTML'}
        </h3>
        {viewMode === 'preview' &&
          <div dangerouslySetInnerHTML={{ __html: htmlPreview }} />
        }
        {viewMode === 'markdown' &&
          <pre>{textInput}</pre>
        }
        {viewMode === 'html' &&
          <pre>{htmlPreview}</pre>
        }
      </div>
    </div>
  );
};

export default LiveMarkdownEditor;

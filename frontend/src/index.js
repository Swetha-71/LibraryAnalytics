import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/theme.css';       // new global theme
import './styles/components.css';  // new component styles

const root = createRoot(document.getElementById('root'));
root.render(<App />);

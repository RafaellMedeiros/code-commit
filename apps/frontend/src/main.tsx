import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/prompt/latin-300.css';
import '@fontsource/prompt/latin-ext-300.css';
import '@fontsource/prompt/latin-400.css';
import '@fontsource/prompt/latin-ext-400.css';
import '@fontsource/prompt/latin-500.css';
import '@fontsource/prompt/latin-ext-500.css';
import '@fontsource/prompt/latin-600.css';
import '@fontsource/prompt/latin-ext-600.css';
import { App } from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

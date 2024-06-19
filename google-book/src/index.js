import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App'; // Обратите внимание на путь, если ваш Main.jsx находится в src/

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

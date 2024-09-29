import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/Authprovider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <div className='dark:bg-black dark:text-white'>
          <App />
        </div>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

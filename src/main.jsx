import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Container from './context/Container.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Container>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Container>
  </React.StrictMode>
);

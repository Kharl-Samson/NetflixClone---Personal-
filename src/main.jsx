import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'


if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker
      .register('/service-worker.jsx')
      .then(registration => {
        console.log('Service Worker registration successful');
      })
      .catch(err => {
        console.error('Service Worker registration failed:', err);
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)

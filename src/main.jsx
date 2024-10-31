import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <>
    <App />
    <Toaster
      containerStyle={{
        top: 80,
        left: 0,
        bottom: 20,
        right: 0,
      }}
    />
  </>
  // </React.StrictMode>,
)

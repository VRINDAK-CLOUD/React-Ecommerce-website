import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { UserProvider } from "./website/UserContext";
import ReactDOM from 'react-dom/client';
import { ProductCountProvider } from './website/ProductCountContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
     <ProductCountProvider>
      <App />
    </ProductCountProvider>
  </UserProvider>
)

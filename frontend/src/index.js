import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import './config/firebase-config';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51O94xUSBc7TSuqHZC3Bc3Tw2qnnPqDWIaReVHWKQ3F6WNNwfn9lZWsUf2xTYciO39iNkPON09pNX7uZpGXeLNWTq00FC5nfmBb');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

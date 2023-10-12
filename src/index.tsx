import { Amplify } from 'aws-amplify';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
Amplify.configure({
  Auth: {
    region: import.meta.env.VITE_BUCKET_REGION,
    userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_COGNITO_USER_POO_WEB_CLIENT_ID,
  },
  aws_appsync_graphqlEndpoint: import.meta.env.VITE_PUSH_NOTIFICATION_API!,
  aws_appsync_region: import.meta.env.VITE_BUCKET_REGION!,
  aws_appsync_authenticationType: import.meta.env.VITE_APPSYNC_API!,
  aws_appsync_apiKey: import.meta.env.VITE_APPSYNC_API_KEY!,
});
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

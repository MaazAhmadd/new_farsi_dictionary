import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initDB } from 'react-indexed-db';

initDB({
  name: 'MyDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'en2fa',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [{ name: 'en2fa', keypath: 'en2fa', options: { unique: false } }],
    },
    {
      store: 'fa2en',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [{ name: 'fa2en', keypath: 'fa2en', options: { unique: false } }],
    },
    {
      store: 'en2faAllWords',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [{ name: 'en2faAllWords', keypath: 'en2faAllWords', options: { unique: false } }],
    },
    {
      store: 'fa2enAllWords',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [{ name: 'fa2enAllWords', keypath: 'fa2enAllWords', options: { unique: false } }],
    },
  ],
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

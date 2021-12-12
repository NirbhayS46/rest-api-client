import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

// render(<App />, document.getElementById('root'));
ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

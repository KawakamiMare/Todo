import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from '@mui/material/CssBaseline';

const queryClient = new QueryClient();
const theme = createTheme();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      {/* アプリ全体をProviderで囲む */}
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  </ThemeProvider>
);



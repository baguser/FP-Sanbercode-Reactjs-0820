import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Main from './components/Main';

import './App.css';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <UserProvider>
          <Main />
        </UserProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

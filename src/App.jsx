// src/App.jsx
import React from 'react';
import IncidentsContainer from './components/IncidentsContainer';
import './App.css';

function App()
{
  return (
    <div className="app">
      {/* <header className="app-header">
        <h1>Incident Management System</h1>
      </header> */}
      <main className="app-main">
        <IncidentsContainer />
      </main>
    </div>
  );
}

export default App;

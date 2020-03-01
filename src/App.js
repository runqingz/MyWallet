import React from 'react';
import './App.css';
import Dashboard from './web/components/Dashboard';
import Header from './web/components/layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;

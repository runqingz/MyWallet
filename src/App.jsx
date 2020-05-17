import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

// Components
import Routes from './Routes';

import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router basename="/">
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;

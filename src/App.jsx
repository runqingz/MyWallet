import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

// Components
import Routes from './Routes';

import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { store, persistor } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router basename="/">
          <Routes />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;

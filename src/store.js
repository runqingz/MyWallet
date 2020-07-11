/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './web/reducers';

const initialState = {};
const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authentication'],
};

const pReducer = persistReducer(persistConfig, rootReducer);

// eslint-disable-next-line import/no-mutable-exports
export const store = (window.navigator.userAgent.includes('Chrome') || window.navigator.userAgent.includes('Firefox'))
  ? createStore(
    pReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  ) : createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
    ),
  );

export const persistor = persistStore(store);

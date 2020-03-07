/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './web/reducers';

const initialState = {};
const middleware = [thunk];
// eslint-disable-next-line import/no-mutable-exports
let store;

if (window.navigator.userAgent.includes('Chrome') || window.navigator.userAgent.includes('Firefox')) {
  store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );
} else {
  store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
    ),
  );
}

export default store;

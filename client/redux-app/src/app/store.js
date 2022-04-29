import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';

export const history = createBrowserHistory();

const initialState = {};
const enhancers = [];
const sagaMiddleware = createSagaMiddleware();
const middleware = [routerMiddleware(history), sagaMiddleware];

if (typeof window.devToolsExtension === 'function') {
  enhancers.push(window.devToolsExtension());
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
);

const store = createStore(rootReducer, initialState, composedEnhancers);
store.runSaga = sagaMiddleware.run;
store.runSaga(rootSaga);
export default store;

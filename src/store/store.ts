import { createStore, applyMiddleware  } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers';
import rootSaga from '../sagas/rootSagas';

export const history = createBrowserHistory()

export default function configureStore(preloadedState?: any) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [routerMiddleware(history), sagaMiddleware];
  const store = createStore(
    rootReducer(history),
    applyMiddleware(...middlewares)
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
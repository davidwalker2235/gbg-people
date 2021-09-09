import { createStore, applyMiddleware  } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import rootReducer from '../reducers';

export const history = createBrowserHistory()

export default function configureStore(preloadedState?: any) {
  const middlewares = [routerMiddleware(history)];
  return createStore(
    rootReducer(history),
    applyMiddleware(...middlewares)
  );
}
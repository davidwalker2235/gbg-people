import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import loadingReducer from './loadingReducer';
import listReducer from './listReducer';
import modalReducer from './modalReducer';
import filterReducer from './filterReducers';

const rootReducer = (history: History) => combineReducers({
  loading: loadingReducer,
  list: listReducer,
  modal: modalReducer,
  filter: filterReducer,
  router: connectRouter(history)
})

export default rootReducer;
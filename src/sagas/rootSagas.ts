import { all } from 'redux-saga/effects';
import homeSagas from './homeSagas';
import listSagas from './listSagas';
import personSagas from './personSagas';
import filterSagas from './filterSagas';

export default function* rootSaga() {
  yield all([
    homeSagas(),
    listSagas(),
    personSagas(),
    filterSagas()
  ])
}
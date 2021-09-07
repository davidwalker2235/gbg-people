import { put, takeLatest, all, call } from 'redux-saga/effects';
import {GET_PERSON_DATA, GET_FRIEND_DATA} from '../constants/constants';
import { hideLoading, showLoading } from '../actions/loadingActions';
import { Actions } from '../interfaces/appInterfaces';
import { setPersonData, setFriendData } from '../actions/personActions';
import { Person } from '../interfaces/appInterfaces';
import { getPersonData } from '../shared/utils';

const getPerson = ({value}: Actions): Person => {
  return getPersonData(value.id, value.globalData);
}

// SAGAS
function* fetchGetPersonData(data: Actions) {
  try {
    yield put(showLoading());
    const personData = yield call(getPerson, data);
    yield put(setPersonData(personData));
    yield put(hideLoading());
  } catch (e) {
    alert(e.message)
  }
}

function* fetchGetFriendData(data: Actions) {
  try {
    yield put(showLoading());
    const personData = yield call(getPerson, data);
    yield put(setFriendData(personData));
    yield put(hideLoading());
  } catch (e) {
    alert(e.message)
  }
}

function* watchGetPersonData() {
  yield takeLatest(GET_PERSON_DATA, fetchGetPersonData)
}

function* watchGetFriendData() {
  yield takeLatest(GET_FRIEND_DATA, fetchGetFriendData)
}

function* personSagas() {
  yield all([
    watchGetPersonData(),
    watchGetFriendData()
  ])
}

export default personSagas;


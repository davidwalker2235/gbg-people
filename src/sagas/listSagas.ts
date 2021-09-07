import { put, takeLatest, all, call } from 'redux-saga/effects';
import {GET_PERSON_LIST_DATA, GET_FRIENDS_LIST_DATA} from '../constants/constants';
import { getPersonsList, getFriendsList } from '../shared/utils';
import { hideLoading, showLoading } from '../actions/loadingActions';
import { setPersonListData, setFriendsListData } from '../actions/listActions';
import { Actions, ListInfoData, FriendsData } from '../interfaces/appInterfaces';

const getPersonsListData = ({value}: Actions): ListInfoData => {
  return getPersonsList(value) 
}

const getFriendsListData = ({value}: Actions): FriendsData[] => {
  return getFriendsList(value.friendsList, value.globalData) 
}

// SAGAS
function* fetchGetPersonListData(data: Actions) {
  try {
    yield put(showLoading());
    const listData: ListInfoData = yield call(getPersonsListData, data);
    yield put(setPersonListData(listData));
    yield put(hideLoading());
  } catch (e) {
    alert(e.message)
  }
}

function* fetchGetFriendsListData(data: Actions) {
  try {
    yield put(showLoading());
    const friendsListData: FriendsData[] = yield call(getFriendsListData, data);
    yield put(setFriendsListData(friendsListData));
    yield put(hideLoading());
  } catch (e) {
    alert(e.message)
  }
}

// WATCHERS
function* watchGetPersonListData() {
  yield takeLatest(GET_PERSON_LIST_DATA, fetchGetPersonListData)
}

function* watchGetFriendsListData() {
  yield takeLatest(GET_FRIENDS_LIST_DATA, fetchGetFriendsListData)
}

function* listSagas() {
  yield all([
    watchGetPersonListData(),
    watchGetFriendsListData()
  ])
}

export default listSagas;


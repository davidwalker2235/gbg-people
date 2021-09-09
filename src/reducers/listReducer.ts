import { SET_PERSON_LIST_DATA, SET_NUM_OF_PAGES} from '../constants/constants';
import { Actions, ListProps } from '../interfaces/appInterfaces';

const initialState: ListProps = {
  personListData: [],
  numOfPages: 0
}

export default function listReducer(state: ListProps = initialState, action: Actions) {
  switch (action.type) {
    case SET_PERSON_LIST_DATA:
      return { ...state, personListData: action.value.listData };
    case SET_NUM_OF_PAGES:
      return { ...state, numOfPages: action.value };
    default:
      return state;
  }
}
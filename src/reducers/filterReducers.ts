import {SET_FILTER_DATA, REMOVE_CLEAR_FILTERS_BUTTON} from '../constants/constants';
import {Actions, FilterData, FilterState} from '../interfaces/appInterfaces';

const initialValue = {
  forename: '',
  gender: [],
  home_city: [],
}

const initialState: FilterState = {
  filterData: initialValue,
  isFiltered: false
}

export default function filterReducer(state: FilterState = initialState, action: Actions) {
  switch (action.type) {
    case SET_FILTER_DATA:
      const data: FilterData = {
        forename: action.value.forename,
        gender: action.value.gender,
        home_city: action.value.home_city,
      }

      return { ...state, filterData: data, isFiltered: true };
    case REMOVE_CLEAR_FILTERS_BUTTON:
      return { ...state,
               filterData: initialValue,
               isFiltered: false };
    default:
      return state;
  }
}
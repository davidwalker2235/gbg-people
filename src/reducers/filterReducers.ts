import {SET_FILTER_DATA, SET_FILTER_DATA_FROM_FILTER, REMOVE_CLEAR_FILTERS_BUTTON} from '../constants/constants';
import { Actions, FilterState } from '../interfaces/appInterfaces';

const initialState: FilterState = {
  filterData: undefined,
  personName: '',
  isFiltered: false
}

export default function filterReducer(state: FilterState = initialState, action: Actions) {
  switch (action.type) {
    case SET_FILTER_DATA:
      const data = {
        professions: action.value.professions,
        hair_color: action.value.hair_color,
        ranges: action.value.ranges };

      return { ...state, filterData: data };
    case SET_FILTER_DATA_FROM_FILTER:
      return { ...state,
               personName: action.value.personName,
               slidersData: action.value.slidersData,
               multiSelectValue: action.value.multiSelectValue,
               isFiltered: true };
    case REMOVE_CLEAR_FILTERS_BUTTON:
      return { ...state,
               isFiltered: false };
    default:
      return state;
  }
}
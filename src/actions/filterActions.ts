import { SET_FILTER_DATA,
         REMOVE_CLEAR_FILTERS_BUTTON } from '../constants/constants';
import { Actions, FilterData } from '../interfaces/appInterfaces';

export const setFilterData = (data: FilterData): Actions => (
  {type: SET_FILTER_DATA, value: data});

export const removeClearFilters = (): Actions => (
  {type: REMOVE_CLEAR_FILTERS_BUTTON});
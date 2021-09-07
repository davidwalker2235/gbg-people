import { GET_PERSONS_BY_NAME_DATA,
         GET_FILTER_DATA,
         SET_FILTER_DATA,
         GET_LIST_DATA_FROM_FILTER,
         SET_LIST_DATA_FROM_FILTER,
         SET_FILTER_DATA_FROM_FILTER,
         REMOVE_CLEAR_FILTERS_BUTTON } from '../constants/constants';
import { Actions, FilterData, FilterState } from '../interfaces/appInterfaces';
import { Person } from '../interfaces/appInterfaces';

export const getPersonByNameListData = (name: string, globalData: Person[]): Actions => (
  {type: GET_PERSONS_BY_NAME_DATA, value: {name, globalData}});

export const getFilterData = (globalData: Person[]): Actions => (
  {type: GET_FILTER_DATA, value: globalData});

export const setFilterData = (data: FilterData): Actions => (
  {type: SET_FILTER_DATA, value: data});

export const setFilterDataFromFilter = (data: FilterState): Actions => (
  {type: SET_FILTER_DATA_FROM_FILTER, value: data});

export const getListDataFromFilter = (filterData: any, globalData: Person[]): Actions => (
  {type: GET_LIST_DATA_FROM_FILTER, value: {filterData, globalData}});

export const setListDataFromFilter = (data: FilterData): Actions => (
  {type: SET_LIST_DATA_FROM_FILTER, value: data});

export const removeClearFilters = (): Actions => (
  {type: REMOVE_CLEAR_FILTERS_BUTTON});
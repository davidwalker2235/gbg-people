import {SET_PERSON_LIST_DATA, SET_NUM_OF_PAGES} from '../constants/constants';
import { Actions, ListInfoData } from '../interfaces/appInterfaces';

export const setPersonListData = (personListData: ListInfoData): Actions => (
  {type: SET_PERSON_LIST_DATA, value: personListData});

export const setNumOfPages = (numOfPages: number): Actions => (
  {type: SET_NUM_OF_PAGES, value: numOfPages});
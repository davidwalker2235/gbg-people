import {GET_PERSON_DATA} from '../constants/constants';
import { Actions } from '../interfaces/appInterfaces';
import { Person } from '../interfaces/appInterfaces';

export const getPersonData = (id: number | undefined, globalData: Person[]): Actions => (
  {type: GET_PERSON_DATA, value: {id, globalData}});

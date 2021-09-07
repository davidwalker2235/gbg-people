import {GET_PERSON_DATA, SET_PERSON_DATA, SET_FRIEND_DATA, GET_FRIEND_DATA} from '../constants/constants';
import { Actions } from '../interfaces/appInterfaces';
import { Person } from '../interfaces/appInterfaces';

export const getPersonData = (id: number | undefined, globalData: Person[]): Actions => (
  {type: GET_PERSON_DATA, value: {id, globalData}});

export const setPersonData = (personData: any): Actions => (
  {type: SET_PERSON_DATA, value: personData});

export const getFriendData = (id: any, globalData: Person[]): Actions => (
  {type: GET_FRIEND_DATA, value: {id, globalData}});

export const setFriendData = (personData: any): Actions => (
  {type: SET_FRIEND_DATA, value: personData});
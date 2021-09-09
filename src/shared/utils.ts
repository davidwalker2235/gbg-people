import {Person} from "../interfaces/appInterfaces";
import moment from "moment";
import 'moment/locale/es';

export const getPersonData = (id: number, PersonData: Person[]): Person => {
  return PersonData.find(person => person.id === id) as Person;
}

export const getMomentFromString = (date: string) => {
  const sss = date ? moment(date, 'DD/MM/YYYY').locale('es') : moment();
  return moment(sss);
}

import axios from 'axios';
import { parseFromApiToPerson } from '../shared/models';
import {IPersonRequest, IUpdateRequest, PageValuesRequest} from "../interfaces/appInterfaces";
import {UrlEnum} from "../shared/enums";

class Service {
  getGlobalData = async () => {
    try {
      const response = await axios.get(UrlEnum.GET_ALL_VALUES);
      return response?.data[0]["COUNT(*)"] as number;
    } catch (error) {
      alert(error)
    }
  }

  getPersonData = async (id: number) => {
    try {
      const response = await axios.get(UrlEnum.GET_PERSON_VALUES,{ params: { id } });
      return parseFromApiToPerson({person: response?.data});
    } catch (error) {
      alert(error)
    }
  }

  getPageData = async (pageValues: PageValuesRequest) => {
    try {
      const response = await axios.post(UrlEnum.GET_PAGE_VALUES, pageValues);
      return parseFromApiToPerson({person: response?.data});
    } catch (error) {
      alert(error)
    }
  }

  getFilteredPersonsData = async (payload: any) => {
    try {
      const response = await axios.post(UrlEnum.GET_FILTERED_VALUES, payload);
      return parseFromApiToPerson({person: response?.data});
    } catch (error) {
      alert(error)
    }
  }

  getAllGender = async () => {
    try {
      const response = await axios.get(UrlEnum.GET_ALL_GENDER);
      return (response?.data && response.data.length) ? response.data.map((gender: any) => gender.gender) : [];
    } catch (error) {
      alert(error)
    }
  }

  getAllCities = async () => {
    try {
      const response = await axios.get(UrlEnum.GET_ALL_CITIES);
      return (response?.data && response.data.length) ? response.data.map((city: any) => city.home_city) : [];
    } catch (error) {
      alert(error)
    }
  }

  createPerson = async (payload: IPersonRequest) => {
    try {
      return await axios.post(UrlEnum.CREATE_PERSON, payload);
    } catch (error) {
      alert(error)
    }
  }

  deletePerson = async (id: number) => {
    try {
      return await axios.delete(UrlEnum.DELETE_PERSON,{ params: { id } });
    } catch (error) {
      alert(error)
    }
  }

  updatePerson = async (payload: IUpdateRequest) => {
    try {
      return await axios.put(UrlEnum.UPDATE_PERSON, payload);
    } catch (error) {
      alert(error)
    }
  }
}

export default Service;

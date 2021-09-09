import axios from 'axios';
import { parseFromApiToPerson } from '../shared/models';
import {IPersonRequest, IUpdateRequest, PageValuesRequest} from "../interfaces/appInterfaces";

class Service {
  getGlobalData = async () => {
    try {
      const response = await axios.get('https://f77t0ctpqh.execute-api.us-east-2.amazonaws.com/development/get-all-values');
      return response?.data[0]["COUNT(*)"] as number;
    } catch (error) {
      alert(error)
    }
  }

  getPersonData = async (id: number) => {
    try {
      const response = await axios.get('https://f77t0ctpqh.execute-api.us-east-2.amazonaws.com/development/get-person-values',{ params: { id } });
      return parseFromApiToPerson({person: response?.data});
    } catch (error) {
      alert(error)
    }
  }

  getPageData = async (pageValues: PageValuesRequest) => {
    try {
      const response = await axios.post('https://f77t0ctpqh.execute-api.us-east-2.amazonaws.com/development/get-page-values', pageValues);
      return parseFromApiToPerson({person: response?.data});
    } catch (error) {
      alert(error)
    }
  }

  getFilteredPersonsData = async (payload: any) => {
    try {
      const response = await axios.post('https://f77t0ctpqh.execute-api.us-east-2.amazonaws.com/development/get-filtered-values', payload);
      return parseFromApiToPerson({person: response?.data});
    } catch (error) {
      alert(error)
    }
  }

  getAllGender = async () => {
    try {
      const response = await axios.get('https://f77t0ctpqh.execute-api.us-east-2.amazonaws.com/development/get-all-gender');
      return (response?.data && response.data.length) ? response.data.map((gender: any) => gender.gender) : [];
    } catch (error) {
      alert(error)
    }
  }

  getAllCities = async () => {
    try {
      const response = await axios.get('https://f77t0ctpqh.execute-api.us-east-2.amazonaws.com/development/get-all-cities');
      return (response?.data && response.data.length) ? response.data.map((city: any) => city.home_city) : [];
    } catch (error) {
      alert(error)
    }
  }

  createPerson = async (payload: IPersonRequest) => {
    try {
      return await axios.post('https://f77t0ctpqh.execute-api.us-east-2.amazonaws.com/development/create-person', payload);
    } catch (error) {
      alert(error)
    }
  }

  deletePerson = async (id: number) => {
    try {
      return await axios.delete('https://f77t0ctpqh.execute-api.us-east-2.amazonaws.com/development/delete-person',{ params: { id } });
    } catch (error) {
      alert(error)
    }
  }

  updatePerson = async (payload: IUpdateRequest) => {
    try {
      return await axios.put('https://f77t0ctpqh.execute-api.us-east-2.amazonaws.com/development/update-person', payload);
    } catch (error) {
      alert(error)
    }
  }
}

export default Service;

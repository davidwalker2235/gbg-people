import axios from 'axios';
import { parseFromApiToPerson } from '../shared/models';
import {PageValuesRequest} from "../interfaces/appInterfaces";

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
}

export default Service;

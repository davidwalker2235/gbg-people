import {GlobalData, Person} from "../interfaces/appInterfaces";

export interface PersonFromApi {
    id?: number;
    date_of_birth?: string;
    email_address?: string;
    forename?: string;
    gender?: string;
    home_building_name?: string;
    home_building_number?: string;
    home_city?: string;
    home_county?: string;
    home_phone_number?: string;
    home_postcode?: string;
    home_street?: string;
    home_sub_building?: string;
    middle_names?: string;
    mobile_phone_number?: string;
    picture?: string;
    surname?: string;
    title?: string;
}

export const parseToPerson = (apiResponse: PersonFromApi): Person => {
    return {
        id: (typeof apiResponse.id === 'number') ? apiResponse.id : apiResponse.id || -1,
        date_of_birth: apiResponse?.date_of_birth || '',
        email_address: apiResponse?.email_address || '',
        forename: apiResponse?.forename || '',
        gender: apiResponse?.gender || '',
        home_building_name: apiResponse?.home_building_name || '',
        home_building_number: apiResponse?.home_building_number || '',
        home_city: apiResponse?.home_city || '',
        home_county: apiResponse?.home_county || '',
        home_phone_number: apiResponse?.home_phone_number || '',
        home_postcode: apiResponse?.home_postcode || '',
        home_street: apiResponse?.home_street || '',
        home_sub_building: apiResponse?.home_sub_building || '',
        middle_names: apiResponse?.middle_names || '',
        mobile_phone_number: apiResponse?.mobile_phone_number || '',
        picture: apiResponse?.picture || '',
        surname: apiResponse?.surname || '',
        title: apiResponse?.title || '',
    }}

export const parseFromApiToPerson = (apiResponse: GlobalData): Person[] => {
    const response: Person[] = apiResponse.person || [];

    return response.map(parseToPerson);
}
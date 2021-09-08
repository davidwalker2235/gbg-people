import {useMutation, useQuery} from 'react-query';

import Service from '../services/axios';
import {Queries} from "./query.enum";
import {useDispatch} from "react-redux";
import {IPersonRequest, PageValuesRequest, Person} from "../interfaces/appInterfaces";
import {hideLoading, showLoading} from "../actions/loadingActions";

const service = new Service();

const useGetAllDataValue = () => useQuery(
    Queries.GetAllData,
    () => service.getGlobalData(),
);

const useGetPersonData = (id: number) => useQuery(
    Queries.GetPersonData,
    () => service.getPersonData(id),
);

const useGetAllGender = () => useQuery(
    Queries.GetAllGender,
    () => service.getAllGender(),
);

const useGetAllCities = () => useQuery(
    Queries.GetAllCities,
    () => service.getAllCities(),
);

const useGetPageValuesMutation = ({onSuccess}: {onSuccess: (result: Person[]) => void}) => {
    const dispatch = useDispatch();
    return useMutation(
        (pageValues: PageValuesRequest) => {
            dispatch(showLoading());
            return service.getPageData(pageValues)
        },
        {
            onSuccess: (result) => {
                dispatch(hideLoading());
                onSuccess(result as Person[]);
            },
            onError: () => {
                dispatch(hideLoading())
            }
        }
    );
};

const useGetFilteredPersonsMutation = ({onSuccess}: any) => {
    const dispatch = useDispatch();
    return useMutation(
        (payload: any) => {
            dispatch(showLoading());
            return service.getFilteredPersonsData(payload)
        },
        {
            onSuccess: (result) => {
                dispatch(hideLoading());
                onSuccess(result);
            },
            onError: () => {
                dispatch(hideLoading())
            }
        }
    );
};

const useCreatePersonMutation = () => {
    const dispatch = useDispatch();
    return useMutation(
      (payload: IPersonRequest) => {
          dispatch(showLoading());
          return service.createPerson(payload)
      },
      {
          onSuccess: () => {
              dispatch(hideLoading())
          },
          onError: () => {
              dispatch(hideLoading())
          }
      }
    );
};

export {
    useGetAllDataValue,
    useGetPageValuesMutation,
    useGetPersonData,
    useGetFilteredPersonsMutation,
    useGetAllGender,
    useGetAllCities,
    useCreatePersonMutation
};
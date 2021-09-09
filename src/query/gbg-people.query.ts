import {useMutation, useQuery} from 'react-query';

import Service from '../services/axios';
import {Queries} from "./query.enum";
import {useDispatch} from "react-redux";
import {IPersonRequest, IUpdateRequest, PageValuesRequest, Person} from "../interfaces/appInterfaces";
import {hideLoading, showLoading} from "../actions/loadingActions";
import {hideModal} from "../actions/modalActions";

const service = new Service();

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

const useCreatePersonMutation = ({onSuccess}: {onSuccess: () => void}) => {
    const dispatch = useDispatch();
    return useMutation(
      (payload: IPersonRequest) => {
          dispatch(showLoading());
          return service.createPerson(payload)
      },
      {
          onSuccess: () => {
            dispatch(hideLoading());
            dispatch(hideModal())
            onSuccess();
          },
          onError: () => {
            dispatch(hideLoading())
          }
      }
    );
};

const useDeletePersonMutation = ({onSuccess}: {onSuccess: () => void}) => {
    const dispatch = useDispatch();
    return useMutation(
      (id: number) => {
        dispatch(showLoading());
        return service.deletePerson(id)
      },
      {
        onSuccess: () => {
          dispatch(hideModal());
          onSuccess();
        },
        onError: () => {
          dispatch(hideLoading())
        }
      }
    );
};

const useUpdatePersonMutation = ({onSuccess}: {onSuccess: () => void}) => {
    const dispatch = useDispatch();
    return useMutation(
      (payload: IUpdateRequest) => {
        dispatch(showLoading());
        return service.updatePerson(payload)
      },
      {
        onSuccess: () => {
          dispatch(hideLoading())
          onSuccess();
        },
        onError: () => {
          dispatch(hideLoading())
        }
      }
    );
};

const useGetTotalValuesMutation = ({onSuccess}: {onSuccess: (value: number) => void}) => {
  return useMutation(
    // @ts-ignore
    () => {
      return service.getGlobalData()
    },
    {
      onSuccess
    }
  );
};

export {
  useGetPageValuesMutation,
  useGetPersonData,
  useGetFilteredPersonsMutation,
  useGetAllGender,
  useGetAllCities,
  useCreatePersonMutation,
  useDeletePersonMutation,
  useUpdatePersonMutation,
  useGetTotalValuesMutation
};
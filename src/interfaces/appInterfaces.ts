import { ReactNode } from 'react';
import { RouterState } from 'connected-react-router'
import { ListTypeEnum } from "../shared/enums";

// Commons
export interface Person {
  id: number;
  date_of_birth: string;
  email_address: string;
  forename: string;
  gender: string;
  home_building_name: string;
  home_building_number: string;
  home_city: string;
  home_county: string;
  home_phone_number: string;
  home_postcode: string;
  home_street: string;
  home_sub_building: string;
  middle_names: string;
  mobile_phone_number: string;
  picture: string;
  surname: string;
  title: string;
  [key: string]: string | number;
}

export interface IPersonRequest {
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
  [key: string]: string | undefined;
}

export interface IUpdateRequest {
  id: number;
  payload: IPersonRequest;
}

export interface PageValuesRequest {
  start: number;
  end: number;
}

export interface GlobalData {
  person: Person[]
}

export interface ListData {
  id?: number;
  name?: string;
  thumbnail?: string;
}

export interface ListInfoData {
  listType?: ListTypeEnum;
  listData?: ListData[];
}

// State
export interface State {
  loading: LoadingState;
  modal: ModalState;
  home: HomeProps;
  list: ListProps;
  filter: FilterState;
  router: RouterState;
}

// Actions
export interface Actions {type: string, value?: any}

// Multiselect screen
export interface LoadingState {
  isLoading: boolean
}

// AddEditUserComponent screen
export interface ModalState {
  isOpen: boolean;
  children: ReactNode;
}

// Home
export interface HomeProps {
  globalData: Person[];
}

// Cover
export interface CoverProps {
  history: any;
}

// List
export interface ListProps {
  route?: any;
  personListData: Person[];
  numOfPages: number;
  listType?: ListTypeEnum;
  listData?: ListData[];
  onClickRow?: (name?: string, id?: number) => void;
}

export interface ListRows {
  data: Person;
  panelId: number;
  panelExpanded: string | boolean; 
  handleChange: (personId: number | undefined, panelId: string | boolean) => void;
  onClickFriend: (personId: number | undefined) => void;
}

export interface PersonInfoProps {
  id: number;
}

export interface FilterData {
  forename?: string;
  gender?: string[];
  city?: string[];
  [key: string]: any;
}

export interface FilterState {
  filterData: FilterData;
  isFiltered?: boolean
}

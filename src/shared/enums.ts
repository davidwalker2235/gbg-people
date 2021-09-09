export enum ListTypeEnum {
  PERSON
}

export enum PersonEnum {
  ID = 'id',
  DATE_OF_BIRTH = 'date_of_birth',
  EMAIL_ADDRESS = 'email_address',
  FORENAME = 'forename',
  GENDER = 'gender',
  HOME_BUILD_NAME = 'home_building_name',
  HOME_BUILD_NUMBER = 'home_building_number',
  HOME_CITY = 'home_city',
  HOME_COUNTY = 'home_county',
  HOME_PHONE_NUMBER = 'home_phone_number',
  HOME_POSTCODE = 'home_postcode',
  HOME_STREET = 'home_street',
  HOME_SUB_BUILDING = 'home_sub_building',
  MIDDLE_NAMES = 'middle_names',
  MOBILE_PHONE_NUMBER = 'mobile_phone_number',
  PICTURE = 'picture',
  SURNAME = 'surname',
  TITLE = 'title',
}

export enum UrlEnum {
  GET_ALL_VALUES = 'https://f77t0ctpqh.execute-api.us-east-2.amazonaws.com/development/get-all-values',
  GET_PERSON_VALUES = 'https://f77t0ctpqh.execute-api.us-east-2.amazonaws.com/development/get-person-values',
  GET_PAGE_VALUES = 'https://f77t0ctpqh.execute-api.us-east-2.amazonaws.com/development/get-page-values',
  GET_FILTERED_VALUES = 'https://f77t0ctpqh.execute-api.us-east-2.amazonaws.com/development/get-filtered-values',
  GET_ALL_GENDER = 'https://f77t0ctpqh.execute-api.us-east-2.amazonaws.com/development/get-all-gender',
  GET_ALL_CITIES = 'https://f77t0ctpqh.execute-api.us-east-2.amazonaws.com/development/get-all-cities',
  CREATE_PERSON = 'https://f77t0ctpqh.execute-api.us-east-2.amazonaws.com/development/create-person',
  DELETE_PERSON = 'https://f77t0ctpqh.execute-api.us-east-2.amazonaws.com/development/delete-person',
  UPDATE_PERSON = 'https://f77t0ctpqh.execute-api.us-east-2.amazonaws.com/development/update-person',
}
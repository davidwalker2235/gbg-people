import {PersonEnum} from "../../shared/enums";

const leftPanel = [
  {
    key: PersonEnum.TITLE,
    type: 'select',
    values: ['Mr', 'Mrs'],
    disabled: false
  },
  {
    key: PersonEnum.FORENAME,
    type: 'input',
    disabled: false
  },
  {
    key: PersonEnum.MIDDLE_NAMES,
    type: 'input',
    disabled: false
  },
  {
    key: PersonEnum.SURNAME,
    type: 'input',
    disabled: false
  },
  {
    key: PersonEnum.HOME_STREET,
    type: 'input',
    disabled: false
  },
  {
    key: PersonEnum.HOME_BUILD_NAME,
    type: 'input',
    disabled: false
  },
  {
    key: PersonEnum.HOME_BUILD_NUMBER,
    type: 'input',
    disabled: false
  },
  {
    key: PersonEnum.HOME_SUB_BUILDING,
    type: 'input',
    disabled: false
  }
]

const rightPanel = [
  {
    key: PersonEnum.HOME_CITY,
    type: 'input',
    disabled: false
  },
  {
    key: PersonEnum.HOME_POSTCODE,
    type: 'input',
    disabled: false
  },
  {
    key: PersonEnum.HOME_COUNTY,
    type: 'input',
    disabled: false
  },
  {
    key: PersonEnum.HOME_PHONE_NUMBER,
    type: 'input',
    disabled: false
  },
  {
    key: PersonEnum.MOBILE_PHONE_NUMBER,
    type: 'input',
    disabled: false
  },
  {
    key: PersonEnum.EMAIL_ADDRESS,
    type: 'input',
    disabled: false
  },
  {
    key: PersonEnum.GENDER,
    type: 'select',
    values: ['male', 'female', 'nonbinary', 'undisclosed'],
    disabled: false
  },
  {
    key: PersonEnum.DATE_OF_BIRTH,
    type: 'datepicker',
    disabled: false
  }
]

export default {
  leftPanel,
  rightPanel
}
import React, {FC, useEffect, useState} from 'react';
import styles from './styles';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField
} from '@material-ui/core';
import locale from '../../shared/locale';
import {useDispatch, useSelector} from 'react-redux';
import { Person, State} from '../../interfaces/appInterfaces';
import {removeClearFilters} from '../../actions/filterActions';
import {ListTypeEnum, PersonEnum} from '../../shared/enums';
import {
  useGetAllCities,
  useGetAllGender,
  useGetFilteredPersonsMutation,
  useGetPageValuesMutation
} from "../../query/gbg-people.query";
import {setPersonListData} from "../../actions/listActions";
import {Multiselect} from "../index";

interface MultiselectData {
  [key: string]: string[];
}

const emptyMultiSelectValue: MultiselectData = {
  [PersonEnum.GENDER]: [],
  [PersonEnum.HOME_CITY]: []
}

const FilterComponent: FC<{}> = () => {
  const dispatch = useDispatch();
  const isFiltered: boolean | undefined = useSelector((state: State) => state.filter.isFiltered);
  const [statePersonName, setStatePersonName] = useState<string>('');
  const classes = styles();
  const [genders, setGenders] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [stateMultiSelectValue, setStateMultiSelectValue] = useState<MultiselectData>(emptyMultiSelectValue);

  const {data: gendersResponse} = useGetAllGender();
  const {data: citiesResponse} = useGetAllCities();
  const {mutateAsync: fetchGetFilteredData} = useGetFilteredPersonsMutation({
    onSuccess: (result: Person[]) => {
      dispatch(setPersonListData({listData: result}))
    }}
  )

  const {mutateAsync: fetchGetPage} = useGetPageValuesMutation({
    onSuccess: (response: Person[]) => {
      dispatch(setPersonListData({
        listType: ListTypeEnum.PERSON,
        listData: response
      }));
    }
  })

  useEffect(() => {
    setGenders(gendersResponse);
    setCities(citiesResponse);
  }, [gendersResponse, citiesResponse])

  const onChangeName = (event: any) => {
    setStatePersonName(event.target.value)
  }

  const onClickFilter = () => {
    let payload = {};
    if(statePersonName.length) payload = {...payload, [PersonEnum.FORENAME]: statePersonName};
    Object.keys(stateMultiSelectValue).forEach((key) => {
      if(stateMultiSelectValue[key].length) payload = {...payload, [key]: stateMultiSelectValue[key]};
    })

    if (Object.keys(payload).length) {
      fetchGetFilteredData(payload)
    } else {
      fetchGetPage({start: 0, end: 10})
    }
  }

  const onClickClearFilter = () => {
    setStatePersonName('');
    dispatch(removeClearFilters());
  }

  const handleSelectMultipleChange = (event: React.ChangeEvent<{ value: unknown }>, multiSelectOption: PersonEnum) => {
    setStateMultiSelectValue({...stateMultiSelectValue, [multiSelectOption]: event.target.value as string[]});
  };

  return (
    <div
      className={classes.list}
      role="presentation"
    >
      <List>
        <ListItem key="filterTitle">
          <ListItemText primary={locale.SelectToFilter} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key={PersonEnum.FORENAME}>
          <TextField
            className={classes.nameImput}
            id="standard-basic"
            label={locale.Name}
            onChange={onChangeName}
            value={statePersonName} />
        </ListItem>
        <ListItem key={PersonEnum.FORENAME}>
          <Multiselect
              dataOption={PersonEnum.GENDER}
              options={genders}
              onChange={handleSelectMultipleChange}
              valuesSelected={stateMultiSelectValue} />
        </ListItem>
        <ListItem key={PersonEnum.FORENAME}>
          <Multiselect
              dataOption={PersonEnum.HOME_CITY}
              options={cities}
              onChange={handleSelectMultipleChange}
              valuesSelected={stateMultiSelectValue} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem className={classes.filterButton} button key="filterButton" onClick={onClickFilter}>
          <ListItemText className={classes.buttonText} primary={locale.Filter} />
        </ListItem>
      </List>
      <Divider />
      {isFiltered && <List>
        <ListItem className={classes.clearFilterButton} button key="filterButton" onClick={onClickClearFilter}>
          <ListItemText className={classes.buttonText} primary={locale.ClearFilters} />
        </ListItem>
      </List>}
    </div>
  );
}

export default FilterComponent;
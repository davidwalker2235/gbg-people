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
import {FilterData, Person, State} from '../../interfaces/appInterfaces';
import {removeClearFilters, setFilterData} from '../../actions/filterActions';
import {ListTypeEnum, PersonEnum} from '../../shared/enums';
import {
  useGetAllCities,
  useGetAllGender,
  useGetFilteredPersonsMutation,
  useGetPageValuesMutation
} from "../../query/gbg-people.query";
import {setPersonListData} from "../../actions/listActions";
import {Multiselect} from "../index";

const FilterComponent: FC<{}> = () => {
  const dispatch = useDispatch();
  const isFiltered: boolean | undefined = useSelector((state: State) => state.filter.isFiltered);
  const filterData: FilterData = useSelector((state: State) => state.filter.filterData);
  const classes = styles();
  const [genders, setGenders] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

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
    setGenders(gendersResponse as string[]);
    setCities(citiesResponse as string[]);
  }, [gendersResponse, citiesResponse])

  const onChangeName = (event: any) => {
    dispatch(setFilterData({...filterData, [PersonEnum.FORENAME]: event.target.value}))
  }

  const onClickFilter = () => {
    let payload: FilterData = {};
    if(filterData[PersonEnum.FORENAME]?.length) payload = {...payload, [PersonEnum.FORENAME]: filterData[PersonEnum.FORENAME]};
    Object.keys(filterData).forEach((key) => {
      if(filterData[key].length) payload = {...payload, [key]: filterData[key]};
    })
    if (Object.keys(payload).length) {
      fetchGetFilteredData(payload)
    } else {
      fetchGetPage({start: 0, end: 10})
    }
  }

  const onClickClearFilter = () => {
    dispatch(removeClearFilters());
    fetchGetPage({start: 0, end: 10});
  }

  const handleSelectMultipleChange = (event: React.ChangeEvent<{ value: unknown }>, multiSelectOption: PersonEnum) => {
    dispatch(setFilterData({...filterData, [multiSelectOption]: event.target.value}))
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
            value={filterData[PersonEnum.FORENAME]} />
        </ListItem>
        <ListItem key={PersonEnum.GENDER}>
          <Multiselect
              dataOption={PersonEnum.GENDER}
              options={genders}
              onChange={handleSelectMultipleChange}
              valuesSelected={{[PersonEnum.GENDER]: filterData[PersonEnum.GENDER] as string[]}} />
        </ListItem>
        <ListItem key={PersonEnum.HOME_CITY}>
          <Multiselect
              dataOption={PersonEnum.HOME_CITY}
              options={cities}
              onChange={handleSelectMultipleChange}
              valuesSelected={{[PersonEnum.HOME_CITY]: filterData[PersonEnum.HOME_CITY] as string[]}} />
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
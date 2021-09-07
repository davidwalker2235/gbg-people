import React, { FC, useState } from 'react';
import styles from './styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import locale from '../../shared/locale';
import { useSelector, useDispatch } from 'react-redux';
import { State, FilterState } from '../../interfaces/appInterfaces';
import { setFilterDataFromFilter, removeClearFilters } from '../../actions/filterActions';
import { PersonEnum } from '../../shared/enums';

const FilterComponent: FC<{}> = () => {
  const dispatch = useDispatch();
  const isFiltered: boolean | undefined = useSelector((state: State) => state.filter.isFiltered);
  const [statePersonName, setStatePersonName] = useState<string>('');
  const classes = styles();

  const onChangeName = (event: any) => {
    setStatePersonName(event.target.value)
  }

  const onClickFilter = () => {
    dispatch(setFilterDataFromFilter(
      {
        personName: statePersonName,
      } as FilterState
    ));
  }

  const onClickClearFilter = () => {
    setStatePersonName('');
    dispatch(removeClearFilters());
  }

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
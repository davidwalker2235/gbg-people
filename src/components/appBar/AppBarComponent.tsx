import React, {FC, useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import {FilterComponent, AddEditUserComponent} from '../../components';
import styles from './styles';
import locale from '../../shared/locale';
import logo from '../../shared/images/gbg-group-logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import {Person, State} from '../../interfaces/appInterfaces';
import { removeClearFilters } from '../../actions/filterActions';
import { Button } from '@material-ui/core';
import {ListTypeEnum} from '../../shared/enums';
import {useGetFilteredPersonsMutation, useGetPageValuesMutation} from "../../query/gbg-people.query";
import {setPersonListData} from "../../actions/listActions";
import {hideModal, showModal} from "../../actions/modalActions";

const AppBarComponent: FC<any> = ({children}) => {
  const dispatch = useDispatch();
  const isFiltered = useSelector((state: State) => state.filter.isFiltered);
  const classes = styles();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(searchTerm)
      if (searchTerm !== undefined && searchTerm.length) {
        fetchGetFilteredData({forename: searchTerm});
      } else if (!searchTerm?.length) {
        fetchGetPage({start: 0, end: 10});
      }
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

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

  const toggleDrawer = (anchor: any, open: boolean) => () => {
    setIsOpen(open);
  };

  const onClickClearFilter = () => {
    dispatch(removeClearFilters());
  }

  const handleCancel = () => {
    dispatch(hideModal());
  }

  const onClickNewUser = () => {
    dispatch(showModal(
      <AddEditUserComponent onCancel={handleCancel}/>
    ));
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer('left', true)}
            onKeyDown={toggleDrawer('left', true)}>
              <Typography className={classes.title} variant="h6" noWrap>
                {locale.Filter}
              </Typography>
            <SearchIcon className={classes.filterIcon} />
          </IconButton>
          <div className={classes.title}>
            <img className={classes.logoImageTitle} alt='CoverImage' src={logo} />
          </div>
          {isFiltered && <Button variant="contained" color="secondary" onClick={onClickClearFilter}>
            {locale.ClearFilters}
          </Button>}
          <Button variant="contained" color="primary" onClick={onClickNewUser}>
            {locale.NewUser}
          </Button>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder={locale.SearchByPersonsName}
              onChange={(e) => setSearchTerm(e.target.value)}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer anchor='left' open={isOpen} onClose={toggleDrawer('left', false)}>
        <FilterComponent />
      </Drawer>
      {children}
    </div>
  );
}

export default AppBarComponent;
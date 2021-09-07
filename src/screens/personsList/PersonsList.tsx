import React, { FC, useState, useEffect } from 'react';
import {useDispatch, connect, useSelector} from 'react-redux';
import { Pagination } from '@material-ui/lab';
import {ListProps, Person} from '../../interfaces/appInterfaces';
import Container from '@material-ui/core/Container';
import {AppBarComponent} from '../../components';
import {State} from '../../interfaces/appInterfaces';
import styles from './styles';
import {ExpansionPanelComponent} from '../../components';
import backgroundFog from '../../shared/images/fogBackground.png';
import { getPersonData } from '../../actions/personActions';
import Typography from '@material-ui/core/Typography';
import {useGetAllDataValue, useGetPageValuesMutation} from "../../query/gbg-people.query";
import {setPersonListData} from "../../actions/listActions";
import {ListTypeEnum} from "../../shared/enums";
import {hideLoading, showLoading} from "../../actions/loadingActions";

const PersonsList: FC<ListProps> = () => {
  const classes = styles();
  const dispatch = useDispatch();
  const [expandedPanel, setExpandedPanel] = useState<string | boolean>(false);
  const personListData = useSelector((state: State) => state.list.personListData);
  const [page, setPage] = useState(1);

  const {isLoading, data: globalData} = useGetAllDataValue();
  const {mutateAsync: fetchGetPage} = useGetPageValuesMutation({
    onSuccess: (response: Person[]) => {
      dispatch(setPersonListData({
        listType: ListTypeEnum.PERSON,
        listData: response
      }));
    }
  })

  const VALUES_PER_PAGE = 10;

  useEffect(() => {
    const persons: any = fetchGetPage({start: 0, end: 10});
    dispatch(setPersonListData({listData: persons}))
  },[]);

  useEffect(() => {
    setExpandedPanel(false);
  },[personListData]);

  useEffect(() => {
    isLoading ? dispatch(showLoading()) : dispatch(hideLoading());
  },[isLoading]);

  const handleSelectPerson = (personId: number | undefined, panelId: string | boolean) => {
    dispatch(getPersonData(personId, personListData));
    setExpandedPanel(panelId);
  };

  const handleChange = (event: any, value: any) => {
    setExpandedPanel(false);
    fetchGetPage({start: (value -1) * 10, end: ((value -1) * 10) + 10})
    setPage(value);
  };

  const getNumberOfPages = () => {
    return Math.ceil(globalData as number / VALUES_PER_PAGE);
  }

  return (
    <div>
      <img alt='personListBGImage' className={classes.psBackground} src={backgroundFog} />
      <AppBarComponent>
        <Container className={classes.container}>
          <div className={classes.root}>
            <Pagination className={classes.pagination} variant="outlined" color="primary" count={getNumberOfPages()} page={page} onChange={handleChange} />
            {personListData?.length ? personListData?.map((person: Person, index: number) => (
              <ExpansionPanelComponent
                  data={person}
                  key={`person${index}`}
                  panelId={index}
                  panelExpanded={expandedPanel}
                  handleChange={handleSelectPerson}
                  onClickFriend={() => null}
              />
            )) :
            <Typography variant="subtitle1" color='primary'>
              There aren't citizens on the city
            </Typography>}
          </div>
        </Container>
      </ AppBarComponent>
    </div>
	)
}

const mapStateToProps = (state: State) => ({
  personListData: state.list.personListData
})

export default connect(mapStateToProps, null)(PersonsList);
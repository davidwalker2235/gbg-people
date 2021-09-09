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
import {useGetPageValuesMutation, useGetTotalValuesMutation} from "../../query/gbg-people.query";
import {setNumOfPages, setPersonListData} from "../../actions/listActions";
import {ListTypeEnum} from "../../shared/enums";

const PersonsList: FC<ListProps> = () => {
  const classes = styles();
  const dispatch = useDispatch();
  const [expandedPanel, setExpandedPanel] = useState<string | boolean>(false);
  const personListData = useSelector((state: State) => state.list.personListData);
  const numOfPages = useSelector((state: State) => state.list.numOfPages);
  const [page, setPage] = useState(1);

  const {mutateAsync: fetchGetTotalNumberOfValues} = useGetTotalValuesMutation({
    onSuccess: (values: number) => {
      dispatch(setNumOfPages(values as number));
    }
  })
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
    fetchGetPage({start: 0, end: VALUES_PER_PAGE});
  },[]);

  useEffect(() => {
    setExpandedPanel(false);
    setPage(1);
    fetchGetTotalNumberOfValues()
  },[personListData, numOfPages]);

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
    return Math.ceil(numOfPages / VALUES_PER_PAGE);
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
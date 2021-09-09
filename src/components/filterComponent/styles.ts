import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  nameImput: {
    width: '100%'
  },
  list: {
    width: 400,
    overflowX: 'hidden'
  },
  filterButton: {
    color: 'white',
    width: '95%',
    margin: theme.spacing(1),
    backgroundColor: 'purple',
    '&:hover': {
      backgroundColor: 'blue !important',
    color: 'white'
    }
  },
  clearFilterButton: {
    color: 'white',
    width: '95%',
    backgroundColor: 'red',
    '&:hover': {
      backgroundColor: 'orange !important',
    color: 'white'
    }
  },
  buttonText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

export default styles;
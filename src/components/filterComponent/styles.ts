import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  title: {
    flexGrow: 1,
    display: 'none',
  },
  nameImput: {
    width: '100%'
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  },
  list: {
    width: 400,
    overflowX: 'hidden'
  },
    fullList: {
    width: 'auto',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '40ch',
      },
    },
  },
  filterButton: {
    color: 'white',
    backgroundColor: 'purple',
    '&:hover': {
      backgroundColor: 'blue !important',
    color: 'white'
    }
  },
  clearFilterButton: {
    color: 'white',
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
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(() => ({
  details: {
    display: 'flex',
    justifyContent: 'end',
    flexDirection: 'column',
    width: '100%'
  },
  content: {
    flex: '1 0 auto',
    padding: 0,
    marginRight: 50
  },
  imput: {
    width: '100%'
  },
  select: {
    width: '100%'
  },
}));

export default styles;
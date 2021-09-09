import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      width: '95%',
      boxShadow: 'none',
      padding: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
    details: {
      display: 'flex',
      justifyContent: 'end',
      flexDirection: 'column',
      width: '100%'
    },
    content: {
      flex: '1 0 auto',
      padding: 0
    },
    buttonRoot: {
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
    },
    button: {
      marginLeft: 20
    },
    cover: {
      width: 151,
    },
    imageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
  }),
);

export default styles;
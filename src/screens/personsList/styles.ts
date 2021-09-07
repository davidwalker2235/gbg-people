import { makeStyles, Theme, createStyles  } from '@material-ui/core/styles';

const styles = makeStyles((theme: Theme) => createStyles({
  psBackground: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    backgroundRepeat: 'repeat-y'
  },
  root: {
    width: '100%',
    paddingTop: 60
  },
  container: {
    width: '60%',
    padding: 20
  },

  pagination: {
    marginBottom: 20
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default styles;
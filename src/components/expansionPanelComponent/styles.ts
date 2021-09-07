import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    paddingLeft: 10
  },
  summary: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  detailsRoot: {
    padding: '0 !important'
  }
}));

export default styles;
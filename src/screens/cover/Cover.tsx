import React, { FC } from 'react';
import { withRouter } from 'react-router-dom'
import { CoverProps } from '../../interfaces/appInterfaces';
import styles from './styles';
import cover from '../../shared/images/cover.jpg';
import Button from '@material-ui/core/Button';
import locale from '../../shared/locale';

const Cover: FC<CoverProps> = ({ history }) => {
  const classes = styles();

  const onClickEnterCity = () => {
    history.push("/personList");
  }

  return (
    <div className={classes.coverContainer}>
      <img alt='CoverImage' className={classes.coverImage} src={ cover } />
      <div className={classes.buttonContainer}>
        <Button onClick={onClickEnterCity} className={classes.buttonStyle} variant="contained">{locale.Enter}</Button>
      </div>
    </div>
  )
}

export default withRouter(Cover);
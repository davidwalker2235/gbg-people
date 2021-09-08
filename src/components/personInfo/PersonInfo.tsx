import React, {FC, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Person, PersonInfoProps} from '../../interfaces/appInterfaces';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import styles from './styles';
import locale from '../../shared/locale';
import { PersonEnum } from '../../shared/enums';
import {useGetPersonData} from "../../query/gbg-people.query";
import images from '../../shared/images';
import {Button} from "@material-ui/core";
import {hideModal, showModal} from "../../actions/modalActions";
import {AlertComponent, AddEditUserComponent} from "../";

const PersonInfo: FC<PersonInfoProps> = ({id}) => {
  const dispatch = useDispatch();
  const classes = styles();
  const [data, setData] = useState();
  const [personImage, setPersonImage] = useState();

  const {data: personData} = useGetPersonData(id);

  useEffect(() => {
    if (personData && personData.length) {
      setData(personData[0]);
      setPersonImage(getPersonImage(personData[0]));
    }

    return () => setPersonImage(null)
  },[personData]);

  const getPersonInfo = (infoType: PersonEnum) => {
    if (data) {
      // @ts-ignore
      return data[infoType];
    }
  }

  const getPersonImage = (data: Person) => {
    if (data) {
      // @ts-ignore
      return images[data.forename];
    }
  }

  const handleCancel = () => {
    dispatch(hideModal());
  }

  const handleRemovePerson = () => {
    if (data) {
      // @ts-ignore
      return images[data.forename];
    }
  }

  const handleOnClickEdit = () => {
    dispatch(showModal(
      <AddEditUserComponent data={data} />
    ));
  }

  const handleOnClickRemove = () => {
    dispatch(showModal(
      <AlertComponent text={locale.DoYouWantToRemove} onCancel={handleCancel} onAccept={handleRemovePerson}/>
    ));
  }

  return (
    <Card className={classes.root}>
      <Grid container justify="flex-start">
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <div className={classes.imageContainer}>
            <img className={classes.cover} alt="complex" src={personImage} />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9}>
          <div className={classes.details}>
            <Grid justify="space-between" container direction='column'>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <CardContent className={classes.content}>
                  <Typography component="h5" variant="h5">
                    {`${getPersonInfo(PersonEnum.TITLE)} ${getPersonInfo(PersonEnum.FORENAME)} ${getPersonInfo(PersonEnum.MIDDLE_NAMES)} ${getPersonInfo(PersonEnum.SURNAME)}`}
                  </Typography>
                </CardContent>
              </Grid>
              <Grid container direction='row'>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <CardContent className={classes.content}>
                    <Typography variant="subtitle1" color="textSecondary">
                      {`${locale.Address}: ${getPersonInfo(PersonEnum.HOME_BUILD_NUMBER)} ${getPersonInfo(PersonEnum.HOME_STREET)} ${getPersonInfo(PersonEnum.HOME_BUILD_NAME)}`}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {`${getPersonInfo(PersonEnum.HOME_POSTCODE)} ${getPersonInfo(PersonEnum.HOME_CITY)} (${getPersonInfo(PersonEnum.HOME_COUNTY)})`}
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <CardContent className={classes.content}>
                    <Typography variant="subtitle1" color="textSecondary">
                      {`${locale.Gender}: ${getPersonInfo(PersonEnum.GENDER)}`}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {`${locale.Birth}: ${getPersonInfo(PersonEnum.DATE_OF_BIRTH)}`}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {`${locale.Email}: ${getPersonInfo(PersonEnum.EMAIL_ADDRESS)}`}
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div className={classes.buttonRoot}>
            <Button className={classes.button} variant="contained" color="primary" onClick={handleOnClickEdit}>
              {locale.Edit}
            </Button>
            <Button className={classes.button} variant="contained" color="secondary" onClick={handleOnClickRemove}>
              {locale.Remove}
            </Button>
          </div>
        </Grid>
      </Grid>
    </Card>
  )
}

export default PersonInfo;
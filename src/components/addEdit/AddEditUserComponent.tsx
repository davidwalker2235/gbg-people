import React, {FC, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import locale from "../../shared/locale";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import styles from './styles';
import {IPersonRequest, Person} from "../../interfaces/appInterfaces";
import {TextField, InputLabel, Select, MenuItem} from "@material-ui/core";
import {ListTypeEnum, PersonEnum} from "../../shared/enums";
import formConfig from './formConfig';
import { DatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {getMomentFromString} from "../../shared/utils";
import { es } from "date-fns/locale";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {useCreatePersonMutation, useGetPageValuesMutation, useUpdatePersonMutation} from "../../query/gbg-people.query";
import {setPersonListData} from "../../actions/listActions";

interface IAddEditComponent {
  data?: Person;
  onAccept?: () => void;
  onCancel?: () => void;
}

const AddEditUserComponent: FC<IAddEditComponent> = ({data, onCancel}) => {
  const classes = styles();
  const dispatch = useDispatch();
  const [personData, setPersonData] = useState<IPersonRequest>({});
  const [request, setRequest] = useState<IPersonRequest>({});

  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setIsEdit(true);
      setPersonData(data as IPersonRequest);
      const {id, ...rest} = data;
      setRequest(rest as IPersonRequest);
    }
  }, [])

  const {mutateAsync: fetchCreatePerson} = useCreatePersonMutation({onSuccess: () => {
      fetchGetPage({start: 0, end: 10});
    }});
  const {mutateAsync: fetchUpdatePerson} = useUpdatePersonMutation({onSuccess: () => {
      fetchGetPage({start: 0, end: 10});
    }});
  const {mutateAsync: fetchGetPage} = useGetPageValuesMutation({
    onSuccess: (response: Person[]) => {
      dispatch(setPersonListData({
        listType: ListTypeEnum.PERSON,
        listData: response
      }));
    }
  })

  const onChange = (event: any, key: PersonEnum) => {
    if(!event.target.value || event.target.value.length === 0) {
      delete request[key];
    } else {
      setRequest({...request, [key]: event.target.value} as IPersonRequest)
    }
    setPersonData({...personData, [key]: event.target.value} as IPersonRequest)
  }

  const handleOnClickCreate = () => {
    isEdit ? fetchUpdatePerson({id: data?.id as number, payload: request}) : fetchCreatePerson(request);
  }

  const onChangeDate = (date: MaterialUiPickersDate, key: string) => {
    const dateFormatted = date?.toLocaleDateString("es")
    setPersonData({...personData, [key]: dateFormatted} as IPersonRequest)
  }

  const fields: any = {
    input: (field: any) => <TextField
      disabled={field.disabled}
      className={classes.imput}
      id="standard-basic"
      label={locale[field.key]}
      onChange={(event) => onChange(event, field.key)}
      value={personData[field.key]} />,
    select: (field: any) => <div>
      <InputLabel id="demo-simple-select-label">{locale[field.key]}</InputLabel>
      <Select
        className={classes.select}
        labelId={`demo-simple-select-label${personData[field.key]}`}
        id={`demo-simple-select${personData[field.key]}`}
        value={personData[field.key]}
        onChange={(event) => onChange(event, field.key)}
      >
        {
          field.values.map((value: string) => <MenuItem value={value}>{value}</MenuItem>)
        }
      </Select>
    </div>,
    datepicker: (field: any) => <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
      <DatePicker
        className={classes.select}
        clearable
        value={getMomentFromString(personData[field.key] as string)}
        onChange={(event) => onChangeDate(event, field.key)}
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        label={locale[field.key]}
      />
    </MuiPickersUtilsProvider>
  }

  return (
    <div>
      <DialogTitle id="alert-dialog-title">{locale.NewUser}</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <div className={classes.details}>
              <Grid justify="space-between" container direction='column'>
                <Grid container direction='row'>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <CardContent className={classes.content}>
                      {formConfig.leftPanel.map((field: any) => fields[field.type](field))}
                    </CardContent>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <CardContent className={classes.content}>
                      {formConfig.rightPanel.map((field: any) => fields[field.type](field))}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary">
          {locale.Cancel}
        </Button>
        <Button onClick={handleOnClickCreate} color="primary" autoFocus>
          {isEdit ? locale.Update : locale.Create}
        </Button>
      </DialogActions>
    </div>
  );
}

export default AddEditUserComponent;
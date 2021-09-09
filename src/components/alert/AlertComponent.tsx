import React, {FC} from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import locale from "../../shared/locale";

interface IAlertComponent {
  text: string;
  onAccept?: () => void;
  onCancel?: () => void;
}

const AlertComponent: FC<IAlertComponent> = ({text, onAccept, onCancel}) => {
  return (
    <div>
      <DialogTitle id="alert-dialog-title">{locale.Alert}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary">
          {locale.Disagree}
        </Button>
        <Button onClick={onAccept} color="primary" autoFocus>
          {locale.Agree}
        </Button>
      </DialogActions>
    </div>
  );
}

export default AlertComponent;
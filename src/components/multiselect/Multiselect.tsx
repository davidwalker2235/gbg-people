import React, {FC} from 'react';
import styles from './styles';
import {Checkbox, FormControl, Input, InputLabel, ListItemText, MenuItem, Select} from "@material-ui/core";
import locale from "../../shared/locale";
import {PersonEnum} from "../../shared/enums";

interface IMultiselect {
    dataOption: PersonEnum;
    options: string[];
    onChange: (event: any, multiSelectOption: PersonEnum) => void;
    valuesSelected: MultiselectData;
}
interface MultiselectData {
    [key: string]: string[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const Multiselect: FC<IMultiselect> = ({valuesSelected, dataOption, options, onChange}) => {
  const classes = styles();

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

  return <FormControl className={classes.formControl}>
      <InputLabel id={`mutiple-input-label-${dataOption}`}>{locale[dataOption]}</InputLabel>
      <Select
          labelId={`mutiple-checkbox-label-${dataOption}`}
          id={`mutiple-checkbox-${dataOption}`}
          multiple
          value={valuesSelected[dataOption]}
          onChange={(event) => onChange(event, dataOption)}
          input={<Input />}
          renderValue={(selected) => (selected as string[]).join(', ')}
          MenuProps={MenuProps}
      >
          {options && options.map((name: any) => (
              <MenuItem key={name} value={name}>
                  <Checkbox checked={valuesSelected[dataOption].indexOf(name) > -1} />
                  <ListItemText primary={name} />
              </MenuItem>
          ))}
      </Select>
  </FormControl>
}

export default Multiselect;
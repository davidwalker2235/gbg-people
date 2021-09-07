import React, { FC, useEffect, useState } from 'react';
import styles from './styles';
import {Accordion, AccordionDetails, AccordionSummary} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {ListRows} from '../../interfaces/appInterfaces';
import {PersonInfo} from '../';
import images from '../../shared/images';

const ExpansionPanelComponent: FC<ListRows> = ({data,
                                                panelId,
                                                panelExpanded,
                                                handleChange}) => {
  const classes = styles();
  const [panelNumber, setPanelNumber] = useState('')

  useEffect(() => {
    setPanelNumber(`panel${panelId}`);
  },[]);

  const onChange = (panelId: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    handleChange(data.id, newExpanded ? panelId : false)
  };

  const getPersonImage = (data: string | undefined) => {
    if (data) {
      // @ts-ignore
      return images[data];
    }
  }

  return (
  <Accordion expanded={panelExpanded === panelNumber} onChange={onChange(`panel${panelId}`)}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls={`panel${panelId}bh-content`}
      id={`panel${panelId}bh-header`}
    >
      <div className={classes.summary}>
        {panelExpanded !== panelNumber && <Avatar alt={`panel-${data.foreName}-avatar`} src={getPersonImage(data.forename)} />}
        <Typography className={classes.heading}>{data?.forename}</Typography>
      </div>
    </AccordionSummary>
    <AccordionDetails className={classes.detailsRoot}>
      {panelExpanded === panelNumber && <PersonInfo id={data.id as number}/>}
    </AccordionDetails>
  </Accordion>
);
}

export default ExpansionPanelComponent;
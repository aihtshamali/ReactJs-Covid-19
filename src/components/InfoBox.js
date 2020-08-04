import React from 'react'
import './InfoBox.css'
import {Card, CardContent, Typography} from '@material-ui/core'
import { prettyPrintNumb } from '../utils';
function InfoBox({title, cases, isRed, active, total, ...props}) {
    return (
      
      <Card onClick = {props.onClick} className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`}>
        <CardContent>
          {/* Title */}
          <Typography className="infoBox__title" color="textSecondary">
            {title}
          </Typography>
          {/* Cases Numbers */}
          <h2 className={`infoBox__cases ${!isRed && 'infoBox__cases--green'} `}>{prettyPrintNumb(cases)}</h2>
          {/* Total Numbers */}
          <Typography className="infoBox__total" color="textSecondary">
            {prettyPrintNumb(total)}
          </Typography>
        </CardContent>
      </Card>
    );
}

export default InfoBox

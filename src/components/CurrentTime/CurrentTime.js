import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import makeStyles from './styles';

const CurrentTime = () => {
    const classes = makeStyles();

    let date = new Date();
    let month = date.getMonth() + 1; //months from 1-12 (0 = january, 1 = february)
    let day = date.getDate();
    let year = date.getFullYear();
    let newDate = month + "/" + day + "/" + year;

    const currentTime = new Date().toLocaleTimeString();
    const [time, setTime] = useState(currentTime);

    const updateTime = () => {
        const currentTime = new Date().toLocaleTimeString();
        setTime(currentTime);
    }

    // set time on an interval 
    setInterval(updateTime, 1000);

    return (
        <Typography className={classes.textStyle} variant="h4">
           {newDate} {time}
        </Typography>
    );
}

export default CurrentTime;
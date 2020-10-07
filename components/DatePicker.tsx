import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';

import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { Moment } from 'moment';

export default function MaterialUIPickers() {
    const [selectedDate, setSelectedDate] = React.useState<Date | Moment>(new Date());

    const handleDateChange = (date: moment.Moment, value?: string) => {
        setSelectedDate(date);
    };

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            gridItem: {
                display: 'flex',
                flexDirection: 'column',
            },
        }),
    );

    const classes = useStyles();

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Grid container justify="flex-start">
                <Grid item className={classes.gridItem}>
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date picker dialog"
                        format="DD/MM/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        defaultValue={new Date()}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Time picker"
                        value={selectedDate}
                        ampm={false}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                </Grid>
            </Grid>
        </MuiPickersUtilsProvider>
    );
}

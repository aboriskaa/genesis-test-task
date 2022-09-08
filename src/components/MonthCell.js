import React, { useState } from 'react'
import { isCurrentDay, isSelectedMonth } from '../utils'

import Card from '@mui/material/Card';
import { blue } from '@mui/material/colors';
import { red } from '@mui/material/colors';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ToDoDialog from './ToDoDialog';
import ToDoDialogList from './ToDoDialogList';


export default function MonthCell({ day, today, setUpdateCal, arr }) {

    const [load, setLoad] = useState('')

    // let newBd = [];
    // if (arr !== null) newBd = arr.filter(e => isSelectedDay(e.date, day.clone()));

    return (
        <>
            < Card sx={{ minHeight: '200px', opacity: !isSelectedMonth(day, today) && '0.40' }
            }>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: isCurrentDay(day) ? red[500] : blue[500] }} aria-label="recipe">
                            {day.format('D')}
                        </Avatar>
                    }
                    subheader={day.format('dddd')}
                />

                <CardContent>
                    <Typography variant="body2">
                        <ToDoDialogList day={day} setLoad={setLoad} setUpdateCal={setUpdateCal} />
                    </Typography>
                </CardContent>
                <CardActions>
                    <ToDoDialog day={day} setUpdateCal={setUpdateCal} />
                </CardActions>
            </Card >

        </>
    )
}

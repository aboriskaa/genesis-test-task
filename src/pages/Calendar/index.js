import React, { useState } from 'react'
import moment from "moment";
import Box from '@mui/material/Box';
import MonthCell from '../../components/MonthCell';
import { v4 as uuidv4 } from 'uuid';

const totalDays = 42;

moment.updateLocale('en', { week: { dow: 1 } });

export default function Calendar({ today }) {

    const [updateCal, setUpdateCal] = useState('');


    const startDay = today.clone().startOf('month').startOf('week');

    const day = startDay.clone().subtract(1, 'day');
    const daysMap = [...Array(totalDays)].map(() => day.add(1, 'day').clone())

    return (
        <Box sx={{ display: 'grid', gap: 1, gridTemplateColumns: 'repeat(7, 1fr)', height: '100vh', padding: '5px' }}>
            {daysMap.map((e) => {
                return (
                    <MonthCell key={uuidv4()} day={e} today={today} setUpdateCal={setUpdateCal} />
                )
            })}
        </Box>

    )
}
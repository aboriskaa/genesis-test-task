import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { minDateMaxDate } from '../utils'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import moment from "moment";
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export default function Header({ today, setToday }) {

  const handleChange = (newValue) => {
    localStorage.setItem('today', moment(newValue).clone())
    setToday(moment(newValue).clone())
  };


  const backHandler = () => {
    let prevMonth = moment(today).subtract(1, 'M').clone();
    let result;

    if (prevMonth.isBefore(minDateMaxDate.minDate)) {
      result = minDateMaxDate.maxDate
    } else {
      result = prevMonth
    }

    localStorage.setItem('today', moment(result))
    setToday(result)
  };

  const forwardHandler = () => {
    let forwardMonth = moment(today).add(1, 'M').clone()
    let result;

    if (forwardMonth.isAfter(minDateMaxDate.maxDate)) {
      result = minDateMaxDate.minDate
    } else {
      result = forwardMonth
    }

    localStorage.setItem('today', moment(result))
    setToday(result)
  };

  return (
    <Box sx={{ flexGrow: 1, gap: '10px' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Calendar
          </Typography>
          <Stack spacing={2} direction="row">
            <Button onClick={backHandler} variant="text" sx={{ color: '#ffffff' }}>  <ArrowBackIosIcon fontSize="small" /></Button>
            <Button variant="text" sx={{ color: '#ffffff' }}>{moment(today).format('MMMM')}</Button>
            <Button onClick={forwardHandler} variant="text" sx={{ color: '#ffffff' }}><ArrowForwardIosIcon fontSize="small" /></Button>
          </Stack>
          <Box sx={{ bgcolor: '#ffffff', padding: '1px' }}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                views={['year', 'month']}
                minDate={minDateMaxDate.minDate}
                maxDate={minDateMaxDate.maxDate}
                value={today}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params}
                />}
              />
            </LocalizationProvider>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

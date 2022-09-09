import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export default function ToDoDialogEdit({ setLoad, item, setUpdateCal }) {

    const [open, setOpen] = useState(false);
    const [valueDate, setValueDate] = useState(moment(item.date).format());
    const [valueTime, setValueTime] = useState(item.time);
    const [valueTitle, setValueTitle] = useState(item.title);
    const [valueDescription, setValueDescription] = useState(item.description);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSave = () => {

        let array = []
        let newArr = []

        array = JSON.parse(localStorage.getItem('ideas'))

        newArr = array.filter((e) => e.id !== item.id)

        newArr.push({
            id: item.id,
            title: valueTitle,
            description: valueDescription,
            date: moment(valueDate).format(),
            time: moment(valueTime).format()
        })

        localStorage.setItem('ideas', JSON.stringify([...newArr]))
        setLoad(uuidv4())
        // setUpdateCal(uuidv4())
        setOpen(false);

    };

    const handleDel = () => {

        let array = []
        let newArr = []

        array = JSON.parse(localStorage.getItem('ideas'))

        newArr = array.filter((e) => e.id !== item.id)

        localStorage.setItem('ideas', JSON.stringify([...newArr]))
        setLoad(uuidv4())
        setOpen(false);

    };

    const handleValueTitle = (e) => {
        setValueTitle(e.target.value)
    };

    const handleValueDescription = (e) => {
        setValueDescription(e.target.value)
        console.log(e.target.value)
    };
    const handleDatePicker = (e) => {
        setValueDate(e)
    };

    const handleTimePicker = (e) => {
        setValueTime(e)
    };


    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <ListItem disablePadding>
                <ListItemButton onClick={handleClickOpen}>
                    <ListItemText primary={moment(valueTime).format('HH:mm')} />
                    <ListItemText secondary={' '} />
                    <ListItemText secondary={valueTitle} />
                </ListItemButton>
            </ListItem>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new idea item</DialogTitle>
                <DialogContent>
                    <DialogContent>
                        <TextField
                            required
                            id="standard-required"
                            label="Required"
                            variant="standard"
                            onChange={handleValueTitle}
                            defaultValue={valueTitle}
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            id="standard-multiline-static"
                            multiline
                            rows={4}
                            variant="standard"
                            defaultValue={valueDescription}
                            onChange={handleValueDescription}
                        />
                    </DialogContent>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DialogContent>
                            <DatePicker
                                value={valueDate}
                                onChange={handleDatePicker}
                                renderInput={(params) => <TextField {...params} />}
                            />

                        </DialogContent>
                        <DialogContent>
                            <TimePicker
                                value={valueTime}
                                ampm={false}
                                onChange={handleTimePicker}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </DialogContent>
                    </LocalizationProvider>
                </DialogContent>

                <Box sx={{ display: 'flex', alignItem: 'center', justifyContent: 'center', m: 1 }}>
                    <Fab size="small" color="secondary" aria-label="remove" sx={{ alignSelf: 'center' }} onClick={handleDel}>
                        <DeleteIcon />
                    </Fab>
                </Box>

                <DialogActions >
                    <Button disabled={!valueTitle} onClick={handleSave}>Save</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog >
        </>
    );
}